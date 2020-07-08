<template>
  <div style="height: 100%;">
    <el-form label-position="right" label-width="120px" class="bannerset-mainForm" ref="FormRef">
      <!-- 栏目名称 -->
      <el-form-item label="栏目名称">
        <el-input class="banner-input" v-model="banner.bannername"></el-input>
      </el-form-item>
      <!-- 数据源 -->
      <ModelSources v-if="lodhtml" :dels="dels" :sources="sources" :filetrfileds="filetrfileds"></ModelSources>
      <!-- 文件排序 -->
      <el-form-item label="文件排序：">
        <el-radio-group v-model="banner.viewsort">
          <el-radio label="0">添加时间</el-radio>
          <el-radio label="1">下载最多</el-radio>
          <el-radio label="2">查看最多</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 列表布局模式 -->
      <el-form-item label="列表布局模式：">
        <el-radio-group v-model="banner.viewtype">
          <el-radio label="1">列表</el-radio>
          <el-radio label="2">瀑布</el-radio>
          <el-radio label="3">磁贴</el-radio>
          <el-radio label="4">图标</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 权限组件 -->
      <ModelUser v-if="lodhtml" :parameter="banner.permset"></ModelUser>
      <el-form-item>
        <el-button type="primary" @click="FormDateSubmit" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
        <!-- <el-button>重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lodhtml:false,
        RouteId:this.$route.params.id,
        sources: [],
        banner:{
          bannername: '',
          filetrfileds: [],
          viewsort: '0',
          viewtype: '1',
          permset: {
            viewperm: '1',
            downloadperm: '1',
            userviewperm: [],
            userdownloadperm: [],
          }
        },
        filetrfileds: [],
        fullscreenLoading: false,
        dels:{
          'sdels':[],
          'gdels':[],
          'rdels':[]
        },
      }
    },
    created() {
      if(this.RouteId == 'add'){
        this.lodhtml = true
      }else{
        this.getTableList()
      }
    },
    // watch: {
    //   FormDate: { //深度监听，可监听到对象、数组的变化
    //     handler(newV, oldV) {
    //       console.log(newV)
    //       console.log(this.$route.params.id)
    //     },
    //     deep: true
    //   }
    // },
    methods: {
      async getTableList(){
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
        });
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=banner&operation=editbanner",{bid:this.RouteId});
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        if(!res){
          this.$router.push({
            name: 'banner'
          })
        }
        var filetrfileds = []
        if(res.banner.filetrfileds.length){
          for(const i in res.banner.filetrfileds){
            var str = {
              flag:res.banner.filetrfileds[i]
            }
            filetrfileds.push(str)
          }
          this.filetrfileds = filetrfileds
        }
        var banner = {
          bannername: res.banner.bannername,
          filetrfileds: res.banner.filetrfileds,
          viewsort: res.banner.viewsort,
          viewtype: res.banner.viewtype,
          permset: res.banner.permset,
        }
        if(!res.banner.filetrfileds.length){
          var str = {
              viewperm: '1',
              downloadperm: '1',
              userviewperm: [],
              userdownloadperm: [],
            }
            this.filetrfileds = str
        }

        // 数据源处理
        const sources = []
        for(const u in res.sources){
          var j = res.sources[u]
          var str = {
            fid:j.sourcesdata,
            sid:j.sid,
            hassub: j.hassub,
            sourcesname: j.sourcesname,
            filters: [],
            options1:await this.getOption1(j.sourcesdata)
          }
          for(const f of j.filters){
            if(f.filtertype == 2){
              var filtertype = 1
              var condition = 1
            }else if(f.filtertype == 1){
              var filtertype = 0
              var condition = 1
            }else{
              var filtertype = 0
              var condition = 0
            }
            var str1 = {
              bsfid:f.bsfid,
              filtertype:filtertype,
              condition:condition,
              filterfiled:[]
            }
            for(const c of f.filterfiled){
              var ext = ''
              var fvalue = c.fvalue
              if(c.flag == 'fdateline' && c.fvalue){
                if(c.condition == 'range'){
                  var fvalues = []
                  var time1 = this.TimeConversion(c.fvalue[0]*1000)
                  var time2 = this.TimeConversion(c.fvalue[1]*1000)
                  fvalue.push(time1)
                  fvalue.push(time2)
                }else{
                  fvalue = this.TimeConversion(c.fvalue*1000)
                }
              }
              if(c.flag == 'fsize' && c.fvalue){
                var arr1 = c.fvalue.split("_");
                ext = arr1[1]
                fvalue = arr1[0]
              }
              var option = str.options1[c.flag]
              var str2 = {
                'ruleid':parseInt(c.ruleid),
                'filedtype':option.filedtype,
                'flag': c.flag,
                'condition':c.condition,
                'fvalue':fvalue,
                'extra':option.extra,
                'options':option.options,
                'ext':ext
              }
              str1.filterfiled.push(str2)
            }
            str.filters.push(str1)
          }
          sources.push(str)
        }
        this.banner = banner
        this.sources = sources
        this.lodhtml = true
        loading.close();
      },
      async getOption1(fid){
        const {data: res} = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=ajax&operation=getfiled", {fid: 'f_' + fid});
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        return res
      },
      async FormDateSubmit() {
        // 处理banner数据
        const oldbanner = this.banner
        const oldfiletrfileds = []
        if(this.filetrfileds.length){
          for(const i of this.filetrfileds){
            oldfiletrfileds.push(i.flag)
          }
        }
        const newbanner = {
          bannername:oldbanner.bannername,
          filetrfileds:oldfiletrfileds,
          viewsort:oldbanner.viewsort,
          viewtype:oldbanner.viewtype,
          permset:oldbanner.permset
        }
        // 处理规则数据
        const oldsources = this.sources
        const newsources = []
        for(const x of oldsources){
          newsources[x.fid] = {
            sid:x.sid,
            hassub: x.hassub,
            sourcesname: x.sourcesname,
            filters: []
          }
          for(const y of x.filters){
            var filtertype = 0
            if(y.condition > 0){
              if(y.filtertype > 0){
                filtertype = 2
              }else{
                filtertype = 1
              }
            }else{
              break;
            }
            var str = {
              bsfid:y.bsfid,
              filtertype: filtertype,
              filterfiled: []
            }
            for(const h of y.filterfiled){
              var fvalue = h.fvalue
              if(h.ext){
                fvalue = h.fvalue+'_'+h.ext
              }
              if(h.filedtype == 'date'){
                if(h.condition == 'range'){
                  var arr1 = []
                  var time1 = new Date(h.fvalue[0])
                  var time2 = new Date(h.fvalue[1])
                  arr1.push(time1.valueOf()/1000)
                  arr1.push(time2.valueOf()/1000)
                  fvalue = arr1
                }else if(h.condition == 'beforerange'){
                  fvalue = h.fvalue
                }else{
                  var time1 = new Date(h.fvalue)
                  fvalue = time1.valueOf()/1000
                }
              }
              var filterfileds = {
                ruleid:parseInt(h.ruleid),
                flag: h.flag,
                condition: h.condition,
                fvalue: fvalue
              }
              str.filterfiled.push(filterfileds)
            }
            newsources[x.fid].filters.push(str)
          }
        }
        this.fullscreenLoading = true;
        if(this.RouteId == 'add'){
          const {data: res} = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=banner&operation=add", {
            banner: newbanner,
            sources: newsources
          });
          if(res && res.error && res.error == 1){
            var herf = encodeURIComponent(window.location.href)
            window.location.href="admin.php?referer="+herf
            return false;
          }
          if(res.success){
            this.$router.push({
              name: 'banner'
            })
          }else{
            this.fullscreenLoading = false;
            this.$message.error('提交失败');
          }
        }else{
          const {data: res} = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=banner&operation=editbanner", {
            banner: newbanner,
            sources: newsources,
            bid:this.RouteId,
            dels:this.dels,
            submit:true
          });
          if(res && res.error && res.error == 1){
            var herf = encodeURIComponent(window.location.href)
            window.location.href="admin.php?referer="+herf
            return false;
          }
          if(res.success){
            this.$router.push({
              name: 'banner'
            })
          }else{
            this.fullscreenLoading = false;
            this.$message.error('提交失败');
          }
        }


      },
      TimeConversion(time){
        var date = new Date(time); //获取一个时间对象
        var Y = date.getFullYear();  // 获取完整的年份(4位,1970)
        var M = date.getMonth() + 1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
        var D = date.getDate();  // 获取日(1-31)
        return `${Y}-${M}-${D}`
      }
    },
    components: {
      'ModelSources': () => import('@/components/admin/bannerset/sources.vue'),
      'ModelUser': () => import('@/components/admin/bannerset/permset.vue'),
    }
  }
</script>
<!-- tag类型，标签走gettag
用户走getuser -->
<style>
  .bannerset-popover .iconFirstWord {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-right: 2px;
    color: #FFFFFF;
  }
</style>
<style lang="less" scoped>
  .bannerset-mainForm {
    width: 1000px;
    margin: 0 auto;

    /deep/ .el-form-item__content .el-row:first-child .el-col {
      margin-left: -10px;
      margin-right: 10px;
    }

    // .item-val /deep/ .el-row:first-child .el-col {
    //   margin-left: -10px;
    //   margin-right: 10px;
    // }
    /deep/ .flag-color {

      .el-color-picker,
      .el-color-picker__trigger {
        width: 100%;
      }

      .el-color-picker__icon {
        display: none;
      }
    }

    /deep/ .el-select {
      width: 100%;
    }

    .banner-input /deep/ .el-input__inner {
      width: 400px;
    }

  }
</style>
