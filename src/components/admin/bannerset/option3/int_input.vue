<template>
  <el-col :span="13" style="padding-right: 0;">
    <el-input type="number" v-model="reference.fvalue"></el-input>
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
