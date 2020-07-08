<template>
  <el-col :span="14" style="padding-right: 0;">
    <el-col :span="11">
      <el-select v-model="reference.condition">
        <el-option :label="item.option" :value="item.condition" v-for="item in DataOption"></el-option>
      </el-select>
    </el-col>
    <FsizeInput v-if="reference.flag == 'fsize'" :reference="reference"></FsizeInput>
    <IntInput v-else :reference="reference"></IntInput>
  </el-col>
</template>

<script>

  export default {
    props: ['reference'],
    created(){
      this.getDataOption();
    },
  	data(){
  		return {
        DataOption:[],
  		}
  	},
  	methods: {
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
          if(this.reference.flag == 'fsize'){
            this.reference.ext = 'KB'
          }
        }
      },
  	},
    components:{
      'IntInput': () => import('@/components/admin/bannerset/option3/int_input.vue'),
      'FsizeInput': () => import('@/components/admin/bannerset/option3/fsize_input.vue')
    }
  }
</script>

<style>
</style>
