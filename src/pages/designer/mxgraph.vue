<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c-form{
  height: 350px;
	overflow-y: scroll;
	padding: 32px 40px 40px 0;
}
.c-form .ivu-form-item-label {
  width: 80px;
}
.c-form .ivu-form-item-content .ivu-btn-primary{
	background-color: #1E9FFF;
  border-color: #1E9FFF;
}
</style>
<template>
	<div>
		<!-- 连线、空白处 -->
		<LineModal :lineModal="lineModal" v-on:changeLineVisible="lineChange($event)"></LineModal>
		<!-- 开始/排他网关 -->
		<StartModal :startModal="startModal" v-on:changeStartVisible="startChange($event)"></StartModal>
		<!-- 结束弹窗 -->
		<EndModal :endModal="endModal" v-on:changeEndVisible="endChange($event)"></EndModal>
		<!-- sub-process子流程弹窗 -->
		<SubProcessModal :subProcessModal="subProcessModal" v-on:changeSubVisible="subChange($event)"></SubProcessModal>
		<!-- 排他网关弹窗 -->
		<OpenWayModal :openWayModal="openWayModal" v-on:changeOpenVisible="openChange($event)"></OpenWayModal>
		<!-- 并行网关弹窗 -->
		<CloseWayModal :closeWayModal="closeWayModal" v-on:changeCloseVisible="closeChange($event)"></CloseWayModal>	
		<!-- 任务处理 -->
		<Modal
        v-model="maskModal"
        title="任务属性面板"
        >
			<div class="c-form">
				<Form class="" ref="maskModalForm">
					<FormItem label="名称：">
						<Input type="text" clearable/>
					</FormItem>
					<FormItem label="描述：">
						<Input type="text" clearable :maxlength='20'/>
					</FormItem>
					<FormItem label="处理人：">
						<Input type="text" style="width:80%;" clearable :maxlength='20'/>
						<Button type="primary" @click="dealPeopleFun">配置</Button>
					</FormItem>
					<FormItem label="候选人：">
						<Input type="text" style="width:80%;" clearable :maxlength='20'/>
						<Button type="primary" @click="candidateFun">配置</Button>
					</FormItem>
					<FormItem label="截止日期：">
						<Input type="text" clearable :maxlength='20'/>
					</FormItem>
					<FormItem label="是否自动处理：">
						<Input type="text" clearable :maxlength='20'/>
					</FormItem>
					<FormItem label="全局表达式：">
						<Input type="text" clearable :maxlength='20'/>
					</FormItem>
					<FormItem label="是否全局：">
						<Input type="text" clearable :maxlength='20'/>
					</FormItem>
					<FormItem label="前置服务：">
						<Button type="primary" @click="frontFun">配置</Button>
					</FormItem>
					<FormItem label="后置服务：">
						<Button type="primary">配置</Button>
					</FormItem>
					<FormItem label="前置消息：">
						<Button type="primary" @click="frontMesFun">配置</Button>
					</FormItem>
					<FormItem label="后置消息：">
						<Button type="primary">配置</Button>
					</FormItem>
					<FormItem label="自定义属性：">
						<Button type="primary">配置</Button>
					</FormItem>
					<FormItem>
						<Button type="primary">保存</Button>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<!-- 处理人信息 -->
		<Modal 
			v-model="dealPeopleModal"
			title="处理人信息"
			>
      <DealPeopleModal></DealPeopleModal>
    </Modal>
		<!-- 候选人信息 -->
		<Modal 
			v-model="candidateModal"
			title="候选人信息"
			>
      <CandidateModal></CandidateModal>
    </Modal>
		<!-- 前置服务 -->
		<Modal 
			v-model="frontServiceModal"
			title="前置服务信息列表"
			>
      <FrontServiceModal :frontServiceModal="frontServiceModal" v-on:changeFrontVisible="frontChange($event)"></FrontServiceModal>
    </Modal>
		<!-- 前置消息 -->
		<Modal 
			v-model="frontMesModal"
			title="前置消息列表"
			>
      <FrontMesModal :frontMesModal="frontMesModal" v-on:changeFrontMesVisible="frontMesChange($event)"></FrontMesModal>
    </Modal>
		
	</div>
</template>


<script>
import LineModal from './lineModal'
import StartModal from './startModal'
import EndModal from './endModal'
import SubProcessModal from './subProcessModal'
import OpenWayModal from './openWayModal'
import CloseWayModal from './closeWayModal'

import DealPeopleModal from './dealPeopleModal'
import CandidateModal from './candidateModal'
import FrontServiceModal from './frontServiceModal'
import FrontMesModal from './frontMesModal'


export default {
	components: {
		LineModal,
		StartModal,
		EndModal,
		SubProcessModal,
		OpenWayModal,
		CloseWayModal,

		DealPeopleModal,
		CandidateModal,
		FrontServiceModal,
		FrontMesModal
	},
	data () {
		return{
			lineModal:false,//连线弹窗
			startModal: false,//开始弹窗
			endModal: false,//结束弹窗
			subProcessModal: false,//子流程弹窗
			openWayModal:false,//排他网关弹窗
			closeWayModal:false,//并行网关弹窗
			maskModal:false,//任务弹窗

			dealPeopleModal:false,//处理人信息弹窗
			candidateModal:false,//候选人信息弹窗
			frontServiceModal:false,//前置服务弹窗
			frontMesModal:false,//前置消息弹窗
		}
	},
  created(){
	},
  mounted () {
		var editorUiInit = EditorUi.prototype.init;
		// vue实例
		window.$vm = this
		EditorUi.prototype.init = function()
			{
				editorUiInit.apply(this, arguments);
				this.actions.get('export').setEnabled(false);
				var graph = this.editor.graph;

				// 保存、查看流程定义按钮
				var propDiv1 = document.createElement('div');
				var btnSave = mxUtils.button("保存", mxUtils.bind(this, function(evt)
				{
					
				}));
				propDiv1.className += 'propDiv1';
				btnSave.setAttribute('title',  '保存');
				btnSave.className += 'btnSave';
				propDiv1.appendChild(btnSave);

				var btnLook = mxUtils.button("查看流程定义", mxUtils.bind(this, function(evt)
				{
						// flowXmlDetailDialog(htworkflowXmlDialog(ui));
				}));
				btnLook.setAttribute('title',  '查看流程定义');
				btnLook.className += 'btnLook';
				propDiv1.appendChild(btnLook);
				document.body.appendChild(propDiv1);
				
				graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt) {
					var cell = graph.getSelectionCell() || graph.getModel().getRoot();
					var style =cell.style;
					if(cell.edge){   //连接线
						window.$vm.lineModal = true
						window.$vm.startModal = false  
						window.$vm.endModal = false
						window.$vm.openWayModal = false
						window.$vm.subProcessModal = false
						window.$vm.closeWay = false  
						window.$vm.maskModal = false
					}
					if(style !== undefined && style !== ""){
						//开始
						if(style == "shape=mytriangle;whiteSpace=wrap;html=1;rounded=1;fillColor=rgb(220,240,255);strokeColor=rgb(42,161,252);verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;symbol=general;"){
							window.$vm.startModal = true  
							window.$vm.lineModal = false
							window.$vm.endModal = false
							window.$vm.subProcessModal = false
							window.$vm.openWayModal = false
							window.$vm.closeWayModal = false  
							window.$vm.maskModal = false
						}else if(style == "shape=image;image=static/js/plugins/mxgraph/jscolor/end.png"){
							// 结束
							window.$vm.endModal = true 
							window.$vm.lineModal = false
							window.$vm.startModal = false
							window.$vm.subProcessModal = false
							window.$vm.openWayModal = false
							window.$vm.closeWayModal = false  
							window.$vm.maskModal = false  
						}else if(style == "shape=mxgraph.bpmn.shape;html=1;rounded=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;background=gateway;outlineConnect=0;fillColor=rgb(220,240,255);strokeColor=rgb(42,161,252);outline=none;symbol=exclusiveGw;"){
							// 排他网关
							window.$vm.openWayModal = true
							window.$vm.lineModal = false
							window.$vm.startModal = false
							window.$vm.endModal = false
							window.$vm.subProcessModal = false 
							window.$vm.closeWayModal = false  
							window.$vm.maskModal = false 
						}else if(style == "shape=mxgraph.bpmn.shape;html=1;rounded=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;background=gateway;outlineConnect=0;fillColor=rgb(220,240,255);strokeColor=rgb(42,161,252);outline=none;symbol=parallelGw;"){
							// 并行网关
							window.$vm.closeWayModal = true 
							window.$vm.lineModal = false
							window.$vm.startModal = false  
							window.$vm.endModal = false
							window.$vm.subProcessModal = false 
							window.$vm.openWayModal = false
							window.$vm.maskModal = false  
						}else if(style == "html=1;whiteSpace=wrap;rounded=1;fillColor=rgb(220,240,255);strokeColor=rgb(42,161,252);fontColor=rgb(42,161,252);"){
							// 用户任务
							window.$vm.maskModal = true  
							window.$vm.lineModal = false
							window.$vm.startModal = false 
							window.$vm.openWayModal = false
							window.$vm.closeWayModal = false  
						}else if(style == "swimlane;strokeColor=rgb(42,161,252);fontColor=rgb(42,161,252);"){
							// 子流程
							window.$vm.subProcessModal = true 
							window.$vm.lineModal = false
							window.$vm.startModal = false
							window.$vm.endModal = false
							window.$vm.openWayModal = false
							window.$vm.closeWayModal = false  
							window.$vm.maskModal = false 
						}else{
							
						}
					}
				}); 
				if (!Editor.useLocalStorage)
				{
					mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req)
					{
						var enabled = req.getStatus() != 404;
						this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
						this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
						this.actions.get('save').setEnabled(enabled);
						this.actions.get('saveAs').setEnabled(enabled);
						this.actions.get('export').setEnabled(enabled);
					}));
				}
			};

			mxResources.loadDefaultBundle = false;
			var bundle = mxResources.getDefaultBundle('../../static/js/plugins/mxgraph/'+RESOURCE_BASE, mxLanguage) ||
				mxResources.getSpecialBundle('../../static/js/plugins/mxgraph/'+RESOURCE_BASE, mxLanguage);
			mxUtils.getAll([bundle, '../../static/js/plugins/mxgraph/'+STYLE_PATH + '/default.xml'], function(xhr)
			{
				mxResources.parse(xhr[0].getText());
				var themes = new Object();
				themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement(); 
				// Main
				new EditorUi(new Editor(urlParams['chrome'] == '0', themes));
			}, function()
			{
				document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
			});
	},
	methods: {
		// 开始子组件传值给父组件
		startChange(val){
			this.startModal=val;
		},
		// 结束子组件传值给父组件
		endChange(val){
			this.endModal=val;
		},
		// 子流程子组件传值给父组件
		subChange(val){
			this.subProcessModal=val;
		},
		// 排他网关子组件传值给父组件
		openChange(val){
			this.openWayModal=val;
		},
		// 并行网关子组件传值给父组件
		closeChange(val){
			this.closeWayModal=val;
		},
		// 连线子组件传值给父组件
		lineChange(val){
			this.lineModal=val;
		},
		// 任务子组件传值给父组件
		maskChange(val){
			this.maskModal=val;
		},
		
		// 处理人信息
		dealPeopleFun(){
			this.dealPeopleModal = true
		},
		// 候选人信息
		candidateFun(){
			this.candidateModal = true
		},
		// 前置服务
		frontFun(){
			this.frontServiceModal = true
		},
		// 并行网关子组件传值给父组件
		frontChange(val){
			this.frontServiceModal=val;
		},
		// 前置消息弹窗
		frontMesFun(){
			this.frontMesModal = true
		},
		// 前置消息
		frontMesChange(val){
			this.frontMesModal=val;
		},

	
	},
}
</script>



