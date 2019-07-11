<style scoped>
.c-form .ivu-form-item-content .ivu-btn-primary{
	background-color: #1E9FFF;
  border-color: #1E9FFF;
}
</style>
<template>
<!-- 前置消息列表 -->
	<div class="c-form">
		<Form class="candidate" ref="candidateModalForm">
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
				candidateModalForm:{},
				columns1: [
					{
						title: 'ID',
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
						title: '描述',
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
						title: 'tag',
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
					// {
					// 	paramName: '',
					// 	paramDesc: '',
					// 	paramType: '',
					// 	defaultValue: ''
					// },
				]
			}
		},
		methods: {
			// 添加
			add(){
				let obj = {
					paramName: this.data1.length+1,
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
