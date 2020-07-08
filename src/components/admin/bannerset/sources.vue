<template>
  <div>
    <el-form-item label="数据源：">
     <template v-for="(item,key) in sources">
        <el-row :gutter="20" class="margin-bottom-7" :key="key">
          <el-col :span="6">
            <el-input readonly v-model="item.sourcesname"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="item.hassub">
              <el-option label="不包含子级" :value="'0'" :key="'0'"></el-option>
              <el-option label="包含子目录" :value="'1'" :key="'1'"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button class="operation-del" icon="el-icon-minus" @click="delsources(item.sid,key)"></el-button>
          </el-col>
        </el-row>
      </template>
      <el-row class="margin-bottom-7">
        <el-col :span="6" style="margin-left: 0;">
          <el-popover
            v-model="PopoverModel"
            trigger="click"
            popper-class="bannerset-popover">
            <el-tree
              ref="sourceref"
              :load="GetTreeData"
              lazy
              :expand-on-click-node="false"
              node-key="id"
              accordion
              highlight-current
              @node-click="handleNodeClick">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <el-avatar v-if="data.icon" :src="data.img"></el-avatar>
                  <i v-else :class="data.img"></i>
                  <span v-html="node.label"></span>
                </span>
              </span>
            </el-tree>
            <el-button round type="info" size="small" style="width: 150px;" slot="reference">
              <span class="dzz dzz-add"></span>
              添加数据源
            </el-button>
          </el-popover>

        </el-col>
      </el-row>
    </el-form-item>
    <template v-for="item in sources">
      <ModelRules :reference="item" :dels="dels"></ModelRules>
    </template>
    <ModelScreening v-if="sources.length" :reference="filetrfileds" :options="StorageOptions1"></ModelScreening>
  </div>
</template>

<script>
	export default {
    props: ['sources','filetrfileds','dels'],
		data(){
			return {
        asdf:false,
        PopoverModel:false,
        PermProps: {
          id: 'id',
          label: 'label',
          icon: 'icon',
        },
        StorageFid:[],//储存fid，使添加不重复
        StorageOptions1:[]//储存筛选项的值
			}
		},
    created() {
      for(const i in this.sources){
        this.OrganizationOptions(this.sources[i].options1)
        this.StorageFid.push(this.sources[i].fid)
      }
    },
		methods: {
      delsources(sid,key){
        if(sid){
          this.dels.sdels.push(sid)
          this.sources.splice(key,1)
        }

      },
      async GetTreeData(node, resolve) {
        if (node.level === 0) {
          var id = '#'
        } else {
          var id = node.data.id
        }
        var arr = []
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=system&op=positionlist&do=get_children", {id: id});
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        for (var i = 0; i < res.length; i++) {
          if (res[i].icon) {
            var img = res[i].icon;
          } else {
            var img = 'dzz dzz-folder';
          }
          var str = {
            label: res[i].text,
            id: res[i].id,
            icon: res[i].icon,
            img: img,
            fid: res[i].fid
          }
          arr.push(str)
        }
        resolve(arr)
      },

      async handleNodeClick(data){// tree节点点击
        if(this.StorageFid.indexOf(data.fid) > -1){
          this.$message({
            showClose: true,
            message: '节点重复',
            type: 'error'
          });
          return false;
        }
        this.StorageFid.push(data.fid)
        var Path = await this.getFidPathData(data.fid);
        var str = {
          fid:data.fid,
          sid:'',
          hassub: '0',
          sourcesname: Path.relativepath,
          filters: [],
          options1:''
        }
        var ReturnKey = this.sources.push(str)
        this.getOption1(data.fid,ReturnKey-1)
        this.$refs.sourceref.setCurrentKey();
        this.PopoverModel = false
      },
      async getFidPathData(fid) {
        const res = await this.axios.post(this.AxiosApi + "index.php?mod=system&op=positionlist&do=geffolderinfo", {
          fid: fid
        });
        return res.data;
      },
      async getOption1(fid,key){
        const {data: res} = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=admin&do=ajax&operation=getfiled", {fid: 'f_' + fid});
        this.sources[key].options1 = res
        this.OrganizationOptions(res)
      },
      OrganizationOptions(res){
        for (var it in res) {
          var status = true
          for(const val of this.StorageOptions1){
            if (val.flag == it) {
              status = false
            }
          }
          if(status){
            this.StorageOptions1.push(res[it])
          }
        }
      }
		},
    components: {
      'ModelRules': () => import('@/components/admin/bannerset/sources_rules.vue'),
      'ModelScreening': () => import('@/components/admin/bannerset/screening.vue')
    }
	}
</script>
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
  .bannerset-popover .el-tree .el-avatar{
    width: 20px;
    height: 20px;
    background: transparent;
    margin-right: 5px;
    vertical-align: top;
  }
  .bannerset-popover .el-tree .dzz{
    font-size: 15px;
    margin-right: 5px;
    color: #888888;
  }
</style>
