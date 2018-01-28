if (!Cookies.get("gameStarted")) {
    Cookies.set("items", [{
        name: "beer",
        quantity: 3,
    }])
    Cookies.set("totalMoney", 20)
}

loadShopItems()
updateInventory()

function loadShopItems() {
    for (let name in GAME_PRODUCTS) {
        let item = GAME_PRODUCTS[name]
        $('#shop-items').append(`
            <div id="${name}" class="shop-item">
                <img draggable="false" src="assets/${name}.png" />
                <div class="description">
                    <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    <button onclick="buyItem('${name}')">Buy +1</button>
                    <br>
                    <span class="price">Price: $${item.price}</span>
                    <p>${item.description}</p>
                </div>
            </div>
        `)
    }
}

function updateInventory() {
    const allItems = Cookies.getJSON("items")
    console.log(allItems)
    $('#inventoryitems').html("")
    for (let item of allItems) {
        $('#inventoryitems').append(`
            <div class="item">
                <img id="${item.name}" class="item" draggable="true" ondragstart="drag(event)" src="assets/${item.name}.png">
                <span id="count">${item.quantity}</span>
            </div>
        `)
    }

    $('#money').text(`$${Cookies.get("totalMoney")}`)
    
    updateStats()
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
}

function drop(ev) {
    ev.preventDefault()
    var data = ev.dataTransfer.getData("text")
    itemRecieved(data.toUpperCase())
    removeItem(data)
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
    let allItems = Cookies.getJSON("items")
    const totalMoney = Cookies.getJSON("totalMoney");
    const itemPrice = GAME_PRODUCTS[item].price
    if (totalMoney - itemPrice < 0) {
        alert("You've got no money, good job kid.")
        return
    }

    if (allItems) {
        let obj = allItems.find((obj) => obj.name === item)
        if (obj) {
            obj.quantity = obj.quantity + 1
            Cookies.set("items", allItems)
        } else {
            allItems.push({
                name: item,
                quantity: 1,
            })
            Cookies.set("items", allItems)
        }
        Cookies.set("totalMoney", totalMoney - itemPrice)
    }

    updateInventory()
}

function removeItem(item) {
    const allItems = Cookies.getJSON("items")
    if (allItems) {
        let obj = allItems.find((obj) => obj.name === item)
        if (obj) {
            if (obj.quantity === 1) {
                allItems.splice(allItems.indexOf(obj), 1)
            } else {
                obj.quantity = obj.quantity - 1
            }
            Cookies.set("items", allItems)
        }
    }

    updateInventory()
}

$('#popshop').draggable({ handle: "#popshopnavbar" })