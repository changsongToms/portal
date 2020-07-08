<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#F5F7FA"
    style="margin-top: 10px;margin-bottom: 10px;">
    <p>{{parameter.bannername}}</p>
      <el-row :gutter="5" style="min-height: 200px;">
        <el-col :sm="8" :md="6" :lg="4" :xl="4" v-for="item in imgs">
             <el-image
                style="height: 200px;width: 100%;"
                :src="item.img"
                fit="cover"></el-image>
        </el-col>
      </el-row>
  </div>
</template>

<script>
	export default {
    props:['parameter'],
		data(){
			return {
        imgs:[],
        loading:true
			}
		},
    created() {
      this.getimages()
    },
		methods: {
      async getimages(){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=filelist",{
          bids:this.parameter.bid,
          pagesize:this.parameter.num,
        });
        this.imgs = res.datas
        this.loading = false
      }
		},
	}
</script>
<style type="text/css">
</style>
