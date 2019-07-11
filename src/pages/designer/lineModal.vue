<style scoped>
.c-form{
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
    <!-- 连线、空白处弹窗 -->
      <Modal
        v-model="changeLineVisible"
        title="属性面板"
        @on-visible-change="change"
        >
				<div class="c-form">
					<Form class="" ref="lineModalForm">
						<FormItem label="流程标识：">
							<Input type="text" clearable/>
						</FormItem>
						<FormItem label="名称：">
							<Input type="text" clearable :maxlength='20'/>
						</FormItem>
						<FormItem label="描述：">
							<Input type="text" clearable :maxlength='20'/>
						</FormItem>
					</Form>
				</div>
      </Modal>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    lineModal: {
      type: Boolean
    }
  },
  data () {
    return {
      lineModalForm:{},
      changeLineVisible:this.lineModal,
    }
  },
  watch: {
    lineModal(val) {
      this.changeLineVisible = val;
    },
  },
  created(){
    
  },
  methods: {
    change(value) {
      if(value == false){
        this.changeLineVisible = false
        this.$emit('changeLineVisible',false)
      }
    }
  }
}
</script>

