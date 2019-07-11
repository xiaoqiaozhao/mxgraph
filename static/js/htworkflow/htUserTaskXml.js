
function htUserTaskXml(cell){
    var xml = getHtStartElementXML(cell);
    xml = xml + getHtAssigneeElementXML(cell);
    xml = xml + getHtCandidatesElementXML(cell);
    xml = xml + getHtFunctionsElementXML(cell);
    // xml = xml + getHtPreFunctionsElementXML(cell);
    // xml = xml + getHtPostFunctionsElementXML(cell);
    xml = xml + getHtMqElementXML(cell);
    xml = xml + getHtEndElementXML();
    return xml;
}

function getHtStartElementXML(cell) {
    var xml = '<step';
    xml = xml +getHtPropXML(cell)+ '>\n';
    // xml = xml + getOSActionXML(cell);
    return xml;
}
function getHtEndElementXML() {
    var xml = '</step>\n';
    return xml;
}


function getHtPropXML(cell) {
    var name = cell.id;
    var taskName = $.trim(cell.name);
    var desc = $.trim(cell.desc);
    var assignee = '';
    var dueDate = '';
    if (taskName != null && taskName != "")
        name = taskName;
    var xml = ' id="'+cell.id+'"';
    if(cell.value!=null&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("name")&&$.trim(cell.value.attributes.name.value)!='') {
           var name = $.trim(cell.value.attributes.name.value);
            xml = xml + ' name="'+name+'"';
        }
        if (cell.value.hasAttribute("dueDate")&&$.trim(cell.value.attributes.dueDate.value)!='') {
            var dueDate = $.trim(cell.value.attributes.dueDate.value);
            xml = xml + ' dueDate="'+dueDate+'"';
        }
        if (cell.value.hasAttribute("desc")&&$.trim(cell.value.attributes.desc.value)!='') {
            var desc = $.trim(cell.value.attributes.desc.value);
            xml = xml + ' description="' + desc + '"';
        }
        if (cell.value.hasAttribute("skipExpression")&&$.trim(cell.value.attributes.skipExpression.value)!='') {
            var skipExpression = $.trim(cell.value.attributes.skipExpression.value);
            xml = xml + ' skipExpression="'+skipExpression+'"';
        }
        if (cell.value.hasAttribute("toGlobalExpression")&&$.trim(cell.value.attributes.toGlobalExpression.value)!='') {
            var toGlobalExpression = $.trim(cell.value.attributes.toGlobalExpression.value);
            xml = xml + ' toGlobalExpression="'+toGlobalExpression+'"';
        }
        if (cell.value.hasAttribute("isAuto")&&$.trim(cell.value.attributes.isAuto.value)!='') {
            var isAuto = $.trim(cell.value.attributes.isAuto.value);
            xml = xml + ' isAuto="'+isAuto+'"';
        }
        if (cell.value.hasAttribute("type")&&$.trim(cell.value.attributes.type.value)!='') {
            var type = $.trim(cell.value.attributes.type.value);
            if(type=="true"){
                xml = xml + ' type="global"';
            }
        }
    }
    //判断是否分配用户
    // xml = xml + 'assignee="'+assignee+'"';
    return xml;
}

function getHtAssigneeElementXML(cell) {
    var assxml = '';
    if(cell.value!=null&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("assignee")&&$.trim(cell.value.attributes.assignee.value)!='') {
           var assignee = $.trim(cell.value.attributes.assignee.value);
            // assxml = '<assignee id="assignee' + cell.id+'" value="'+ assignee+'"></assignee> ';
            var obj = JSON.parse(assignee);
            if(obj.userType=='assignee'){
                assxml = '<assignee id="assignee' + cell.id+'" value="'+ obj.data.id+'"></assignee> ';
            }else if(obj.userType=='orgUser'){
                assxml = '<assignee id="assignee' + cell.id+'">';
                assxml+= getOrgUserXml(obj,"获取处理人");
                assxml+='</assignee>';
            }
        }
        //重庆用,修改请谨慎
        if (cell.value.hasAttribute("assigneecq")&&$.trim(cell.value.attributes.assigneecq.value)!='') {
            var assigneecq = $.trim(cell.value.attributes.assigneecq.value);
            assxml = '<assignee id="assignee' + cell.id+'" value="'+ assigneecq+'"></assignee> ';

        }else if(cell.value.hasAttribute("assigneecqhidden")&&$.trim(cell.value.attributes.assigneecqhidden.value)!='') {
            var assigneecq = $.trim(cell.value.attributes.assigneecqhidden.value);
            if(assigneecq.startsWith("{")&&assigneecq.endsWith("}")){
                var obj = JSON.parse(assigneecq);
                assxml = '<assignee id="assignee' + cell.id+'" value="">'+ getUserFuncqXml(obj)+'</assignee> ';
            }
        }
    }
    return assxml;
}
function getHtCandidatesElementXML(cell) {
    var canxml = '';
    if(cell.value!=null&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("candidates")&&$.trim(cell.value.attributes.candidates.value)!='') {
           var candidates = $.trim(cell.value.attributes.candidates.value);
            // canxml = '<candidates id="candidates' + cell.id+'" value="'+ candidates+'"></candidates> ';
            var obj = JSON.parse(candidates);
            if(obj.userType=='candidates'){
                var cannames = '';
                var objArr = JSON.parse(obj.data);
                for(var c=0;c<objArr.length;c++){
                    cannames+= objArr[c].id+";";
                }
                if(cannames!=''&&cannames.endsWith(";")){
                    cannames = cannames.substring(0,cannames.length-1);
                }
                canxml = '<candidates id="candidates' + cell.id+'" value="'+cannames+'"></candidates> ';
            }else if(obj.userType=='orgUser'){
                canxml = '<candidates id="candidates' + cell.id+'">';
                canxml+= getOrgUserXml(obj,"获取候选人");
                canxml+='</candidates>';
            }
        }
        //重庆用,修改请谨慎
        if (cell.value.hasAttribute("candidatescq")&&$.trim(cell.value.attributes.candidatescq.value)!='') {
            var candidatescq = $.trim(cell.value.attributes.candidatescq.value);
            // assxml = '<assignee id="assignee' + cell.id+'" value="'+ assignee+'"></assignee> ';
            // if(candidatescq.startsWith("{")&&candidatescq.endsWith("}")){
            //     var obj = JSON.parse(candidatescq);
            //     canxml = '<candidates id="candidates' + cell.id+'" value="">'+ getUserFuncqXml(obj)+'</candidates> ';
            // }else{
                canxml = '<candidates id="candidates' + cell.id+'" value="'+ candidatescq+'"></candidates> ';
            // }
        }else if(cell.value.hasAttribute("candidatescqhidden")&&$.trim(cell.value.attributes.candidatescqhidden.value)!='') {
            var candidatescq = $.trim(cell.value.attributes.candidatescqhidden.value);
            if(candidatescq.startsWith("{")&&candidatescq.endsWith("}")){
                var obj = JSON.parse(candidatescq);
                canxml = '<candidates id="candidates' + cell.id+'" value="">'+ getUserFuncqXml(obj)+'</candidates> ';
            }
        }
    }
    return canxml;
}
function getUserFuncqXml(obj){
    var userFunxml ='';
    userFunxml+='<function id="function" description="'+obj.description+'" applicationType="'+obj.applicationType+'">';
    userFunxml+='<path>'+obj.path+'</path>';
    if(obj.applicationType=='rpc'){
        userFunxml+='<method>'+obj.method+'</method>';
    }
    var params = obj.paramValue;
    if(params!=''){
        var paramXml = '';
        var paramArr = JSON.parse(params);
        for(var p=0;p<paramArr.length;p++){
            var param = paramArr[p];
            if(param.paramName!='') {
                paramXml += '<param paramName="' + param.paramName + '" paramDesc="' + param.paramDesc + '" paramType="' + param.paramType + '" defaultValue="' + param.defaultValue + '"></param>';
            }
        }
        if(paramXml.length>0){
            paramXml = '<paramList>'+paramXml+'</paramList>';
            userFunxml +=paramXml;
        }
    }
    userFunxml+='</function>';
    return userFunxml;
}
function getOrgUserXml(obj,des){
    var assxml ='';
    assxml+='<function id="function1" description="'+des+'" applicationType="rpc">';
    assxml+='<path>com.tydic.osworkflow.test.util.XmlFunctionUtil</path><method>getAssignee</method>';
    assxml+='<param><param paramName="orgId" paramDesc="机构Id" paramType="String" defaultValue="'+obj.data.id+'"></param></paramList>';
    assxml+='</function>';
    return assxml;
}
function getHtFunctionsElementXML(cell) {
    var funXml = '';
    if(cell.value!=null&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("preFunctions")&&$.trim(cell.value.attributes.preFunctions.value)!='') {
            var preFunctions = $.trim(cell.value.attributes.preFunctions.value);
            //"[{"id":"0","description":"1","tag":"3","order":"1","type":"pre","LAY_TABLE_INDEX":0}]"
            var temp = JSON.parse(preFunctions);
            // var tempXml = '';
            // for(var i=0;i<temp.length;i++){
            //     var obj =temp[i];
            //     if (obj.id != undefined) {
            //         tempXml += '<function id="function' + obj.id + '" description="' + obj.description + '" applicationType="' + obj.applicationType + '" order="' + obj.order + '">';
            //
            //         tempXml +='<path>'+obj.path+'</path>';
            //         tempXml +='<method>'+obj.method+'</method>';
            //         if(obj.paramValue!='') {
            //             var params = JSON.parse(obj.paramValue);
            //             var paramXml = '';
            //             for (var j = 0; j < params.length; j++) {
            //                 var param = params[j];
            //                 paramXml += '<param paramName="' + param.paramName + '" paramDesc="' + param.paramDesc + '" paramType="' + param.paramType + '" defaultValue="' + param.defaultValue + '"></param>';
            //             }
            //             if (paramXml.length > 0) {
            //                 paramXml = '<paramList>' + paramXml + '</paramList>';
            //                 tempXml += paramXml;
            //             }
            //         }
            //         tempXml += '</function>';
            //     }
            // }
            funXml  ='<preFunctions>'+getHtFunctionsInfoElementXML(temp) +'</preFunctions>\n';
        }
        if (cell.value.hasAttribute("postFunctions")&&$.trim(cell.value.attributes.postFunctions.value)!='') {
            var postFunctions = $.trim(cell.value.attributes.postFunctions.value);
            //"[{"id":"0","description":"1","tag":"3","order":"1","type":"pre","LAY_TABLE_INDEX":0}]"
            var temp = JSON.parse(postFunctions);

            funXml +='<postFunctions>'+getHtFunctionsInfoElementXML(temp) +'</postFunctions>\n';
        }
    }
    return funXml;
}
function getHtFunctionsInfoElementXML(temp) {
    var tempXml = '';
    temp.sort(jsonArrSortOrder);
    for(var i=0;i<temp.length;i++){
        var obj =temp[i];
        if (obj.id != undefined) {
            tempXml += '<function id="function' + obj.id + '" description="' + obj.description + '" applicationType="' + obj.applicationType + '" order="' + obj.order + '">';

            tempXml +='<path>'+obj.path+'</path>';
            if(obj.applicationType=='rpc'){
                tempXml +='<method>'+obj.method+'</method>';
            }
            if(obj.paramValue!=''){
                var params = JSON.parse(obj.paramValue);
                var paramXml ='';
                for(var j=0;j<params.length;j++){
                    var param = params[j];
                    if(param.paramName!=''){
                        paramXml +='<param paramName="'+param.paramName+'" paramDesc="'+param.paramDesc+'" paramType="'+param.paramType+'" defaultValue="'+param.defaultValue+'"></param>';
                    }
                }
                if(paramXml.length>0){
                    paramXml = '<paramList>'+paramXml+'</paramList>';
                    tempXml +=paramXml;
                }
            }
            tempXml += '</function>';
        }
    }
    return tempXml;
}
function getHtMqElementXML(cell) {
    var mqxml = '';
    if(cell.value!=null&&typeof(cell.value)=='object'){
        if (cell.value.hasAttribute("preMqs")&&$.trim(cell.value.attributes.preMqs.value)!='') {
           var preMqs = $.trim(cell.value.attributes.preMqs.value);
           //"[{"id":"0","description":"1","tag":"3","order":"1","type":"pre","LAY_TABLE_INDEX":0}]"
            var tempXml = getHtMqListXML(preMqs);

            mqxml  ='<preMqs>'+tempXml+'</preMqs>\n';
        }
        if (cell.value.hasAttribute("postMqs")&&$.trim(cell.value.attributes.postMqs.value)!='') {
           var postMqs = $.trim(cell.value.attributes.postMqs.value);
            var tempXml = getHtMqListXML(postMqs);
            mqxml +='<postMqs>'+tempXml+'</postMqs>\n';
        }
    }
    return mqxml;
}
function getHtMqListXML(mqs) {

    var temp = JSON.parse(mqs);
    temp.sort(jsonArrSortOrder);
    var tempXml = '';
    for(var i=0;i<temp.length;i++) {
        var obj = temp[i];
        if (obj.id != undefined) {
            tempXml += '<Mq id="mq' + obj.id + '" description="' + obj.description + '" tag="' + obj.tag + '" order="' + obj.order + '"></Mq>';
        }
    }
    return tempXml;
}
function jsonArrSortOrder(a,b) {
    return a.order - b.order;
}

/*
function getOSActionXML(cell) {
    var xml = '<actions>';
    var edges = cell.edges;
    for(var i=0;i<edges.length;i++) {
        var edge = edges[i];
        var actionId = $.trim(edge.id);
        var actionName = '';
        var actionFlowCondition = '';
        if (edge.value != null&&edge.value!='') {
            if (edge.value.hasAttribute("name")) {
                actionName = $.trim(edge.value.attributes.name.value);
            }
            if (edge.value.hasAttribute("flowCondition")) {
                actionFlowCondition = $.trim(edge.value.attributes.flowCondition.value);
            }
        }
        var actionXml = '<action id="'+actionId+'" name="'+actionName+'">';
        actionXml = actionXml + '<result id="result'+actionId+'" next-step="'+edge.target.id+'"></result>';
        if(actionFlowCondition!=''){
            actionXml = actionXml + '<condition id="condition'+actionId+'" value="'+actionFlowCondition+'"></condition>';
        }
        xml = xml + actionXml + '</action>';
    }
    xml = xml + '</actions>';
    return xml;
}*/
