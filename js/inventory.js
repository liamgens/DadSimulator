function drag(ev) {
    ev.dataTransfer.setData("text", "beer");
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    itemRecieved(data)
}

function allowDrop(ev) {
    ev.preventDefault();
}