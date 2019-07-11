<style>
.ivu-btn-primary{
	background-color: #1E9FFF;
  border-color: #1E9FFF;
}
.ivu-table-cell{
	padding: 0!important;
}
.ivu-table-cell input{
	border: none;
	height: 48px;
}

</style>
<template>
<!-- 处理人信息 -->
	<div class="c-form">
		<Form class="dealPeopleModal" ref="dealModalForm">
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
			<Button type="success" style="margin-bottom:10px;" @click="add">添加</Button>
			<Table border :columns="columns1" :data="data1"  style="margin-bottom:30px;"></Table>
			<FormItem>
				<Button type="primary">保存</Button>
			</FormItem>
		</Form>
		
	</div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
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
