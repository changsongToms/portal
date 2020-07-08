<template>
  <el-form :model="FormModel" :rules="Formrules" status-icon ref="FormRef" class="login-ruleForm">
    <div class="modal-content">
      <div class="sub-title">管理员登录</div>
      <div class="main-form">
        <el-form-item prop="email">
          <el-input v-model="FormModel.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="FormModel.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
	export default {
		data(){
			return {
        FormModel: {
          formhash:'',
          email: '',
          password: '',
          loginsubmit:true
        },
        Formrules:{
          email: [
            { required: true, message: '请输入邮箱或用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
			}
		},
    created() {
      console.log(window.location.href)
      this.GetFormHash()
    },
		methods: {
      async GetFormHash(){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=getformhash");
        this.FormModel.formhash = res.formhash
      },
      login(){
        this.$refs.FormRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.axios.post(this.AxiosApi + "user.php?mod=login&op=logging&action=login",this.FormModel);
          console.log(res)
          if(res.error){
            this.$message({
              message: res.error,
              type: 'warning'
            });
          }else{
            var activePath = window.sessionStorage.getItem('activePath')
            if (activePath) {
              this.$router.push({name: activePath})
            }else{
              this.$router.push({name: 'basic'})
            }
          }
        })
      }
		},
	}
</script>
<style lang="less" scoped>
  .login-ruleForm{
    text-align: center;
    .sub-title {
      font-size: 24px;
      margin: 20px 0;
      color: #CA846C;
      vertical-align: middle;
    }
    .modal-content {
      padding: 30px;
      vertical-align: middle;
      display: inline-block;
      max-width: 100%;
      font-size: 14px;
      box-shadow: none;
      border: none;
      background: #FFF;
      min-width: 320px;
      margin-top: 8%;
    }
    .main-form{
      width: 350px;
      margin: 60px 0 0 0;
    }
    .el-button{
      width: 100%;
      background: #CA846C;
      border-color: #CA846C;
    }
  }

</style>
