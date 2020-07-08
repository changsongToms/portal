<template>
    <el-col :span="14" style="padding-right: 0;">
      <el-col :span="11">
        <el-select v-model="reference.condition" @change="changeoption">
          <el-option :label="item.option" :value="item.condition" v-for="item in DataOption"></el-option>
        </el-select>
      </el-col>
      <component v-if="reference.flag == 'ftype'" is="string_ftype_input" :reference="reference"></component>
      <component v-else is="string_input" :reference="reference"></component>
    </el-col>

</template>

<script>

  export default {
    props: ['reference'],
    created(){
      console.log(this.reference)
      this.getDataOption();
    },
  	data(){
  		return {
        DataOption:[],
        type:'',
  		}
  	},
  	methods: {
      changeoption(type){
        if(this.reference.flag != 'ftype'){
          if(type == 'contain' && this.reference.options.length){
            this.reference.fvalue = [1]
          }else if(this.reference.options.length){
            this.reference.fvalue = 1
          }else{
            this.reference.fvalue = ''
          }
        }else{
          this.reference.fvalue = ''
        }

      },
      async getDataOption(){
        const { data: res } = await this.axios.post(this.AxiosApi+"index.php?mod=portal&op=admin&do=ajax&operation=getfiledoption",{flag: this.reference.filedtype});
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        this.DataOption = res
        if(!this.reference.condition && res.length > 0){
          this.reference.condition = res[0].condition
        }
      },
  	},
    components:{
      'string_input': () => import('@/components/admin/bannerset/option3/string_input.vue'),
      'string_ftype_input': () => import('@/components/admin/bannerset/option3/string_ftype.vue')
    }
  }
</script>

<style>
</style>
