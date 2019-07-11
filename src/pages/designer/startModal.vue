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
    <!-- 开始弹窗 -->
      <Modal
        v-model="changeStartVisible"
        title="开始属性面板"
        @on-visible-change="change"
        >
				<div class="c-form">
					<Form class="startmo" ref="startModalForm">
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
    startModal: {
      type: Boolean
    }
  },
  data () {
    return {
      startModalForm:{},
      changeStartVisible:this.startModal,
    }
  },
  watch: {
    startModal(val) {
      this.changeStartVisible = val;
    },
  },
  created(){
    
  },
  methods: {
    change(value) {
      if(value == false){
        this.changeStartVisible = false
        this.$emit('changeStartVisible',false)
      }
    }
  }
}
</script>

