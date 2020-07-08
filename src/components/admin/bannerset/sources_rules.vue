<template>
<el-form-item label="数据源规则：" class="rules-content">
     <p class="banner-txt rules-title">
       <span>{{reference.sourcesname}}</span>
       <el-button class="operation-del" icon="el-icon-plus" @click="addfilterfiledGroup(-1)" style="float: right;"></el-button>
     </p>
     <template v-for="(val,fkey) in reference.filters">
        <el-form-item style="margin-bottom: 7px;">
          <el-row  :gutter="20">
            <el-col :span="1" style="padding: 0;">
              <div class="rules-dis">
                <span>{{fkey+1}}</span>
              </div>
            </el-col>
            <el-col :span="20">
              <el-radio-group v-model="val.condition" @change="ConditionChange(fkey)">
                <el-radio :label="0">无条件</el-radio>
                <el-radio :label="1">满足以下</el-radio>
              </el-radio-group>
              <el-select v-if="val.condition > 0" v-model="val.filtertype" style="width: 130px;margin-left: 20px;margin-right: 5px;">
                <el-option label="任意一项" :value="0" :key="0"></el-option>
                <el-option label="所有条件" :value="1" :key="1"></el-option>
              </el-select>
              <span v-if="val.condition> 0" style="margin-left: 20px;">条件：</span>
            </el-col>
            <el-col :span="3" style="padding-right: 0px;">
              <el-button class="operation-del" icon="el-icon-minus" @click="delrules(val.bsfid,fkey)" style="margin-left: -1px;"></el-button>
              <el-button class="operation-add" icon="el-icon-plus" style="margin-right: 0;" @click="addfilterfiledGroup(fkey)"></el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div style="margin-bottom: 25px;">
          <template v-if="val.condition > 0" v-for="(item,key) in val.filterfiled">
            <ModelOption1 :reference="item" :fkey="fkey" :rkey="key" :option="reference.options1" :fid="reference.fid" :olength="val.filterfiled.length" @deloption="deloptions"></ModelOption1>
          </template>
        </div>
      </template>
  </el-form-item>
</template>

<script>
  export default {
    props:['reference','dels'],
		data(){
			return {
			}
		},
    created() {
      // console.log(this.reference)
    },
    methods:{
      addfilterfiledGroup(key){
        var str = {
          bsfid:'',
          filtertype:0,
          condition:0,
          filterfiled:[]
        }
        if(key > -1){
          this.reference.filters.splice(key+1, 0, str);
        }else{
          this.reference.filters.push(str)
        }

      },
      ConditionChange(key){
        if(!this.reference.filters[key].filterfiled.length){
          var str = this.finishing()
          this.reference.filters[key].filterfiled.push(str)
        }
      },
      finishing(flag){
        if(flag){
          var options1 = this.reference.options1[flag]
          return false;
          var str = {
            'filedtype':options1.filedtype,
            'extra':options1.extra,
            'options':options1.options,
          }
        }else{
          var options1 = this.reference.options1
          var flag = Object.keys(options1)[0]
          var str = {
            'ruleid':'',
            'filedtype':options1[flag].filedtype,
            'flag': flag,
            'condition':'',
            'fvalue':'',
            'extra':options1[flag].extra,
            'options':options1[flag].options,
            'ext':''
          }
        }

        return str;
      },
      delrules(bsfid,key){
        if(bsfid){
          this.dels.gdels.push(bsfid)
        }
        this.reference.filters.splice(key,1)
      },
      deloptions(data){
        if(data.type == 'del'){
          if(data.id){
            this.dels.rdels.push(data.id)
          }
           this.reference.filters[data.fkey].filterfiled.splice(data.key,1)
        }else if(data.type == 'add'){
          var str = this.finishing()
          this.reference.filters[data.fkey].filterfiled.splice(data.key+1, 0, str);
        }else if(data.type == 'change'){
          if(data.id){
            this.dels.rdels.push(data.id)
          }
        }
      }
    },
		components: {
       'ModelOption1': () => import('@/components/admin/bannerset/sources_option1.vue')
		},
	}
</script>
<style lang="less" scoped>
  .rules-content /deep/ .el-form-item__content{
      padding-left: 10px;
  }
  .rules-title{
    margin: 0px;
    background: #F1F1F1;
    padding: 0 5px 0 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    margin-left: -10px;
    color: #606266;
  }
  .rules-dis{
    span{
      border: 1px solid #606266;
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50px;
      text-align: center;
      line-height: 25px;
      font-weight: 700;
      color: #606266;
    }
  }
</style>
