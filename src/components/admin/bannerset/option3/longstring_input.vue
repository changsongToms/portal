<template>
  <el-col :span="13" style="padding-right: 0;">
    <div v-if="reference.condition == 'contain'">
      <el-select
        v-model="reference.fvalue"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请添加">
      </el-select>
    </div>
    <div v-else>
      <el-input v-model="reference.fvalue"></el-input>
    </div>
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
