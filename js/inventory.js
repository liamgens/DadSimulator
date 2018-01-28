if (!Cookies.get("gameStarted")) {
    Cookies.set("items", [{
        name: "beer",
        quantity: 3,
    }])
}

updateInventory()

function updateInventory() {
    const allItems = Cookies.getJSON("items")
    for (let item of allItems) {
        console.log(item)
        $('#inventoryitems').append(`
            <div class="item">
                <img id="${item.name}" class="item" draggable="true" ondragstart="drag(event)" src="assets/${item.name}.jpg">
                <span id="count">${item.quantity}</span>
            </div>
        `)
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
}

function drop(ev) {
    ev.preventDefault()
    var data = ev.dataTransfer.getData("text")
    itemRecieved(data.toUpperCase())
}

function allowDrop(ev) {
    ev.preventDefault()
}

function openPopShop() {
    document.getElementById("popshop").style = "display: block"
}

function closePopShop() {
    document.getElementById("popshop").style = "display: none"
}

function buyItem(item) {
    const allItems = Cookies.get("items")
    if (allItems) {
        for (let item of allItems) {
            console.log(item)
        }
    }
}

$('#popshop').draggable({ handle: "#popshopnavbar" })