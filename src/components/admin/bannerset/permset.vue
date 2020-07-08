<template>
  <el-form-item label="权限：">
    <el-form-item style="margin-bottom: 15px;">
      <p class="banner-txt">查看权限</p>
      <el-select class="banner-input" v-model="parameter.viewperm">
        <el-option label="所有人" value="1"></el-option>
        <el-option label="站内人员" value="2"></el-option>
        <el-option label="指定人员" value="3"></el-option>
      </el-select>
    </el-form-item>
    <components v-if="parameter.viewperm == '3'" is="UserDialog" @eventMsg="getMsg" type="view" :reference="parameter.userviewperm" :message="parameter.viewuser"></components>
    <el-form-item style="margin-bottom: 15px;">
      <p class="banner-txt">下载权限</p>
      <el-select class="banner-input" v-model="parameter.downloadperm">
        <el-option label="所有人" value="1"></el-option>
        <el-option label="站内人员" value="2"></el-option>
        <el-option label="指定人员" value="3"></el-option>
      </el-select>
    </el-form-item>
    <components v-if="parameter.downloadperm == '3'" is="UserDialog" type="download" @eventMsg="getMsg" :reference="parameter.userdownloadperm" :message="parameter.downloaduser"></components>
  </el-form-item>
</template>
<script>
	export default {
    props:['parameter'],
		data(){
			return {
			}
		},
    created() {
    },
		methods: {
      getMsg(arr){
        if(arr.type == 'view'){
          this.parameter.userviewperm = arr.users
        }else{
          this.parameter.userdownloadperm = arr.users
        }
      }
		},
    components:{
      'UserDialog': () => import('@/components/admin/bannerset/permset_dialog.vue'),
    }
	}
</script>
<style lang="less" scoped>
 .banner-txt {
    margin: 0;
  }
  .bannerset-mainForm .banner-input{
    width: 400px;
  }
</style>
