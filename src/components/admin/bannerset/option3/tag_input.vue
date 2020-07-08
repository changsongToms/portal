<template>
  <el-col :span="13" style="padding-right: 0;">
    <el-select
       v-model="reference.fvalue"
        multiple
        filterable
        remote
        remote-method
        reserve-keyword
        :remote-method="remoteMethod"
        placeholder="请选择标签">
        <el-option
          v-for="item in options"
          :key="item.tid"
          :label="item.tagname"
          :value="item.tagname">
        </el-option>
      </el-select>
  </el-col>
</template>

<script>
	export default {
    props: ['reference'],
    created() {
      this.CreatedOption()
    },
		data(){
			return {
        options:[],
			}
		},
		methods: {
      async remoteMethod(query){
        var data = await this.GetTas(query);
        this.options = data.items
      },
      async CreatedOption(){
        var data = await this.GetTas();
        this.options = data.items
      },
      async GetTas(query){
         const { data: res } = await this.axios.post(this.AxiosApi+"index.php?mod=portal&op=admin&do=ajax&operation=gettag",{cid: this.reference.extra.label,q:query});
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
