<template>
  <el-col :span="13" style="padding-right: 0;" class="flag-color">
      <el-color-picker
        v-model="reference.fvalue"
       :predefine="options">
      </el-color-picker>
  </el-col>
</template>

<script>
	export default {
    props: ['reference','fid'],
    created() {
      this.CreatedOption()
    },
		data(){
			return {
        options:[],
			}
		},
		methods: {
      async CreatedOption(){
        var data = await this.GetTas();
        this.options = data.val
      },
      async GetTas(query){
         const { data: res } = await this.axios.post(this.AxiosApi+"index.php?mod=portal&op=admin&do=ajax&operation=getselectval",{fid: this.fid,flag:this.reference.flag});
         if(res && res.error && res.error == 1){
           var herf = encodeURIComponent(window.location.href)
           window.location.href="admin.php?referer="+herf
           return false;
         }
         return res
      }

		},
	}
</script>
