<template>
	<div class="screening-content">
		<el-row :gutter="10" class="screening-blck">
			<el-col :span="3" class="class-title">分类</el-col>
			<el-col :span="21">
				<ul class="screening-label">
					<li v-for="val in DataBanners" :class="val.id == $route.query.bids ? 'active':''" @click="HandleColumns(val.id)">{{val.bannername}}</li>
				</ul>
			</el-col>
		</el-row>
		<template v-for="item in DataFilterdata">
			<el-row :gutter="10" class="screening-blck">
				<el-col :span="3" class="class-title">{{item.labelname}}：</el-col>
				<el-col :span="21">
					<ul class="screening-label" v-if="item.filedtype == 'tag'">
						<li :class="{'active':!ppath[item.flag]}" @click="handeltype(item.flag,0)">不限</li>
						<li v-for="val in item.val" :class="{'active':ppath[item.flag] == val.tagname}" @click="handeltype(item.flag,val.tagname)">{{val.tagname}}</li>
            <li v-show="pagemore[item.flag]" class="list-more" @click="GetListMore(item.flag,item.filedtype)">更多<i class="el-icon-arrow-down"></i></li>
					</ul>
					<ul class="screening-color" v-else-if="item.filedtype == 'color'">
						<li :class="['line',{'active':!ppath[item.flag]}]" @click="handeltype(item.flag,0)">
							<div></div>
							<span class="dzz dzz-done slash-done"></span>
						</li>
						<li v-for="val in item.val" :style="{background: val}" @click="handeltype(item.flag,val)" :class="{'active':ppath[item.flag] == val}">
							<span v-if="val == '#ffffff'" class="dzz dzz-done slash-done" style="color: #000000;"></span>
							<span v-else class="dzz dzz-done slash-done"></span>
						</li>
					</ul>
					<ul class="screening-label" v-else-if="item.filedtype == 'user'">
						<li :class="{'active':!ppath[item.flag]}" @click="handeltype(item.flag,0)">不限</li>
						<li v-for="val in item.val" :class="{'active':ppath[item.flag] == val.text}" @click="handeltype(item.flag,val.text)">{{val.text}}</li>
            <li v-show="pagemore[item.flag]" class="list-more" @click="GetListMore(item.flag,item.filedtype)">更多<i class="el-icon-arrow-down"></i></li>
					</ul>
					<template v-else-if="item.filedtype == 'string'">
					 <ul class="screening-label" v-if="item.flag == 'ftype'">
					  	<li :class="{'active':!ppath[item.flag]}" @click="handeltype(item.flag,0)">不限</li>
					  	<li v-for="(val,key) in item.val" v-bind:class="{'active':ppath[item.flag] == key}" @click="handeltype(item.flag,key)">{{key}}</li>
					  </ul>
					  <ul class="screening-label" v-else-if="item.flag == 'shape'">
					  	<li :class="{'active':!ppath[item.flag]}" @click="handeltype(item.flag,0)">不限</li>
					  	<li v-for="(val,key) in item.val" v-bind:class="{'active':ppath[item.flag] == val}" @click="handeltype(item.flag,val)">{{val}}</li>
					  </ul>
					</template>
					<ul class="screening-label" v-else-if="item.filedtype == 'grade'">
						<li :class="{'active':!ppath[item.flag]}" @click="handeltype(item.flag,0)">不限</li>
						<li v-for="(val) in item.val" @click="handeltype(item.flag,val)" :class="{'active':ppath[item.flag] == val}">{{val}}星</li>
					</ul>
				</el-col>
			</el-row>

		</template>
	</div>
</template>

<script>
	export default {
		props: ['DataBanners', 'DataFilterdata', 'pathchange','pagemore'],
		data() {
			return {
				ActiveTypeList: [],
				ppath: {},
				IfLoadType:true//是否加载文件类型
			}
		},
		created() {
			if (this.$route.query.ppath && this.$route.query.ppath != '') {
			  const ppath = JSON.parse(this.$route.query.ppath);
			  this.ppath = ppath
			  if(ppath.ftype){
			  	this.IfLoadType = false;
			  }
			}
		},
		methods: {
      async GetListMore(flag,filedtype){
        var data = [];
        if(filedtype == 'tag'){
          const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=gettag", {
            page: this.pagemore[flag]
          });
          data = res.items
        }else if(filedtype == 'user'){
          const { data: res } = await this.axios.post(this.AxiosApi + "index.php?mod=portal&op=ajax&operation=getuser", {
            page: this.pagemore[flag]
          });
          data = res.items
        }
        for(const i of this.DataFilterdata){
          if(i.flag == flag){
            i.val = i.val.concat(data);
            if(i.val.length < i.valcount){
              this.pagemore[flag] = this.pagemore[flag]+1
            }else{
              delete this.pagemore[flag]
            }
          }
        }

      },
			HandleColumns(id) {
				const oldbid = this.$route.query.bids
				if (oldbid != id) {
					this.$router.push({
						query: {
							bids: id
						}
					});
					this.ppath = {}
					this.$emit('EmptyKeyWord')
				}

			},
			handeltype(type, val) {
				if (!this.pathchange) {
					return false;
				}
				if (val == 0) {
					this.IfLoadType = true;
					this.$delete(this.ppath, type)
				} else {
					if(type == 'ftype'){
						this.IfLoadType = false;
					}
					this.$set(this.ppath, type, val)
				}
				var fval = JSON.stringify(this.ppath);
				this.$router.push({
					query: {
						bids: this.$route.query.bids,
						keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
						ppath: fval
					}
				});
				this.handleftype()
			},
			handleftype(){
				if(this.IfLoadType){
					this.$emit('handleftype')
				}
			}
		},
	}
</script>
<style lang="less" scoped>
	.screening-content {
		overflow: hidden;
		padding: 30px;
		margin-top: 20px;
		margin-bottom: 20px;
		background: #F8F8F8;
		margin-left: 25px;
		margin-right: 25px;

		.screening-blck {
			margin-top: 10px;

			&:first-child {
				margin-top: 0;
			}

			.class-title {
				padding: 7px 5px;
				text-align: left;
				width: 100px;
				font-size: 15px;
				color: #353535;
			}

			.screening-label {
				margin: 0;
				padding: 0;
        position: relative;
				li {
					display: inline-block;
					padding: 7px 10px;
					border-radius: 32px;
					margin-right: 5px;
					margin-bottom: 5px;
					cursor: pointer;
					color: #9C9C9C;
					font-size: 15px;
          color: #353535;
          &.list-more{
            margin-top: auto;
            margin-bottom: auto;
            position: absolute;
            right: -95px;
            top: 0;
            bottom: 0;
            height: 18px;
            i{
              margin-left: 5px;
            }
            &:hover{
              color: #FE0000;
            }
          }
					&.active {
						background: #F8EAE9;
						color: #FE0000;
					}
				}
			}

			.screening-color {
				margin: 0;
				padding: 0;
				overflow: hidden;

				li {
					width: 90px;
					height: 15px;
					margin-bottom: 5px;
					cursor: pointer;
					position: relative;
					text-align: center;
					float: left;

					&.line {
						background: #F0F0F0;
						border: 1px solid #CECECE;
						height: 13px;

						div {
							position: absolute;
							margin-top: auto;
							margin-bottom: auto;
							top: 0;
							bottom: 0;
							left: 0;
							width: 100%;
							height: 1px;
							background: #CECECE;
							transform: rotate(8deg);
							-o-transform: rotate(8deg);
							-moz-transform: rotate(8deg);
							-webkit-transform: rotate(8deg);
						}
					}

					.slash-done {
						position: absolute;
						margin: auto;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						font-size: 14px;
						z-index: 5;
						color: #FFFFFF;
						font-weight: 700;
						display: none;
					}

					&.active .slash-done {
						display: inline-block;
					}
				}
			}
		}
	}
</style>
