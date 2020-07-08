<template>
  <el-form
    v-loading="GetLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    label-position="right"
    label-width="110px"
    :rules="rulesform"
    :model="formdata"
    ref="refForm"
    class="basic-mainForm">
    <el-form-item label="展示页名称：" prop="showname">
      <el-input v-model="formdata.showname" placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item label="LOGO设置：">
      <el-upload
        v-model="formdata.logo"
        class="avatar-uploader"
        :action="UploadSrc"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        name="files[]"
        :show-file-list="false"
        :on-success="handlerSuccess"
        :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">建议图片尺寸：260×80px</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="访问设置：" prop="access">
      <el-radio-group v-model="formdata.access">
        <el-radio label="0">任何人访问</el-radio>
        <el-radio label="1">必须登录才可以访问</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="页面关键词：" prop="keyword">
      <el-input autosize type="textarea" v-model="formdata.keyword" placeholder="请输入关键词"></el-input>
      <p class="help-info">用于页面seo优化，不希望搜索引擎收录可不填</p>
    </el-form-item>
    <el-form-item label="页面描述：" prop="desc">
      <el-input autosize type="textarea" v-model="formdata.desc" placeholder="请输入描述"></el-input>
      <p class="help-info">用于页面seo优化，不希望搜索引擎收录可不填</p>
    </el-form-item>
    <el-form-item label="备案号：" prop="recordno">
      <el-input v-model="formdata.recordno" placeholder="请输入备案号"></el-input>
    </el-form-item>
    <el-form-item label="版权信息：" prop="copyright">
      <el-input autosize type="textarea" v-model="formdata.copyright" placeholder="请输入版权信息"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addConfirm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
	  	data() {
	    	return {
          GetLoading:true,
          imageUrl:'',
          formdata: {
            showname: '',
            logo:'',
            access: '0',
            keyword: '',
            desc:'',
            recordno:'',
            copyright:''
          },
          rulesform:{
            showname:[
              { required: true, message: '请输入展示页名称', trigger: 'blur' },
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
            ],
          },
          UploadSrc:this.AxiosApi + 'index.php?mod=portal&op=admin&do=ajax&operation=logoupload',
	    	}
	  	},
	  	created() {
        this.getMenuList()
      },
	  	methods: {
        handlerSuccess(res, file) {
          if(res){
            console.log(res.files)
            this.formdata.logo = res.files[0].data.aid
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$message('上传成功');
          }else{
            this.$message.error('上传失败');
          }

        },
        beforeUpload(file) {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
          }
          return isLt2M;
        },
        addConfirm(){
          const loading = this.$loading({
            lock: true,
            text: '提交中...',
            spinner: 'el-icon-loading',
          });
          this.$refs.refForm.validate(async valid => {
            if (valid) {
              const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=basic&operation=set",{settingnew:this.formdata});
              loading.close();
              if (res.success) {
                this.$message.success('提交成功！')
              }else if(res && res.error && res.error == 1){
                var herf = encodeURIComponent(window.location.href)
                window.location.href="admin.php?referer="+herf
              } else {
                this.$message.error('提交失败！')
              }
            } else {
              loading.close();
              this.$message.error('请按错误提示，修改内容')
            }
          })
        },
        async getMenuList(){
          const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=basic");
          if(res && res.error && res.error == 1){
            var herf = encodeURIComponent(window.location.href)
            window.location.href="admin.php?referer="+herf
          }else{
            this.formdata = res
            this.imageUrl = res.logoimg;
            this.GetLoading = false
          }

        }

	  	}
	}
</script>

<style lang="less" scoped>
  .avatar-uploader {
    /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
          border-color: #409EFF;
        }
      }
      .avatar-uploader-icon {
        font-size: 22px;
        color: #8c939d;
        width: 260px;
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
      .avatar {
        width: 260px;
        height: 80px;
        display: block;
      }
  }

  .basic-mainForm {
    width: 500px;
    margin: 0 auto;
    .upload-demo {
      /deep/ .el-upload-list__item-thumbnail{
        width: 200px;
      }
    }
  }

</style>
