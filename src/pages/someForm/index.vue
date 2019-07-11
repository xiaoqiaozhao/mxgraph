<style lang="less" scoped>
  .btns{
    height: 70px;
    width: 96%;
    text-align: center;
    position: fixed;
    border-top: 1px solid #ccc;
    bottom: 0;
    background: #ffffff;
    padding: 20px;
  }
</style>
<template>
    <div >
      <Tabs v-model="pageName" @on-click="tabShow">
        <TabPane label="前端" name="name1">
          <div class="c-form" v-for="(list,index) in form.formList" :key="index">
              <Form :model="list" :ref="'listRef' + index" >
                <FormItem label="应用中文名称：" prop="appName" 
                :rules="[
                {required: true, message: '请输入应用中文名称', trigger: 'blur'},
                {type: 'string',pattern: /^[\u4e00-\u9fa5]{0,}$/,message: '必须输入中文！',trigger: 'blur'}
                ]">
                  <Input v-model="list.appName" clearable placeholder="请输入应用中文名称" :maxlength='20'/>
                </FormItem>
                <FormItem label="应用英文名称：" prop="appAbbreviation" 
                :rules="[
                  {required: true, message: '请输入应用英文名称', trigger: 'blur'},
                  {type: 'string',pattern: /^[A-Za-z]+$/,message: '必须输入英文！',trigger: 'blur'}
                ]">
                  <Input v-model="list.appAbbreviation" clearable placeholder="请输入应用英文名称" :maxlength='20'/>
                </FormItem>
                <FormItem label="模板：" prop="template" :rules="{required: true, message: '请选择模板', trigger: 'change'}">
                  <RadioGroup v-model="list.template">
                    <Radio label="模板1">模板1</Radio>
                    <Radio label="模板2">模板2</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="描述：" prop="description">
                  <Input type="textarea" v-model="list.description" placeholder="请输入工程描述" :maxlength='20'/>
                </FormItem>
                <FormItem v-if="lineShow" style="height:1px;background:#ccc;">
                </FormItem>
              </Form>
          </div>
          <Button style="margin-bottom:100px;" type="success" @click="addMore">添加</Button>
        </TabPane>
        <TabPane label="后端" name="name2">
          <div class="c-form" v-for="(list,index1) in form.formAfter" :key="index1">
            <Form class="base-form" :model="list" :ref="'afterListRef' + index1" :label-width="120"
                  style="width: 600px">
              <FormItem label="应用中文名称：" prop="appName" 
                :rules="[
                {required: true, message: '请输入应用中文名称', trigger: 'blur'},
                {type: 'string',pattern: /^[\u4e00-\u9fa5]{0,}$/,message: '必须输入中文！',trigger: 'blur'}
                ]">
                  <Input v-model="list.appName" clearable placeholder="请输入应用中文名称" :maxlength='20'/>
                </FormItem>
                <FormItem label="应用英文名称：" prop="appAbbreviation" 
                :rules="[
                  {required: true, message: '请输入应用英文名称', trigger: 'blur'},
                  {type: 'string',pattern: /^[A-Za-z]+$/,message: '必须输入英文！',trigger: 'blur'}
                ]">
                  <Input v-model="list.appAbbreviation" clearable placeholder="请输入应用英文名称" :maxlength='20'/>
                </FormItem>
              <FormItem label="Project Metadata：" prop="metadataGroup" 
              :rules="[
                  {required: true, message: '请输入完整Project Metadata', trigger: 'blur'},
                  {type: 'string',pattern: /^[a-z]+$/,message: 'Group必须输入小写英文！',trigger: 'blur'}
                ]">
                Group
                <Input v-model="list.metadataGroup" clearable placeholder="" :maxlength='20' />
                Artifact
                <Input v-model="list.appAbbreviation" clearable placeholder="必须同应用英文名称" :maxlength='20' />
              </FormItem>
              <FormItem label="描述：" prop="description">
                <Input type="textarea" v-model="list.description" placeholder="请输入工程描述" :maxlength='20'/>
              </FormItem>
              <FormItem v-if="afterLineShow" style="height:1px;background:#ccc;">
              </FormItem> 
            </Form>
          </div>
          <Button style="margin-bottom:100px;" type="success" @click="addAfterMore">添加</Button>
        </TabPane>
      </Tabs>
      <div class="btns" >
        <Button type="primary" @click="doSubmit">提交</Button>
        <Button>返回</Button>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    var _self;

    export default {
      components: {
      },
      props: {
       
      },
      data(){
        return {
          lineShow:true,
          pageName:'name1',
          afterLineShow:true,
          labelData:true,
          spinShow: false,
          leaderItems:[],
          form:{
            formList: [{
            }],
            formAfter:[{

            }]
          },
        }
      },
      created() {
      },
      methods: {
        doSubmit(){
          var afterkeys= Object.keys(this.form.formAfter[0])
          var frontkeys= Object.keys(this.form.formList[0])
          
          let newArr = [];
          let _self = this;
          if(this.pageName == "name1" && afterkeys.length == 0 && frontkeys.length !== 0){
            this.form.formAfter = []
            this.form.formList.forEach((item,index) =>{
              checkForm('listRef' + index);
            });
          }else if(this.pageName == "name2" && frontkeys.length == 0 && afterkeys.length !== 0){
            this.form.formList = []
            this.form.formAfter.forEach((item,index) =>{
              checkForm('afterListRef' + index);
            });
          }else{
            this.form.formList.forEach((item,index) =>{
              checkForm('listRef' + index);
            });
            this.form.formAfter.forEach((item,index) =>{
              checkForm('afterListRef' + index);
            });
          }
          /**
           * 根据form表单的ref，动态生成promise，再对其做表单校验，均通过后再处理数据
           */
          function checkForm(arrName){
              var result = new Promise(function(resolve, reject){
                  _self.$refs[arrName][0].validate((valid) =>{
                      if(valid){
                          resolve();
                      }else{
                          reject();
                      }
                  })
              })
              newArr.push(result);
          };

          Promise.all(newArr).then(function() {
            _self.addForm();
          }).catch(function(){
             
          });
        },

        /**
         * 表单校验完成后执行新增代码
         */
        addForm(){
          this.spinShow = !this.spinShow
        },
        /**
         * 添加一个form
         */
        addMore(){
          this.form.formList.push({});
        },
        addAfterMore(){
          this.form.formAfter.push({});
        },
        // 切换tab
        tabShow(name){
          this.pageName = name
        }
      },
    };
</script>


