<template>
  <el-col :span="14" style="padding-right: 0;">
    <el-col :span="11">
      <el-select v-model="reference.condition" @change="handchange">
        <el-option :label="item.option" :value="item.condition" v-for="item in DataOption"></el-option>
      </el-select>
    </el-col>
    <el-col :span="13" style="padding-right: 0;">
        <div v-show="reference.condition=='range'" >
          <el-date-picker
            style="width: 100%;"
            v-model="reference.fvalue"
            type="daterange"
            :disabled="isDisa"
            format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div v-show="reference.condition=='before' || reference.condition=='after' || reference.condition=='eq'">
          <el-date-picker
            style="width: 100%;"
            v-model="reference.fvalue"
            type="date"
            :disabled="isDisa1"
            format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
       <div v-show="reference.condition=='beforerange'">
          <el-input placeholder="请输入天数" type="number" v-model="reference.fvalue">
            <template slot="append">天内</template>
          </el-input>
        </div>
    </el-col>
  </el-col>
</template>

<script>
  export default {
    props: ['reference'],
    created() {
      this.getDataOption();
    },
    data() {
      return {
        DataOption: [],
        isDisa:false,
        isDisa1:false,
      }
    },
    methods: {
      async getDataOption() {
        const {
          data: res
        } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=ajax&operation=getfiledoption", {
          flag: this.reference.filedtype
        });
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        this.DataOption = res
        if (!this.reference.condition && res.length > 0) {
          this.reference.condition = res[0].condition
          if(this.reference.condition == 'range'){
            this.isDisa = false
            this.isDisa1 = true
          }else{
            this.isDisa = true
            this.isDisa1 = false
          }
          this.reference.fvalue = ''
        }

        if(!this.reference.fvalue && this.reference.condition != 'range' && this.reference.condition != 'beforerange'){
          this.reference.fvalue = this.getNowTime()
        }
      },
      handchange() {
        if(this.reference.condition == 'range'){
          this.isDisa = false
          this.isDisa1 = true
        }else{
          this.isDisa = true
          this.isDisa1 = false
        }
        this.reference.fvalue = ''
      },
      getNowTime() {
           var now = new Date();
           var year = now.getFullYear(); //得到年份
           var month = now.getMonth(); //得到月份
           var date = now.getDate(); //得到日期
           month = month + 1;
           month = month.toString().padStart(2, "0");
           date = date.toString().padStart(2, "0");
           var defaultDate = `${year}-${month}-${date}`;
           return defaultDate;
        },
    }
  }
</script>

<style>
</style>
