<template>
  <el-container class="index-container">
    <el-header>
      <nav class="navbar nnavbar-default bs-top-container" id="bs_top_container">
        <div class="resNav-item resNav-left">
          <el-image style="max-width: 35px; max-height: 35px;padding: 15px 0;" :src="DataList.logoimg" fit="contain">
            <div slot="error" class="image-slot" style="line-height: 35px;">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>

        </div>
        <div class="resNav-item resNav-center" style="overflow: hidden;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页" name="0" ></el-tab-pane>
            <el-tab-pane v-for="item in DataList.banner" :label="item.bannername" :name="item.bid"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="resNav-item resNav-right">
          <HeaderRight></HeaderRight>
        </div>
      </nav>
    </el-header>
    <el-main>
      <section class="home-banner">
        <el-image style="position: absolute;left: 0;top:0;width: 100%;height: 100%;" :src="DataList.bgimg"
          fit="cover"></el-image>
        <div class="index-header-input">
          <div class="header-txt-item">
            <h1>欧奥图库</h1>
            <el-input v-model="SearchVal" @keyup.enter.native="searchchange">
              <el-button slot="append" icon="el-icon-search" @click="searchchange"></el-button>
            </el-input>
            <div class="hot-search">
              <label v-if="hots.length > 0" for="">热搜：</label>
              <ul v-if="hots.length > 0">
                <li v-for="item in hots" @click="handelhot(item.keyword)">{{item.keyword}}</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
      <section style="padding: 10px 20px;">
        <template v-for="item in DataList.banner">
          <Mimage :parameter="item"></Mimage>
        </template>
      </section>
      <section class="home-link" v-if="DataList.links.length > 0">
        <h1>友情链接</h1>
        <ul>
          <li v-for="item in DataList.links">
            <a :href="'https://'+item.link" target="_blank">{{item.name}}</a>
          </li>
        </ul>
      </section>
    </el-main>
    <el-footer height="auto">
      <el-row>
        <el-col class="footer-left" :span="12">北京巧巧时代网络科技有限公司</el-col>
        <el-col class="footer-right" :span="12">
          <span>2020</span>
          <span>oaooa.com</span>
          <span>京备2989894394945</span>
        </el-col>
      </el-row>
      </div>
    </el-footer>
  </el-container>

</template>

<script>
  import HeaderRight from '@/components/header_right.vue'
  export default {
    props:['DataList','hots'],
    data() {
      return {
        activeName:0,
        Banners:'',
        Imags:[],
        SearchVal:''
      }
    },
    mounted() {
      //给el-main添加一个滚动滚动监听事件
      window.addEventListener('scroll', this.MainScroll);
      document.getElementsByTagName("body")[0].style.height = 'auto'
      document.getElementsByTagName("html")[0].style.overflow = 'auto'
      document.getElementById('app').style.height = 'auto'
    },
    created() {
      this.getImags()
    },
    methods: {
      handleClick(res){
        if(Number(res.name) > 0){
          this.$router.push({
            name: 'search',
            query: {
              bids: res.name
            }
          })
        }
      },
      handelhot(keyword){
        this.$emit('handelkeyword',keyword)
      },
      async getImags(){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=gethotkeyword");
      },
      searchchange(){
        var str = this.SearchVal.trim();
         if(str){
           this.$emit('handelkeyword',str)
         }else{
           this.$message.error('消息内容不能为空');
         }
      },
      MainScroll: function() {
        var offsetTop = window.pageYOffset || window.scrollTop || window.scrollTop;
        var dom_top = document.getElementById('bs_top_container');
        if (offsetTop > 0) {
          if (dom_top.classList.contains('fixed-header') == false) {
            dom_top.className += ' fixed-header';
          }
        } else {
          dom_top.classList.remove('fixed-header')
        }
      },
    },
    components: {
      'HeaderRight': () => import('@/components/header_right.vue'),
      'Mimage':() => import('@/components/index/image.vue'),
    },
    destroyed() { //离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.handleScroll)
      document.getElementsByTagName("body")[0].style.height = '100%'
      document.getElementsByTagName("html")[0].style.overflow = 'hidden'
      document.getElementById('app').style.height = '100%'
    },
  }
</script>
<style>

</style>

<style lang="less" scoped>
  .index-container {
    .el-header {
      height: 0 !important;

      .bs-top-container {
        background: transparent;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 100;

        &.fixed-header {
          background: #FFFFFF;
          box-shadow: 0 8px 50px -6px rgba(84, 84, 120, .26);

          .el-tabs /deep/ .el-tabs__item {
            color: #303133 !important;
          }

          .el-tabs /deep/ .el-tabs__item:hover,
          .el-tabs /deep/ .el-tabs__item.is-active {
            color: #409EFF !important;
          }

          .el-tabs /deep/ .el-tabs__active-bar {
            background-color: #409EFF !important;
          }

          .resNav-right /deep/ .rigth-div {
            color: #A0A0A0 !important;
          }
        }

        .resNav-left {
          padding: 0 30px;
        }

        .el-tabs {
          height: 64px;
        }

        .el-tabs /deep/ .el-tabs__header {
          margin: 0;
          .el-tabs__nav-wrap {
            font-size: 16px;
            color: #FFFFFF;

            &::after {
              height: 0;
            }

            .el-tabs__nav-next,
            .el-tabs__nav-prev {
              line-height: 64px;
              color: #FFFFFF;
            }

            .el-tabs__active-bar {
              bottom: 10px;
            }

            .el-tabs__item {
              color: #FFFFFF;
              font-size: 15px;
              text-shadow: 1px 1px 1px RGBA(0,0,0,.2);
              &.is-active {
                color: #FFFFFF;
              }

              &:hover {
                color: #FFFFFF;
              }
            }

            .el-tabs__active-bar {
              background-color: #FFFFFF;
            }
          }
        }
      }
    }

    .el-main {
      padding: 0;
      overflow: unset;

      // 搜索内容
      .home-banner {
        position: relative;

        .el-image {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
        }

        .index-header-input {
          padding-top: 64px;
          overflow: hidden;

          .header-txt-item {
            width: 780px;
            margin: 0 auto;
            overflow: hidden;

            h1 {
              color: #FFFFFF;
              position: relative;
              text-align: center;
              font-size: 58px;
              letter-spacing: 5px;
              text-shadow: 1px 1px 1px RGBA(0,0,0,.2);
            }

            .el-input /deep/ .el-input__inner {
              height: 60px;
              font-size: 16px;
              padding-right: 60px;
            }
            .el-input /deep/ .el-input-group__append {
              font-size: 20px;
            }

            .hot-search {
              font-size: 16px;
              padding: 40px 0 70px 0;
              position: relative;
              color: #FFFFFF;
              text-shadow: 1px 1px 1px RGBA(0,0,0,.2);
              label {
                float: left;
                width: 7%;
                padding: 10px;
              }

              ul {
                overflow: hidden;
                margin: 0;
                padding: 0;

                li {
                  padding: 10px;
                  display: inline-block;
                  cursor: pointer;
                }
              }


            }
          }
        }
      }

      // 友情链接
      .home-link {
        padding: 0 120px;
        text-align: center;
        color: #555555;

        h1 {
          font-size: 25px;
          padding: 25px 0;
        }

        ul {
          padding: 0;
          margin: 0;
          overflow: hidden;
          margin-bottom: 40px;

          li {
            padding: 0 15px;
            display: inline-block;

            a {
              color: #555555;
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }

    .el-footer {
      background: #444444;
      color: #FFFFFF;
      line-height: 30px;

      .footer-right {
        text-align: right;

        span {
          margin-left: 8px;
        }
      }
    }
  }
</style>
