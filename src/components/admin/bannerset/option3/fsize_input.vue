
<template>
  <el-col :span="13" style="padding-right: 0px;">
     <el-input type="number" v-model="reference.fvalue">
       <el-select v-model="reference.ext" slot="append"  placeholder="">
         <el-option label="KB" value="KB"></el-option>
         <el-option label="MB" value="MB"></el-option>
       </el-select>
     </el-input>
  </el-col>
</template>
<script>
	export default {
    props: ['reference'],
		data(){
			return {
			}
		},
		methods: {
		},
	}
</script>
<style lang="less" scoped>
  .el-input {
    /deep/.el-input-group__append{
      width: 30px;
    }
    .el-select{
      width: auto;
    }
  }
</style>
