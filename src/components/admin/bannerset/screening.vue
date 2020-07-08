<template>
  <el-form-item label="筛选项：">
    <template v-for="(parItem,key) in reference">
      <el-row :gutter="20" class="margin-bottom-7" :key="key">
        <el-col :span="6">
          <el-select v-model="parItem.flag" @change="ScreeningItemsChange(key)">
            <el-option
              v-for="subItem in options"
              :label="subItem.labelname"
              :value="subItem.flag"
              v-show="parItem.flag == subItem.flag || !selectIdsArr.includes(subItem.flag)"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button class="operation-del" icon="el-icon-minus" @click="DelScreeningItems(key)"></el-button>
        </el-col>
      </el-row>
    </template>
    <el-button round type="info" size="small" style="width: 150px;" @click="AddScreeningItems">
      <span class="dzz dzz-add"></span>
      添加筛选项
    </el-button>
  </el-form-item>
</template>

<script>
	export default {
    props:['reference','options'],
		data(){
			return {
        selectIdsArr:[]
			}
		},
    created() {
      for(var i in this.reference){
        this.selectIdsArr.push(this.reference[i].flag)
      }
    },
		methods: {
      ScreeningItemsChange(key) {
        this.selectIdsArr[key] = this.reference[key].flag;
      },
      AddScreeningItems() {
        for(const i of this.options){
          if(this.selectIdsArr.indexOf(i.flag) < 0){
            this.reference.push({
              flag: i.flag
            })
            this.selectIdsArr.push(i.flag)
            break;
          }
        }

      },
      DelScreeningItems(key){
        this.reference.splice(key,1)
        this.selectIdsArr.splice(key,1)
      }
		}
	}
</script>
<style type="text/css">
</style>
