<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%"
    v-loading="TableLoading">
      <el-table-column label="栏目名称" prop="bannername"></el-table-column>
      <el-table-column label="数据源" prop="sourcesname"></el-table-column>
      <el-table-column label="列表模式" prop="viewtype"></el-table-column>
      <el-table-column label="默认排序方式" prop="viewsort"></el-table-column>
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :enterable="false" content="查看" placement="top-start">
            <el-button size="mini" type="info" icon="el-icon-view"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="bannersetSrc(scope.row.id)"></el-button>
          </el-tooltip>
          <!--<el-tooltip effect="dark" :enterable="false" content="停用" placement="top-start">
    		       	<el-button size="mini" type="warning" icon="el-icon-video-pause"></el-button>
    		    </el-tooltip>-->
          <el-tooltip effect="dark" :enterable="false" content="启动" placement="top-start">
            <el-button size="mini" type="warning" icon="el-icon-video-play"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" :enterable="false" content="移动" placement="top-start">
            <el-button size="mini" type="danger" icon="el-icon-rank"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-popconfirm
              style="margin-left: 10px;"
              confirmButtonText='确认'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除？"
              @onConfirm="delbanber(scope.$index,scope.row.id)"
            >
              <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
            </el-popconfirm>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="info" round size="small" style="width: 220px;margin-top: 15px;" @click="bannersetSrc('add')">
      <span class="dzz dzz-add"></span>
      添加
    </el-button>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        TableLoading:true
      }
    },
    created() {
      this.getTableList()
    },
    methods: {
      async delbanber(key,id){
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=banner&operation=deletebanner",{bid:id});
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        if(res.success){
          this.$message('删除成功');
          this.tableData.splice(key,1)
        }else{
          this.$message.error('删除失败');
        }
      },
      async getTableList() {
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=banner");
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        if(res){
          for (var i of res) {
            var viewtype = ''
            if (i.viewtype == 1) {
              viewtype = '列表'
            } else if (i.viewtype == 2) {
              viewtype = '瀑布'
            } else if (i.viewtype == 3) {
              viewtype = '磁贴'
            } else if (i.viewtype == 4) {
              viewtype = '图标'
            }
            var viewsort = ''
            if (i.viewsort == 0) {
              viewsort = '添加时间'
            } else if (i.viewsort == 1) {
              viewsort = '下载最多'
            } else if (i.viewsort == 2) {
              viewsort = '查看最多'
            }
            var str = {
              id: i.id,
              bannername: i.bannername,
              sourcesname: i.sourcesname,
              viewtype: viewtype,
              viewsort: viewsort
            }
            this.tableData.push(str)
          }
        }
        this.TableLoading = false
      },
      bannersetSrc: function(id) {
        this.$router.push({
          name: 'bannerset',
          params: {
            id: id
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
