<template>
  <el-col :span="13" style="padding-right: 0;">
    <el-select
      v-if="reference.condition == 'contain'"
      v-model="reference.fvalue"
      multiple>
      <el-option :key="item.condition" :label="item.option" :value="item.condition" v-for="item in DataOption"></el-option>
    </el-select>
   <el-select v-else v-model="reference.fvalue">
      <el-option :key="item.condition" :label="item.option" :value="item.condition" v-for="item in DataOption"></el-option>
    </el-select>
  </el-col>
</template>

<script>
	export default {
    props: ['reference'],

		data(){
			return {
        condition:this.reference.condition,
        DataOption:[
          {'option':'★','condition':1},
          {'option':'★★','condition':2},
          {'option':'★★★','condition':3},
          {'option':'★★★★','condition':4},
          {'option':'★★★★★','condition':5}
        ]
			}
		},
		methods: {

		},
	}
</script>
