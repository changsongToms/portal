<template>
  <div>
    <div class="content_left" v-if="ImageData.length">
      <template v-for="item in ImageData">
        <div class="result-block">
            <el-image :src="item.img" fit="contain"></el-image>
            <div class="message">
              <p class="title">
                <span>{{item.name}}</span>
              </p>
              <p class="time">{{item.fdate}}</p>
              <p class="introduce">{{item.content}}</p>
            </div>
        </div>
      </template>
    </div>
    <div v-else style="padding: 30px;margin-top: 20px;margin-bottom: 20px;padding-left: 130px;background: #F8F8F8;height: 150px;margin-left: 25px;margin-right: 25px;text-align: center;line-height: 150px;">暂无数据</div>
  </div>
</template>

<script>
	export default {
    props: {
      ImageData: Array,
    },
		data(){
			return {
			}
		},
		methods: {
		},
	}
</script>
<style  lang="less" scoped>
  .content_left{
    width: 540px;
    padding-left: 25px;
    .result-block{
      width: 540px;
      margin-bottom: 30px;
      font-size: 13px;
      overflow: hidden;
      position: relative;
      .el-image{
        width: 121px;
        float: left;
        height: 107px;
      }
      .message{
        float: left;
        width: 397px;
        position: absolute;
        left: 138px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        overflow: hidden;
        transform: translateY(-50%);
        p{
          margin: 0;
          font-size: 13px;
          line-height: 1.54;
          &.title{
            color: #2619AF;
            font-size: 18px;
            .red{
              color: #E66F82;
            }
          }
          &.introduce{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
</style>
