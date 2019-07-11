
function htArrowXml(cell){
    var sourceId = cell.source.id;
    var targetId = '';
    if(cell.target!=undefined){
        targetId = cell.target.id;
    }
    var flowCondition ='';
    var name = cell.id;
    if(cell.value!=null&&cell.value!=''&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("name")&&$.trim(cell.value.attributes.name.value)!='') {
            name = $.trim(cell.value.attributes.name.value);
        }
        if (cell.value.hasAttribute("flowCondition")&&$.trim(cell.value.attributes.flowCondition.value)!='') {
            flowCondition = $.trim(cell.value.attributes.flowCondition.value);
        }
    }
    var xml = '<flow id="' + cell.id + '" name="' + name + '" sourceRef="'
        + sourceId + '" targetRef="' + targetId + '">\n';
    if(flowCondition!=''){
        xml =xml +'<conditionExpression><![CDATA[#{'+flowCondition+'}]]></conditionExpression>\n';
    }
    xml = xml + '</flow>\n';
    return xml;
}
