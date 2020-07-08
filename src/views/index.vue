<template>
  <Munfull v-if="DataList.hasimg > 0" :DataList="DataList" :hots="hots" @handelkeyword="SreachKey"></Munfull>
  <Mfull v-else :DataList="DataList" :hots="hots" @handelkeyword="SreachKey"></Mfull>
</template>

<script>
  export default {
    data() {
      return {
        IndexShow:'',
        DataList:'',
        hots:''
      }
    },
    created() {
      this.getbanner()
      this.gethotkeyword()
    },
    methods: {
      async getbanner(){
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=gethomepage");
        if(res){
          this.DataList = res
          console.log(this.DataList);
        }
        loading.close();
        // if(res){
        //  this.Banners = res
        // }
      },
      async gethotkeyword(){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=gethotkeyword");
        if(res){
          this.hots = res
        }
      },
      SreachKey:function(keyword){
        
        if(this.DataList.banner.length > 0){
          this.$router.push({
            name: 'search',
            query: {
              bids: this.DataList.banner[0].bid,
              keyword: keyword
            }
          })
        }else{
          this.$message.error('没有可搜索的栏目');
        }
      },

    },
    components: {
      'Munfull': () => import('@/components/index/unfull.vue'),
      'Mfull': () => import('@/components/index/full.vue')
    },
  }
</script>
<style>

</style>

<style lang="less" scoped>
  // .index-container {
  //   .el-header {
  //     height: 0 !important;
  //     .bs-top-container {
  //       background: transparent;
  //       position: fixed;
  //       left: 0;
  //       top: 0;
  //       width: 100%;
  //       z-index: 100;
  //       &.fixed-header{
  //       	background: #FFFFFF;
  //         box-shadow: 0 8px 50px -6px rgba(84,84,120,.26);
  //         .el-tabs /deep/ .el-tabs__item{
  //           color: #303133 !important;
  //         }
  //         .el-tabs /deep/ .el-tabs__item:hover,
  //         .el-tabs /deep/ .el-tabs__item.is-active{
  //           color: #409EFF !important;
  //         }
  //         .el-tabs /deep/ .el-tabs__active-bar{
  //           background-color: #409EFF !important;
  //         }
  //         .resNav-right /deep/ .rigth-div{
  //           color: #A0A0A0 !important;
  //         }
  //       }
  //       .resNav-left {
  //         padding: 0 30px;
  //       }
  //       .el-tabs{
  //         height: 64px;
  //       }
  //       .el-tabs /deep/ .el-tabs__header {
  //       	margin: 0;
  //       	.el-tabs__nav-wrap {
  //       		font-size: 16px;
  //       		color: #FFFFFF;
  //       		&::after {
  //       			height: 0;
  //       		}
  //       		.el-tabs__nav-next,
  //       		.el-tabs__nav-prev{
  //       			line-height: 64px;
  //       			color: #FFFFFF;
  //       		}
  //       		.el-tabs__active-bar{
  //       			bottom: 10px;
  //       		}
  //       		.el-tabs__item {
  //       			color: #FFFFFF;
  //       			&.is-active {
  //       				color: #FFFFFF;
  //       			}
  //       			&:hover {
  //       				color: #FFFFFF;
  //       			}
  //       		}
  //       		.el-tabs__active-bar {
  //       			background-color: #FFFFFF;
  //       		}
  //       	}
  //       }
  //     }
  //   }

  //   .el-main {
  //     padding: 0;
  //     overflow: unset;
  //     // 搜索内容
  //     .home-banner {
  //       position: relative;
  //       .el-image {
  //         position: absolute;
  //         left: 0px;
  //         top: 0px;
  //         width: 100%;
  //         height: 100%;
  //       }
  //       .index-header-input {
  //         padding-top: 64px;
  //         overflow: hidden;

  //         .header-txt-item {
  //           width: 780px;
  //           margin: 0 auto;
  //           overflow: hidden;

  //           h1 {
  //             color: #FFFFFF;
  //             position: relative;
  //             text-align: center;
  //             font-size: 58px;
  //             letter-spacing: 5px;
  //           }

  //           .hot-search {
  //             font-size: 16px;
  //             padding: 40px 0 70px 0;
  //             position: relative;
  //             color: #FFFFFF;
  //             label{
  //               float: left;
  //               width: 7%;
  //               padding: 10px;
  //             }
  //             ul{
  //               overflow: hidden;
  //               margin: 0;
  //               padding: 0;
  //               li {
  //                 padding: 10px;
  //                 display: inline-block;
  //               }
  //             }


  //           }
  //         }
  //       }
  //     }
  //     // 友情链接
  //     .home-link{
  //       padding: 0 120px;
  //       text-align: center;
  //       color: #555555;
  //       h1{
  //         font-size: 25px;
  //         padding: 25px 0;
  //       }
  //       ul{
  //         padding: 0;
  //         margin: 0;
  //         overflow: hidden;
  //         margin-bottom: 40px;
  //         li{
  //           padding: 0 15px;
  //           display: inline-block;
  //           a{
  //             color: #555555;
  //             text-decoration: none;
  //             &:hover{
  //                text-decoration: underline;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   .el-footer{
  //     background: #444444;
  //     color: #FFFFFF;
  //     line-height: 30px;
  //     .footer-right{
  //       text-align: right;
  //       span{
  //         margin-left: 8px;
  //       }
  //     }
  //   }
  // }
</style>
