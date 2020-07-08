<template>
  <el-col :span="13" style="padding-right: 0;">
    <div v-if="reference.condition == 'contain'">
      <el-select
        v-if="reference.options"
        v-model="reference.fvalue"
        multiple>
        <el-option
          v-for="(item,key) in reference.options"
          :key="key"
          :label="item"
          :value="key">
        </el-option>
      </el-select>
      <el-select
        v-else
        v-model="reference.fvalue"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="输入后回车添加">
        <el-option
          v-for="(item,key) in reference.options"
          :key="key"
          :label="item"
          :value="key">
        </el-option>
      </el-select>
    </div>
    <div v-else>
      <el-select v-if="reference.options" v-model="reference.fvalue">
        <el-option
          v-for="(item,key) in reference.options"
          :key="key"
          :label="item"
          :value="key">
        </el-option>
      </el-select>
      <el-input v-else v-model="reference.fvalue"></el-input>
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
