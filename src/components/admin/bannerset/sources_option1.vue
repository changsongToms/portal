<template>
  <div class="item-val">
      <el-row :gutter="20" class="margin-bottom-7">
        <el-col :span="7">
          <el-select v-model="reference.flag" @change="SelectChange">
            <el-option
            v-for="val in option"
            :label="val.labelname"
            :value="val.flag"></el-option>
          </el-select>
        </el-col>
        <component :is="reference.filedtype" :fid="fid" :reference="reference"></component>
        <el-col :span="3">
          <el-button v-if="this.olength > 1" class="operation-del" icon="el-icon-minus" @click="OperationOption('del')"></el-button>
          <el-button v-else class="operation-del" icon="el-icon-minus" disabled></el-button>
          <el-button class="operation-del" icon="el-icon-plus" style="margin-right: 0;" @click="OperationOption('add')"></el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
	export default {
    props: ['reference','option','fid','rkey','fkey','olength'],
    created() {
    },
		data(){
			return {
			}
		},
		methods: {
      SelectChange(){
        var flag = this.reference.flag
        this.reference.extra = this.option[flag].extra
        if(this.reference.filedtype != this.option[flag].filedtype){
          this.reference.condition = ''
        }
        this.reference.filedtype = this.option[flag].filedtype
        this.reference.fvalue = ''
        this.reference.options = this.option[flag].options
        this.reference.ext = ''
        this.reference.ruleid = ''
        this.OperationOption('change')
      },
      OperationOption(type){
        var str = {
          id:this.reference.ruleid,
          key:this.rkey,
          fkey:this.fkey,
          type:type
        }
        this.$emit('deloption',str);
      }
		},
    components:{
      'string': () => import('@/components/admin/bannerset/option2/string.vue'),
      'longstring': () => import('@/components/admin/bannerset/option2/longstring.vue'),
      'tag': () => import('@/components/admin/bannerset/option2/tag.vue'),
      'color': () => import('@/components/admin/bannerset/option2/color.vue'),
      'date': () => import('@/components/admin/bannerset/option2/date.vue'),
      'int': () => import('@/components/admin/bannerset/option2/int.vue'),
      'float': () => import('@/components/admin/bannerset/option2/float.vue'),
      'grade': () => import('@/components/admin/bannerset/option2/grade.vue'),
      'bool': () => import('@/components/admin/bannerset/option2/bool.vue'),
      'user': () => import('@/components/admin/bannerset/option2/user.vue')
    }
	}
</script>
<style type="text/css">
</style>
