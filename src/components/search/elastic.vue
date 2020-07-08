<template>
  <div class="rowGrids">
<!--    <div class="row-block" v-for="(item, key) in ImageData">
      <el-image :src="'http://127.0.0.3/'+item.img" fit="contain">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <span class="ext">{{item.ext}}</span>
      <el-dropdown trigger="click" class="operation-dropdown">
        <div class="dzz dzz-more dzz-icon"></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="dzz dzz-download">下载</el-dropdown-item>
          <el-dropdown-item icon="dzz dzz-share">分享</el-dropdown-item>
          <el-dropdown-item icon="dzz dzz-photo">加入相册</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
    <div class="row-block" v-for="(item, key) in ImageData">
      <img class="imgs" width="473" height="710" :src="'http://127.0.0.3/'+item.img" alt="">
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import rowgrid from 'rowgrid.js'
  export default {
    props: ['ImageData'],

    data() {
      return {

      }
    },

    created() {
     rowGrid_plug()
    },
    methods: {
      // rowGrid_plug(){
        // console.log($('img'))
        // var options = {minMargin: 10, maxMargin: 35, itemSelector: ".row-block"};
        // $(".rowGrids").rowGrid(options);
      // }
    },
    // beforeUpdate: function () {
    //   // this.rowGrid_plug()
    // },
  }
  function rowGrid_plug(){
    $(document).ready(function(){
      // setTimeout(function(){
        var options = {itemSelector: ".row-block", lastRowClass: "last-row",firstItemClass: "first-item"};
        // var options = {minMargin: 10, maxMargin: 35, itemSelector: ".row-block"};
        $(".rowGrids").rowGrid(options);
      // },5000)
    })
  }

</script>
<style  lang="less" scoped>
  .imgs-layout{
    .rowGrids{
       margin-bottom: 5px;
       overflow: hidden;
     }
     .row-block{
       width: 100px;
       position: relative;
       float: left;
       height: 360px;
       background: #e6e8eb;
       margin: 0;
       margin-top: 5px;
       border: 1px solid #e6e8eb;
       border-radius: 5px;
       overflow: hidden;
       // .el-image{
          img{
            max-height: 100%;
            max-width: 100%;
          }

       // }
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
     }

  }
</style>
