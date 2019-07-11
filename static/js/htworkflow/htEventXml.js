function htStartEventXml(cell){
    var name =  cell.id;
    if (cell.value.hasAttribute("name")) {
        name = $.trim(cell.value.attributes.name.value);
    }

    var xml = '<start id="'
        + cell.id
        + '" name="'
        + name
        + '"></start>\n';
    return xml;
}

function htEndEventXml(cell){
    var name =  cell.id;
    if (cell.value.hasAttribute("name")) {
        name = $.trim(cell.value.attributes.name.value);
    }
    var xml = '<end id="'
        + cell.id
        + '" name="'
        + name
        + '"></end>\n';
    return xml;
}