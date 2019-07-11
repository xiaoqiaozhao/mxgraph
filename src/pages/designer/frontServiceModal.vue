<style scoped>
.c-form{
  height: 350px;
	overflow-y: scroll;
	padding: 32px 40px 40px 0;
}
.c-form .ivu-form-item-content .ivu-btn-primary{
	background-color: #1E9FFF;
  border-color: #1E9FFF;
}

</style>
<template>
<!-- 前置服务 -->
	<div class="c-form">
		<Form class="frontService" ref="frontServiceModalForm">
			<Button type="success" style="margin-bottom:10px;" @click="add">添加</Button>
			<Table border :columns="columnsList" :data="dataList"  style="margin-bottom:30px;"></Table>
			
			<FormItem>
				<Button type="primary">保存</Button>
			</FormItem>
		</Form>
		<Modal 
				v-model="frontAddModal"
				title="前置服务信息添加"
				class="frontAdd"
				@on-ok="ok"
        @on-cancel="cancel"
				>
				<div class="c-form">
					<Form class="candidate" ref="">
						<FormItem label="服务描述：">
							<Input type="text" clearable/>
						</FormItem>
						<FormItem label="服务类型：">
							<Select style="width:200px">
								<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</FormItem>
						<FormItem label="是否允许异常：">
							<Select style="width:200px">
								<Option value="1">是</Option>
								<Option value="0">否</Option>
							</Select>
						</FormItem>
						<FormItem label="方法名：">
							<Input type="text" clearable :maxlength='20'/>
						</FormItem>
						<FormItem label="接口：">
							<Input type="text" clearable :maxlength='20'/>
						</FormItem>
						<Button type="success" style="margin-bottom:10px;" @click="addList">添加</Button>
						<Table border :columns="columns1" :data="data1"  style="margin-bottom:30px;"></Table>
						<FormItem>
							<Button type="primary">保存</Button>
						</FormItem>
					</Form>
				</div>
			</Modal>
	</div>
</template>
<script>
  export default {
		name: "",
		props:{
			frontServiceModal: {
				type: Boolean
			}
		},
		components: {
		},
    data() {
      return {
				frontServiceModalForm:{},
				frontAddModal:false,
				columnsList: [
					{
						title: 'ID',
						key: 'paramName',
						align: 'center',
					},
					{
						title: '服务描述',
						key: 'paramName',
						align: 'center',
					},
					{
						title: '服务类型',
						key: 'paramName',
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('span', {
									style: {
										cursor: "pointer"
									},
									on: {
										click: () => {
											this.del(params.index)
										}
									}
								}, '编辑'),
								h('span', {
									style: {
										color: "red",
										cursor: "pointer"
									},
									on: {
										click: () => {
											this.del(params.index)
										}
									}
								}, '删除'),
							]);
						}
					}
				],
				dataList:[
					{
						
					}
				],
				// 服务类型
				cityList: [
					{
						value: 'rpc',
						label: 'rpc'
					},
					{
						value: 'http',
						label: 'http'
					},
					{
						value: 'class',
						label: 'class'
					},
				],
				columns1: [
					{
						title: '参数名',
						key: 'paramName',
						align: 'center',
						render: (h, params) => { 
							return h('Input', {
								props: {
									type: "text",
									value: params.row.paramName
								},
								on: {
									"on-blur": event => {
										this.data1[params.index].paramName = event.target.value;
									},
								}
							});
						}
					},
					{
						title: '参数描述',
						key: 'paramDesc',
						align: 'center',
						render: (h, params) => { 
							return h('Input', {
								props: {
									type: "text",
									value: params.row.paramDesc
								},
								on: {
									"on-blur": event => {
										this.data1[params.index].paramDesc = event.target.value;
									},
								}
							});
						}
					},
					{
						title: '类型',
						key: 'paramType',
						align: 'center',
						render: (h, params) => { 
							return h('Input', {
								props: {
									type: "text",
									value: params.row.paramType
								},
								on: {
									"on-blur": event => {
										this.data1[params.index].paramType = event.target.value;
									},
								}
							});
						}
					},
					{
						title: '值',
						key: 'defaultValue',
						align: 'center',
						render: (h, params) => { 
							return h('Input', {
								props: {
									type: "text",
									value: params.row.defaultValue
								},
								on: {
									"on-blur": event => {
										this.data1[params.index].defaultValue = event.target.value;
									},
								}
							});
						}
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('span', {
									style: {
										color: "red",
										cursor: "pointer"
									},
									on: {
										click: () => {
											this.del(params.index)
										}
									}
								}, '删除'),
							]);
						}
					}
				],
				data1: [
					{
						paramName: '',
						paramDesc: '',
						paramType: '',
						defaultValue: ''
					},
				]
			}
		},
		methods: {
			// 添加
			add(){
				this.$emit('changeFrontVisible',false)
				this.frontAddModal = true
			},
			ok(){
				this.$emit('changeFrontVisible',true)
			},
			cancel(){
				this.$emit('changeFrontVisible',true)
			},
			// 添加
			addList(){
				let obj = {
					paramName: '',
					paramDesc: '',
					paramType: '',
					defaultValue: ''
				}
				this.data1.push(obj)
			},
			// 删除
			del(data){
				this.data1.splice(data,1)
			}
    }
  }
</script>
