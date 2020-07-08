<template>
  <el-container class="search-container">
    <el-header height="64px" style="background: #F8F8F8;">
      <nav class="navbar nnavbar-default bs-top-container">
        <div class="resNav-item resNav-left">
          <el-image style="max-width: 35px; max-height: 35px;padding: 15px 0;" :src="PageData.logoimg" fit="contain">
            <div slot="error" class="image-slot" style="line-height: 35px;">
              <i class="el-icon-picture-outline" style="color: #909399;"></i>
            </div>
          </el-image>
        </div>
        <div class="resNav-item resNav-center" style="overflow: hidden;">
          <el-input placeholder="请输入内容" v-model="SearchKeyword" @keyup.enter.native="handleKeyword" class="input-with-select"
            style="width: 400px;">
            <el-button slot="append" @click="handleKeyword" icon="el-icon-search">搜索</el-button>
          </el-input>
          <div style="float: right;height: 64px;line-height: 64px;">
            <el-dropdown trigger="click" class="layout-style" @command="handleCommand">
              <span class="el-dropdown-link">
                <i v-if="MainHtml == 'Mimg'" class="dzz dzz-view-module"></i>
                <i v-else-if="MainHtml == 'Melastic'" class="dzz dzz-photo-actual"></i>
                <i v-else-if="MainHtml == 'Mlist'" class="dzz dzz-view-list"></i>
                <i v-else-if="MainHtml == 'Mwaterfall'" class="dzz dzz-appstore"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="dzz dzz-view-module" command="Mimg">图标</el-dropdown-item>
                <el-dropdown-item icon="dzz dzz-photo-actual" command="Melastic">磁贴</el-dropdown-item>
                <el-dropdown-item icon="dzz dzz-view-list" command="Mlist">列表</el-dropdown-item>
                <el-dropdown-item icon="dzz dzz-appstore" command="Mwaterfall">瀑布</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="segmentation"></div>
          </div>
        </div>
        <div class="resNav-item resNav-right">
          <HeaderRight></HeaderRight>
        </div>
      </nav>
    </el-header>
    <el-main style="padding-top: 0;" v-infinite-scroll="loadmore">

      <Mscreening
        v-if="loadclass"
        :DataBanners="DataBanners"
        :DataFilterdata="DataFilterdata"
        :pathchange="pathchange"
        :pagemore="pagemore"
        @handleftype="GetFtype"
        @EmptyKeyWord="EmptyKeyWord"></Mscreening>
      <div v-else v-loading="true" element-loading-text="筛选加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="#F8F8F8" style=" padding: 30px;margin-top: 20px;margin-bottom: 20px;padding-left: 130px;background: #F8F8F8;height: 80px;margin-left: 25px;margin-right: 25px;"></div>

      <div class="imgs-layout">
        <component v-if="loadimg && !ImageIf" :is="MainHtml" :ImageData="ImageData"></component>
        <div v-else-if="!loadimg && !ImageIf" v-loading="true" element-loading-text="图片加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#F8F8F8" style="padding: 30px;margin-top: 20px;margin-bottom: 20px;padding-left: 130px;background: #F8F8F8;height: 150px;"></div>
        <div v-show="ImageIf" style="padding: 30px;margin-top: 20px;margin-bottom: 20px;padding-left: 130px;background: #F8F8F8;height: 150px;text-align: center;line-height: 150px;">暂无数据</div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    watch: {
      $route(to, from) {
        if(this.ChangeRoute){
          this.Getbanner()
        }else{
          this.GetSearchList()
          this.ChangeRoute = true
        }

      }
    },
    created() {
      this.GetPageData()
      this.Getbanner()
    },
    wathc:{
      ImageData: function() {
        console.log(1111)
        // this.$nextTick(function(){
        //   this.rowGrid_plug()
        // })
      }
    },
    data() {
      return {
        SearchKeyword: this.$route.query.keyword,
        PageData:'',//首页信息
        DataBanners: [], //栏目信息
        presentBanners: '', //当前栏目信息
        DataFilterdata: [], //筛选项
        loadclass: false, //筛选
        loadimg: false, //图片加载
        ImageIf: false, //没有图片情况
        MainHtml: '', //图片格式
        ImageData: [], //图片数据
        pathchange: true,//筛选项是否可以点击
        ChangeRoute:true,//是否只加载图片，或者筛选项
        pagemore:{},//筛选加载更多
      }
    },
    methods: {
      handleKeyword(){
        this.ChangeRoute = false
        this.$router.push({
        	query: {
        		bids: this.$route.query.bids,
        		keyword: this.SearchKeyword,
        		ppath: this.$route.query.ppath
        	}
        });
      },
      async GetPageData(){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=gethomepage");
        this.PageData = res
        console.log(this.PageData)
      },
      async Getbanner() {
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=getselectdata", {
          bids: this.$route.query.bids
        });
        this.DataBanners = res.banner
        this.DataFilterdata = res.filterdata
        for(const x of this.DataFilterdata){
          if(x.valcount && Number(x.valcount) > 20){
            this.pagemore[x.flag] = 2
          }
        }
        for (const i of res.banner) {
          if (Number(i.id) == Number(this.$route.query.bids)) {
            this.presentBanners = i
          }
        }
        switch (this.presentBanners.viewtype) {
          case '1':
            this.MainHtml = 'Mlist'
            break;
          case '2':
            this.MainHtml = 'Mwaterfall'
            break;
          case '3':
            this.MainHtml = 'Melastic'
            break;
          case '4':
            this.MainHtml = 'Mimg'
            break;
        }
        this.loadclass = true
        this.GetSearchList()
      },
      async GetSearchList() {
        this.pathchange = false
        this.ImageIf = false
        this.loadimg = false
        const conditions = this.handlePpath(true)
        var str = {
          bids: this.$route.query.bids,
          conditions: conditions
        }
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=filelist", str);
        if (res.error) {
          this.ImageIf = true
        } else {
          this.ImageData = res.datas
          this.loadimg = true
        }
        this.pathchange = true
      },

      handlePpath(type) {
        const conditions = []
        if (type && this.SearchKeyword) {
          var str = {
            keyword: this.SearchKeyword
          }
          conditions.push(str)
          this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=addkeywordnum", {
            keyword: this.SearchKeyword
          });
        }
        if (this.$route.query.ppath && this.$route.query.ppath != '') {
          var fppath = this.$route.query.ppath
          const ppath = JSON.parse(fppath);
          for (const i in ppath) {
            for (const x of this.DataFilterdata) {
              if (i == x.flag) {
                if(x.filedtype == 'string' ||　x.filedtype == 'user' ||　x.filedtype == 'grade'){
                  var str = {
                    filedtype: x.filedtype,
                    flag: x.flag,
                    fvalue: ppath[i],
                    condition: 'is'
                  }
                }else if(x.filedtype == 'tag'){
                  var str = {
                    filedtype: x.filedtype,
                    flag: x.flag,
                    fvalue: ppath[i],
                    condition: 'or'
                  }
                }else{
                  var str = {
                    filedtype: x.filedtype,
                    flag: x.flag,
                    fvalue: ppath[i],
                    condition: 'eq'
                  }
                }

                conditions.push(str)
              }
            }
          }
        }
        return conditions;
      },
      async GetFtype() {
        const conditions = this.handlePpath()
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=gettype",
        {
          bids: this.$route.query.bids,
          conditions: conditions
        });
        for(const i of this.DataFilterdata){
          if(i.flag == 'ftype'){
            i.val = res
          }
        }
      },
      EmptyKeyWord(){
        this.SearchKeyword = ''
      },
      handleCommand(command) {
        this.MainHtml = command
      },
      loadmore: function() {
        // this.ImageDatas = this.ImageDatas.concat(this.originDatas);
      },
      // 改变图片布局
      HeaderDropdown: function(style) {
        this.MainHtml = style
      }
    },
    components: {
      'HeaderRight': () => import('@/components/header_right.vue'),
      'Mwaterfall': () => import('@/components/search/waterfall.vue'),
      'Melastic': () => import('@/components/search/elastic.vue'),
      'Mimg': () => import('@/components/search/img.vue'),
      'Mlist': () => import('@/components/search/list.vue'),
      'Mscreening': () => import('@/components/search/screening.vue')
    }
  }
</script>
<style lang="less" scoped>
  .search-container {
    .navbar.bs-top-container {
      background: transparent;
      margin-left: 10px;
      margin-right: 10px;
      .resNav-left {
        padding-right: 25px;
      }

      .resNav-center {
        /deep/ .el-input__inner {
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
          border-color: #FF5D37;
        }

        /deep/ .el-input-group__append {
          border-top-right-radius: 18px;
          border-bottom-right-radius: 18px;
          border-color: #FF5D37;
          background: #FF5D37;
          color: #ffffff;
        }

        .layout-style {
          height: 35px;
          width: 35px;

          .el-dropdown-link {
            color: #888888;
            font-size: 16px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: inline-block;
            text-align: center;
            line-height: 35px;
            cursor: pointer;
            float: right;
            background: #EEEEEE;
          }
        }

        .segmentation {
          width: 1px;
          height: 34px;
          background: #DCDFE6;
          display: inline-block;
          margin-top: 15px;
          margin-left: 15px;
          margin-right: 15px;
        }
      }

      .resNav-right {
        ul{
          padding-right: 0;
        }
        /deep/ .rigth-div {
          color: #A0A0A0 !important;
        }
      }
    }

    .el-main {
      .el-menu--horizontal>.el-menu-item {
        height: 40px;
        line-height: 40px;
      }

      .imgs-layout {
        padding: 30px 25px;
      }

    }

  }
</style>
