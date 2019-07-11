
function htGetwayXml(cell,symbol){
    var name = cell.id;
    if(cell.value!=null&&cell.value!=''&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("name")) {
            name = $.trim(cell.value.attributes.name.value);
        }
    }


    var tag = '';
    if(symbol=='exclusiveGw'){
        tag = 'exclusiveGateway';
    }else if(symbol=='parallelGw'){
        tag = 'parallelGateway';
    }
    var xml  = '<'+tag+' id="' + cell.id + '" name="' + name +  '"';
    if(symbol=='parallelGw'){
        if (cell.value.hasAttribute("nodeType")&&$.trim(cell.value.attributes.nodeType.value)!='') {
            xml = xml+' nodeType="'+$.trim(cell.value.attributes.nodeType.value)+'"';
        }
    }
    xml = xml+'></'+tag+'>\n';
    return xml;
}
