
function htSubProcessXml(cell){
    var id =cell.id;
    var xml = '<subWorkflow id="' + cell.id + '"';

    if(cell.value!=null&&cell.value!=''&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("name")&&$.trim(cell.value.attributes.name.value)!='') {
            var name = $.trim(cell.value.attributes.name.value);
            xml = xml + ' name="'+name+'"';
        }
        if (cell.value.hasAttribute("desc")&&$.trim(cell.value.attributes.desc.value)!='') {
            var desc = $.trim(cell.value.attributes.desc.value);
            xml = xml + ' description="'+desc+'"';
        }
    }
    xml = xml + '>\n';
    //子流程中的信息
    var subcells= cell.children;
    var subcellXml =  generateOSSubcellXml(subcells);



    xml = xml + subcellXml +  '</subWorkflow>\n';
    // xml = xml +   '</subWorkflow>\n';
    return xml;
}
function generateOSSubcellXml(subcells){
    var subxml = '';
    var startXml ='';
    var taskxml = '';
    var endxml = '';
    for(var i=0;i<subcells.length;i++){
        var model = subcells[i];

        var symbol= getCellType(model);
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
            }
        }
    }
    subxml = startXml + taskxml + endxml;
    return subxml;
}