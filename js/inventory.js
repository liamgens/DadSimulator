function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    itemRecieved(data.toUpperCase())
}

function allowDrop(ev) {
    ev.preventDefault();
}