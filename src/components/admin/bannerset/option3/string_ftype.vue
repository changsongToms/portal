<template>
  <el-col :span="13" style="padding-right: 0;">
    <el-select
      v-if="reference.condition == 'contain'"
      v-model="reference.fvalue"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="(item,key) in options"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-select
      v-else
      v-model="reference.fvalue"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="(item,key) in options"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </el-col>
</template>

<script>
	export default {
    props: ['reference'],
		data(){
			return {
        loading:false,
        options:[],
        multiple:true
			}
		},
		methods: {
      async remoteMethod(query){
        this.loading = true;
        const { data: res } = await this.axios.post(this.AxiosApi+"index.php?mod=portal&op=admin&do=ajax&operation=gettype",{q: query});
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        this.loading = false;
        this.options = res
      }
		},
	}
</script>
