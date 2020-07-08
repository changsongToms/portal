<template>
  <div>
    <el-row v-if="ImageData.length" class="img-row" :gutter="15">
      <template v-for="item in ImageData">
        <el-col :sm="12" :md="8" :lg="6" :xl="4">
          <div class="img-block">
            <span class="ext">{{item.ext}}</span>
            <el-image :src="item.img" :preview-src-list="srcList"></el-image>
            <div class="txt">{{item.name}}</div>
            <el-dropdown trigger="click" class="operation-dropdown">
              <div class="dzz dzz-more dzz-icon"></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="dzz dzz-download">下载</el-dropdown-item>
                <el-dropdown-item icon="dzz dzz-share">分享</el-dropdown-item>
                <el-dropdown-item icon="dzz dzz-photo">加入相册</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </el-col>
      </template>
    </el-row>
    <div v-else style="padding: 30px;margin-top: 20px;margin-bottom: 20px;padding-left: 130px;background: #F8F8F8;height: 150px;margin-left: 25px;margin-right: 25px;text-align: center;line-height: 150px;">暂无数据</div>
  </div>
</template>

<script>
	export default {
    props: ['ImageData'],
		data(){
			return {
        srcList:[]
			}
		},
		methods: {
		},
	}
</script>
<style  lang="less" scoped>
  .img-row{
    font-size: 0;
    .el-col{
      margin-bottom: 15px;
    }
    .img-block{
      height: 240px;
      border: 1px solid #E2E2E2;
      position: relative;
      .ext{
        position: absolute;
        left: 7px;
        top: 7px;
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
      .operation-dropdown{
        z-index: 10;
        position: absolute;
        right: 7px;
        top: 7px;
        display: none;
        .dzz-icon{
          font-size: 24px;
          color: #C0C0C0;
          cursor: pointer;
        }
      }

      &:hover .operation-dropdown{
        display: block;
      }
      .el-image{
        height: 200px;
        width: 100%;
        text-align: center;
        /deep/ .el-image__inner{
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      .txt{
          border-top: 1px solid #E2E2E2;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 0 10px;
      }
    }
  }
</style>
