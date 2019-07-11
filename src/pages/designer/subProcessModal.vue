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
    <!-- 子流程弹窗 -->
      <Modal
        v-model="changeSubVisible"
        title="子流程属性面板"
        @on-visible-change="change"
        >
				<div class="c-form">
					<Form class="startmo" ref="subProcessModalForm">
						<FormItem label="名称：">
							<Input type="text" clearable/>
						</FormItem>
						<FormItem label="描述：">
							<Input type="text" clearable :maxlength='20'/>
						</FormItem>
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
  name: '',
  props:{
    subProcessModal: {
      type: Boolean
    }
  },
  data () {
    return {
      subProcessModalForm:{},
      changeSubVisible:this.subProcessModal,
    }
  },
  watch: {
    subProcessModal(val) {
      this.changeSubVisible = val;
    },
  },
  created(){
    
  },
  methods: {
    change(value) {
      if(value == false){
        this.changeSubVisible = false
        this.$emit('changeSubVisible',false)
      }
    }
  }
}
</script>

