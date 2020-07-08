<template>
  <el-form label-position="right" label-width="110px" :model="formdata" ref="refForm" class="home-mainForm">
    <el-form-item label="背景设置：">
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
        <div slot="tip" class="el-upload__tip">建议图片尺寸：1920×1000px</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="是否显示图片：">
      <el-switch
        v-model="hasimg"
        @change="switchchange"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </el-form-item>
    <el-form-item v-if="formdata.hasimg > 0" label="访问设置：">
      <el-row :gutter="20">
        <el-col :span="6">栏目</el-col>
        <el-col :span="6">样式</el-col>
        <el-col :span="4">数量</el-col>
        <el-col :span="5">条件</el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <template v-for="(item,key) in formdata.banner">
        <el-row :gutter="20" class="margin-bottom-7" :key="key">
          <el-col :span="6">
            <el-select v-model="item.bid" @change="ChangeColumn(key,item.bid)">
              <el-option v-for="val in AccessLists" :label="val.bannername" :value="val.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="item.showstyle">
              <el-option label="规则图标模式" :value="'0'"></el-option>
              <el-option label="不规则图标模式" :value="'1'"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input type="number" v-model="item.num" placeholder="请输入">
              <template slot="append">个</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.showcontion">
              <el-option label="一周点击最多" :value="'0'"></el-option>
              <el-option label="一周下载最多" :value="'1'"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button class="operation-del" icon="el-icon-minus" v-if="formdata.banner.length > 1"  @click="Delbanner(key,item.id)"></el-button>
            <el-button class="operation-del" icon="el-icon-plus" @click="Addbanner(key)"></el-button>
          </el-col>
        </el-row>
      </template>
    </el-form-item>
    <el-form-item v-if="formdata.hasimg > 0" label="友情链接：">
      <el-row :gutter="20">
        <el-col :span="6">名字</el-col>
        <el-col :span="6">链接</el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <template v-for="(item,key) in formdata.links">
        <el-row :gutter="20" class="margin-bottom-7">
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="item.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="links.link">
              <el-input v-model="item.link" type="url" placeholder="请输入链接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button class="operation-del" icon="el-icon-minus" v-if="formdata.links.length > 1" @click="Dellink(key,item.id)"></el-button>
            <el-button class="operation-del" icon="el-icon-plus" @click="Addlink(key)"></el-button>
          </el-col>
        </el-row>
      </template>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addConfirm">提交</el-button>
      <!-- <el-button>重置</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        AccessLists:[],
        imageUrl:'',
        UploadSrc:this.AxiosApi + 'index.php?mod=portal&op=admin&do=ajax&operation=logoupload',
        hasimg:false,
        formdata: {
          logo:'',
          hasimg:false,
          banner:[],
          links:[],
          dels:{
            bids:[],
            lids:[]
          }
        },
      }
    },
    created() {
      this.GetDataList()
    },
    methods: {
      Addbanner(key){
        var str = {bid:'',bannername: '',showstyle: '0',num: '5',showcontion: '0'}
        if(key){
          this.formdata.banner.splice(key+1,0,str)
        }else{
          this.formdata.banner.push(str)
        }

      },
      Delbanner(key,id){
        if(id){
          this.formdata.dels.bids.push(id)
        }
        this.formdata.banner.splice(key,1)
      },
      Addlink(key){
        var str = {name: '',link: ''}
        if(key){
          this.formdata.links.splice(key+1,0,str)
        }else{
          this.formdata.links.push(str)
        }

      },
      Dellink(key,id){
        if(id){
          this.formdata.dels.lids.push(id)
        }
        this.formdata.links.splice(key,1)
      },
      handlerSuccess(res, file) {
        if(res){
          this.formdata.logo = res.files[0].data.aid
          this.imageUrl = URL.createObjectURL(file.raw);
          this.$message('上传成功');
        }else{
          this.$message.error('上传失败');
        }

      },
      beforeUpload(file) {
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!');
        // }
        // return isLt2M;
      },
      switchchange(status){
        if(status){
          this.formdata.hasimg = 1
        }else{
          this.formdata.hasimg = 0
        }
      },
      async addConfirm(){
        const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
        });
        // console.log(this.formdata);
        // return false;
        // this.$refs.refForm.validate(async valid => {
          // if (valid) {
            const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=homepage&operation=set",this.formdata);
            if(res && res.error && res.error == 1){
              var herf = encodeURIComponent(window.location.href)
              window.location.href="admin.php?referer="+herf
            }else{
              loading.close();
              if (res.success) {
                this.$message.success('提交成功！')
              } else {
                this.$message.error('提交失败！')
              }
            }
            
          // } else {
          //   loading.close();
          //   this.$message.error('请按错误提示，修改内容')
          // }
        // })
      },
      GetDataList(){
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
        });
        this.getAccessLists(loading)//加载栏目选项
        this.getFormData(loading)//加载数据
        loading.close();
      },
      async getAccessLists(loading){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=homepage&operation=getbanner");
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
        }else{
          this.AccessLists = res
        }

      },
      async getFormData(loading){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=homepage");
        if(res){
          if(res.error && res.error == 1){
            var herf = encodeURIComponent(window.location.href)
            window.location.href="admin.php?referer="+herf
          }else{
            if(res.banner.length){
              this.formdata.banner = res.banner
            }else{
              this.Addbanner()
            }
            if(res.links.length){
              this.formdata.links = res.links
            }else{
              this.Addlink()
            }
            if(res.logo){
              this.formdata.logo = res.logo
              this.imageUrl = res.logoimg
            }
            if(res.hasimg > 0){
              this.hasimg = true
              this.formdata.hasimg = 1
            }else{
              this.hasimg = false
              this.formdata.hasimg = 0
            }
          }
        }
      },
      ChangeColumn(key,id){
        for(var i of this.AccessLists){
          if(Number(i.id) == Number(id)){
            this.formdata.banner[key].bannername = i.bannername
          }
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
        width: 300px;
        height: 260px;
        line-height: 260px;
        text-align: center;
      }
      .avatar {
        width: 300px;
        height: 260px;
        display: block;
      }
  }

  .home-mainForm {
    width: 1100px;
    margin: 0 auto;
  }
</style>
