// var graph =this.graph; dialogTextArea
// 点击画布空白处
var canvasProperties = [
  {name: 'processId', dispName: '流程标识：', type: 'string', defVal:''},
  {name: 'processName', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''}
];
// 开始
var startProperties = [
  {name: 'name', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''},
  {name: 'tasklisteners', dispName: '任务监听器：', type: 'string', defVal:''},
];
// 结束
var endProperties = [
  {name: 'name', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''},
  {name: 'tasklisteners', dispName: '任务监听器：', type: 'string', defVal:''}
];
// 排他网关
var exclusiveGwProperties = [
  {name: 'name', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''}
];
// 并行网关
var parallelGwProperties = [
  {name: 'name', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''},
  {name: 'nodeType', dispName: '节点类型：', type: 'nodeTypeRadio', defVal:''},
];
// User Task
var userTaskProperties = [
  {name: 'name', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''},
  {name: 'assigneecq', dispName: '处理人：', type: 'assigneecq', defVal:''},
  {name: 'candidatescq', dispName: '候选人：', type: 'candidatescq', defVal:''},
  {name: 'assigneecqhidden', dispName: '处理人：', type: 'accOrcanhidden', defVal:''},
  {name: 'candidatescqhidden', dispName: '候选人：', type: 'accOrcanhidden', defVal:''},
  {name: 'tasklisteners', dispName: '任务监听器：', type: 'string', defVal:''},
  {name: 'dueDate', dispName: '截止日期：', type: 'date', defVal: ''},
  {name: 'isAuto', dispName: '是否自动处理：', type: 'bool', defVal: false},
  {name: 'skipExpression', dispName: '跳过表达式：', type: 'string', defVal: ''},
  {name: 'toGlobalExpression', dispName: '全局表达式：', type: 'string', defVal: ''},
  {name: 'type', dispName: '是否全局：', type: 'bool', defVal: false},
  {name: 'preFunctions', dispName: '前置服务：', type: 'funDialog', defVal: ''},
  {name: 'postFunctions', dispName: '后置服务：', type: 'funDialog', defVal: ''},
  {name: 'preMqs', dispName: '前置消息：', type: 'mqDialogList', defVal: ''},
  {name: 'postMqs', dispName: '后置消息：', type: 'mqDialogList', defVal: ''}
];
// sub-Process
var subProcessProperties = [
  {name: 'name', dispName: '名称：', type: 'string', defVal:''},
  {name: 'desc', dispName: '描述：', type: 'string', defVal:''}
];