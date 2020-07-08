<template>
  <el-form-item style="margin-bottom: 15px;">
    <ul class="user-groups clearfix">
      <li class="user-groups-add">
        <div class="user-groups-div" @click="dialogUserVisible = true">
          <i class="dzz dzz-add"></i>
        </div>
        <span class="name">添加成员</span>
      </li>
      <li v-for="item in showdata">
        <div class="user-groups-div">
          <div class="avatar avatar-lg">
            <span class="Topcarousel" :style="{background:item.headercolor}">
              <img v-if="item.icon" :src="item.icon" class="img-circle">
              <span v-else>{{item.firstword}}</span>
            </span>
          </div>
        </div>
        <span v-if="item.textname" class="name" v-html="item.textname"></span>
        <span v-else class="name">{{item.username}}</span>
      </li>
    </ul>
    <el-dialog title="添加用户" custom-class="permdialog" :visible.sync="dialogUserVisible" :close-on-click-modal="false" :show-close="false" width="600px">
      <el-row :gutter="20" style="border-bottom: 1px solid #e1e1e1;border-top: 1px solid #e1e1e1;">
        <el-col :span="12" style="border-right: 1px solid #e1e1e1;height: 300px;overflow: auto;padding: 15px;">
          <el-tree
          ref="PermUserRef"
          :props="PermProps"
          show-checkbox lazy
          :load="GetPermUser"
          node-key="id"
          @check-change="CheckTrue"
          :default-expanded-keys="OpenExpanded"
          :default-checked-keys="Openchecked">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <el-avatar v-if="data.icon" class="Topcarousel" size="small" :src="data.icon"></el-avatar>
                <span v-html="node.label"></span>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="12" style="height: 300px;overflow: auto;padding:0 15px 15px 15px;">
          <p>已选择&nbsp;<span>{{RightShowsLength}}</span>&nbsp;个用户</p>
          <ul class="perm-right-class" style="padding-left: 0;">
            <li class="right-classa-depart" v-for="item in RightShows">
              <img v-if="item.icon" :src="item.icon">
              <span v-html="item.label"></span>
            </li>
          </ul>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserClose">取 消</el-button>
        <el-button type="primary" @click="dialogUserConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-form-item>

</template>

<script>
  export default {
    props: ['reference', 'type','message'],
    created() {
      if(this.message){
        this.showdata = this.message
      }
      this.Openchecked = this.reference
    },
    data() {
      return {
        dialogUserVisible: false,
        OpenExpanded: [], //默认展开
        Openchecked:[],//默认选中
        PermProps: {
          id: 'id',
          label: 'label',
          icon: 'icon',
          children: 'children',
          isLeaf: 'leaf',
        },
        RightShows: [],
        showdata: [],
        RightShowsLength: 0
      }
    },
    methods: {
      async GetPermUser(node, resolve) {
        if (node.level === 0) {
          var id = '#'
        } else if (node.level > 1) {
          return resolve([]);
        } else {
          var id = node.data.id
        }
        const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=system&op=orgtree&do=orgtree", {
          id: id,
          nouser: '0',
          moderator: '0',
          stype: '2',
          range: '0',
          showjob: '0'
        });
        if(res && res.error && res.error == 1){
          var herf = encodeURIComponent(window.location.href)
          window.location.href="admin.php?referer="+herf
          return false;
        }
        var arr = []
        for (var i in res) {
          var icon = '';
          icon = res[i].icon
          if (res[i].icon) {
            icon = res[i].icon
          }
          if (res[i].type == 'user') {
            var str = {
              id: res[i].li_attr.uid,
              icon: icon,
              label: res[i].text,
              type: res[i].type,
              leaf: true,
              firstword: res[i].firstword,
              headercolor: res[i].headercolor,
              textname: res[i].textname,
            }
          } else {
            var str = {
              id: res[i].id,
              icon: icon,
              label: res[i].text,
              type: res[i].type,
              leaf: false,
            }
            this.OpenExpanded.push(res[i].id)
          }
          arr.push(str)
        }
        resolve(arr);

        this.GetCheckedNodes()
      },
      CheckTrue(data, checked, indeterminate) {
        // if (checked && this.OpenExpanded.indexOf(data.id) < 0) {
        //   this.OpenExpanded.push(data.id)
        // }
        this.GetCheckedNodes()
      },
      GetCheckedNodes() {
        var data = this.$refs.PermUserRef.getCheckedNodes();
        const arr = [];
        const repeat = []
        for (const i of data) {
          if (i.type == 'user') {
            if (repeat.indexOf(i.id) < 0) {
              arr.push(i)
              repeat.push(i.id)
            }

          }
        }
        this.RightShows = arr
        this.RightShowsLength = arr.length
      },
      dialogUserConfirm() {
        console.log(this.RightShows)
        this.showdata = this.RightShows
        const arr = {
          type:this.type,
          users:[]
        }
        for(const i of this.showdata){
          arr.users.push(i.id)
        }
        this.$emit('eventMsg',arr)
        this.dialogUserVisible = false
      },
      dialogUserClose() {
        this.$refs.PermUserRef.setCheckedKeys(this.reference);
        this.dialogUserVisible = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-dialog__wrapper {
    .el-dialog__header {
      text-align: center;
    }

    .el-dialog__body {
      padding: 10px 20px;
    }

    .permdialog .perm-right-class {
      padding-left: 0px;

      li {
        padding-left: 15px;
        line-height: 40px;
        margin-left: 5px;
        position: relative;
        height: 40px;
        padding-right: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }

  .banner-txt {
    margin: 0;
  }

  .user-groups {
    padding-left: 0;
    overflow: hidden;

    li {
      float: left;
      text-align: center;

      &.user-groups-add .user-groups-div {
        text-align: center;
        line-height: 67px;
        width: 67px;
        height: 67px;
        font-size: 37px;
        color: #E1E0DF;
        position: relative;

        .dzz {
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: block;
          width: 35px;
          height: 35px;
        }
      }

      .user-groups-div {
        border: 1px solid #E0E0E0;
        border-radius: 50%;
        padding: 3px;
        margin-left: 5px;
        cursor: pointer;
      }

      .avatar.avatar-lg {
        width: 70px;
        height: 70px;
      }

      .avatar.avatar-lg img.img-circle {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      .avatar.avatar-lg .Topcarousel {
        font-size: 45px;
        width: 70px;
        height: 70px;
        line-height: 70px;
        border-radius: 50%;
        text-align: center;
        display: inline-block;
        color: #FFF;
      }
    }
  }
</style>
