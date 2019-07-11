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
    <!-- 结束弹窗 -->
      <Modal
        v-model="changeEndVisible"
        title="结束属性面板"
        @on-visible-change="change"
        >
				<div class="c-form">
					<Form class="startmo" ref="endModalForm">
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
    endModal: {
      type: Boolean
    }
  },
  data () {
    return {
      endModalForm:{},
      changeEndVisible:this.endModal,
    }
  },
  watch: {
    endModal(val) {
      this.changeEndVisible = val;
    },
  },
  created(){
    
  },
  methods: {
    change(value) {
      if(value == false){
        this.changeEndVisible = false
        this.$emit('changeEndVisible',false)
      }
    }
  }
}
</script>

