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
    <!-- 并行网关弹窗 -->
    <Modal
      v-model="changeCloseVisible"
      title="并行网关属性面板"
      @on-visible-change="change"
      >
      <div class="c-form">
        <Form class="" ref="closeWayModalForm">
          <FormItem label="名称：">
            <Input type="text" clearable/>
          </FormItem>
          <FormItem label="描述：">
            <Input type="text" clearable :maxlength='20'/>
          </FormItem>
          <FormItem label="节点类型：">
            <RadioGroup>
              <Radio label="start">
                  <span>开始</span>
              </Radio>
              <Radio label="end">
                  <span>结束</span>
              </Radio>
            </RadioGroup>
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
    closeWayModal: {
      type: Boolean
    }
  },
  data () {
    return {
      closeWayModalForm:{},
      changeCloseVisible:this.closeWayModal,
    }
  },
  watch: {
    closeWayModal(val) {
      this.changeCloseVisible = val;
    },
  },
  created(){
    
  },
  methods: {
    change(value) {
      if(value == false){
        this.changeCloseVisible = false
        this.$emit('changeCloseVisible',false)
      }
    }
  }
}
</script>

