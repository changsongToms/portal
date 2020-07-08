<template>
<ul class="clearfix">
  <li>
    <div class="rigth-div">
      <el-popover
          popper-class="app-popover"
          trigger="click">
          <div id="app_context">
            <ul class="app-popup">
              <li>
                  <a href="javascript:void(0)">
                    <span class="appicon">
                      <!-- <img src="http://127.0.0.1/index.php?mod=io&op=thumbnail&size=small&original=1&path=NldvaEhsOFRoSGd3VXBIWWNpWXV1QWVNRW1RTnJXMjVHQVgtSHBnTlp6NUNtRTg&t=RGv" alt=""> -->
                    </span>
                    <span class="name">图库</span>
                  </a>
              </li>
              <li>
                  <a href="javascript:void(0)">
                    <span class="appicon">
                      <!-- <img src="http://127.0.0.1/data/attachment/appico/201712/21/103531gqehijah8mfxzjfi.png?t=RGv" alt=""> -->
                    </span>
                    <span class="name">图片采集工具</span>
                  </a>
              </li>
              <li>
                  <a href="javascript:void(0)">
                    <span class="appicon">
                      <!-- <img src="http://127.0.0.1/data/attachment/appico/202005/04/093405njo2r4rpqg0zpvzz.png?t=RGv" alt=""> -->
                    </span>
                    <span class="name">记录</span>
                  </a>
              </li>
            </ul>
          </div>
          <span class="dzz dzz-apps basil" slot="reference"></span>
        </el-popover>

    </div>
  </li>
  <li>
    <div class="rigth-div">
      <el-badge :value="2" :max="99" class="item">
        <span class="dzz dzz-notifications"></span>
      </el-badge>
    </div>
  </li>
  <li>
    <div class="rigth-div" style="line-height: 4.8;">
      <el-dropdown trigger="click">
        <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户中心</el-dropdown-item>
          <el-dropdown-item>选择语言</el-dropdown-item>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item>密码与安全</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </li>
</ul>
</template>

<script>
	export default {
		data(){
			return {
        AppHtml:''
			}
		},
    created() {
      // 获取app
      this.getApp();
    },
		methods: {
      async getApp(){
          const { data: res } = await this.axios.post(this.AxiosApi+"index.php?mod=system&op=app_ajax&operation=app");
          this.AppHtml = res
      }
		},
	}
</script>
<style>
  .app-popover{
    white-space: normal;
    width: 340px;
    margin: 0;
    padding: 0;
  }
  .app-popover #app_context{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 536px;
  }
  .app-popover .app-popup{
    margin: 0;
    padding: 28px;
    padding-right: 18px;
    text-align: left;
    white-space: normal;
  }
  .app-popover .app-popup li{
    display: inline-block;
    margin: 0 0 10px 0;
    border: 1px solid transparent;
  }
  .app-popover .app-popup li:hover{
    border: 1px solid #E5E5E5;
  }
  .app-popover .app-popup li a{
    display: block;
    font-size: 13px;
    text-align: center;
    margin: 8px 3px;
    color: #CA846C;
    text-decoration: none;
  }
  .app-popover .app-popup li a span{
    display: block;
  }
  .app-popover .app-popup li a span.appicon{
    margin-bottom: 8px;
  }
  .app-popover .app-popup li a span.appicon img{
    display: inline-block;
    vertical-align: top;
    height: 48px;
    width: 48px
  }
  .app-popover .app-popup li a span.name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70px;
    padding: 0 5px;
    line-height: 20px;
    font-size: 13px;
    color: #333333;
  }
</style>
