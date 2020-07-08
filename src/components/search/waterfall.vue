<template>
  <div class="container-water-fall">
    <waterfall v-if="ImageData.length" :col="col" :data="ImageData">
      <template>
        <div class="cell-item" v-for="(item,index) in ImageData" :key="index">
          <span class="ext">{{item.ext}}</span>
          <el-image :src="item.img" :preview-src-list="srcList"></el-image>
          <div class="item-body">
            <div class="item-footer">
              <div class="name">{{item.name}}</div>
              <div class="like">
                <el-dropdown trigger="click" class="operation-dropdown">
                  <span class="dzz dzz-more like-total"></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="dzz dzz-download">下载</el-dropdown-item>
                    <el-dropdown-item icon="dzz dzz-share">分享</el-dropdown-item>
                    <el-dropdown-item icon="dzz dzz-photo">加入相册</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <div v-else style="padding: 30px;margin-top: 20px;margin-bottom: 20px;padding-left: 130px;background: #F8F8F8;height: 150px;margin-left: 25px;margin-right: 25px;text-align: center;line-height: 150px;">暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    ImageData: Array,
  },
  data() {
    return {
      col: 6,
      srcList:[]
    };
  },
  created(){
    console.log(this.ImageData)
    for(var i in this.ImageData){
      this.srcList.push(this.ImageData[i].img)
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style  lang="less" scoped>
.container-water-fall {
  width: 100%;
  box-sizing: border-box;
  .cell-item {
    width: 100%;
    background: #ffffff;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    .ext{
      position: absolute;
      left: 17px;
      top: 17px;
      font-size: 16px;
      background: #0D3C4E;
      color: #FFFFFF;
      z-index: 10;
      padding: 0 5px;
      border-radius: 9px;
      line-height: 24px;
      display: inline-block;
      height: 27px;
    }

    .el-image{
      width: 100%;
      /deep/ img {
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
        opacity: 1;
      }
      /deep/ .el-image__error{
        height: 100px;
        border-radius: 12px;
      }
    }

    .item-body {
      padding: 12px;
      text-align: left;
      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
      }
      .item-footer {
        position: relative;
        display: flex;
        align-items: center;
        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }
        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          .operation-dropdown{
            cursor: pointer;
            .dzz-icon{
              font-size: 24px;
              color: #C0C0C0;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
