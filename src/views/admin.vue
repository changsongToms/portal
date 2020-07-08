<template>
	<el-container class="admin-container">
		<el-header height="64px">
			<nav class="navbar nnavbar-default bs-top-container" >
				<div class="resNav-item resNav-left" style="padding-left: 20px;">{{admin_title}}</div>
			    <div class="resNav-item resNav-center"></div>
			    <div class="resNav-item resNav-right">
			    	<HeaderRight></HeaderRight>
			    </div>
			</nav>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu
				  	:default-active="LeftActive"
				  	class="el-menu-vertical-demo"
				  	style="height: 100%;">
				  	<el-menu-item index="1" @click="tapActive('basic')">
				    	<span slot="title">基本设置</span>
				  	</el-menu-item>
				  	<el-menu-item index="2" @click="tapActive('home')">
				    	<span slot="title">首页设置</span>
				  	</el-menu-item>
				  	<el-menu-item index="3" @click="tapActive('banner')">
				    	<span slot="title">栏目设置</span>
				  	</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
  import HeaderRight from '@/components/header_right.vue'
	export default {
		data(){
			return{
				leftActive:'1',
        admin_title:'基本设置'
			}
		},
		created() {
		  switch(this.$route.name){
		    case 'basic':
		      this.LeftActive = '1'
          this.admin_title='基本设置'
		    break;
		    case 'home':
		      this.LeftActive = '2'
          this.admin_title='首页设置'
		    break;
		    case 'banner':
		    case 'bannerset':
		      this.LeftActive = '3'
          this.admin_title='栏目设置'
		    break;
		  }
      this.changtitle(name)
		},
		methods:{
      tapActive:function(name){
      	 this.$router.push({path:'/admin/'+name})
         this.changtitle(name)
      },
      changtitle:function(name){
        switch(name){
          case 'basic':
            this.admin_title='基本设置'
          break;
          case 'home':
            this.admin_title='首页设置'
          break;
          case 'banner':
          case 'bannerset':
            this.admin_title='栏目设置'
          break;
        }
      }
		},
		components: {
      HeaderRight
		}
	}
</script>
<style type="text/css">
	.el-container .el-header{
		padding: 0;
	}
	.operation-del,
	.operation-add{
    height: 38px;
    line-height: 38px;
    border-radius: 4px;
    width: 38px;
    font-size: 11px;
    padding: 0;
	}
	.operation-del{
		margin-right: 5px;
	}
	.margin-bottom-7{
		margin-bottom: 7px;
	}
</style>
