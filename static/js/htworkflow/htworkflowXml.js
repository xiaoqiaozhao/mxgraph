
function generatehtXml(editorUi){
    var xml = getHtworkflowXMLHeader();
    var models = editorUi.editor.graph.model.root.children[0].children;
    var process =  editorUi.editor.graph.model.root.children[0].parent;

    var processId = '';
    var processName = '';
    var description = '';
    if(process.value!=null&&typeof(process.value)=='object'){
        if (process.value.hasAttribute("processId")&&$.trim(process.value.attributes.processId.value)!='') {
            processId = $.trim(process.value.attributes.processId.value);
        }
        if (process.value.hasAttribute("processName")&&$.trim(process.value.attributes.processName.value)!='') {
            processName = $.trim(process.value.attributes.processName.value);
        }
        if (process.value.hasAttribute("desc")&&$.trim(process.value.attributes.desc.value)!='') {
            description = $.trim(process.value.attributes.desc.value);
        }
    }

    xml=xml+'<bpmn>\n<workflow key="'+processId+'" name="'+processName+'" description="'+description+'">\n';

    var startXml ='';
    var taskxml = '';
    var endxml = '';
    //重写
    for(var item in models){
        var model=models[item];
        var symbol= getCellType(model);
        if(model.geometry!=undefined){
            if(model.edge){
                taskxml = taskxml + htArrowXml(model);
            }else{
                if(symbol=='start'){
                    startXml =  htStartEventXml(model);
                }else if(symbol=='end'){
                    endxml = endxml + htEndEventXml(model);
                }else if(symbol=='userTask'){
                    taskxml = taskxml+ htUserTaskXml(model);
                }else if(symbol=='exclusiveGw'||symbol=='parallelGw'){
                    taskxml = taskxml+ htGetwayXml(model,symbol);
                }else if(symbol=='subProcess'){
                    taskxml = taskxml+ htSubProcessXml(model);
                }
            }
        }
    }
    xml=xml+startXml + taskxml+endxml+'</workflow>\n';
    xml=formatXml(xml);

    //mxGraphModel 的加载
    var mxGraphXml =  mxUtils.getPrettyOSXml(editorUi.editor.getGraphXml());
    if(mxGraphXml.startsWith("<mxGraphModel>")){
        mxGraphXml = mxGraphXml.replace("<mxGraphModel>","");
        mxGraphXml = mxGraphXml.replace("</mxGraphModel>","");
    }
    mxGraphXml=$.trim(mxGraphXml);
    if(mxGraphXml.startsWith("<root>")){
        mxGraphXml = mxGraphXml.replace("<root>","<workflowDI>");
        mxGraphXml = mxGraphXml.replace("</root>","</workflowDI>");
    }
    xml = xml+"\n" + mxGraphXml+"\n</bpmn>";
    return xml;

}

function getHtworkflowXMLHeader(){
    var xml='<?xml version="1.0" encoding="UTF-8"?>\n';
    return xml;
}


