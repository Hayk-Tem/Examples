// fetch("./products.json")
//     .then(products => products.json())
//     .then(({ products }) => console.log(products))
//     .catch(error => console.error(error));


// async function getData() {
//     const p = await fetch("./products.json")

//     const data = await p.json()

//     return data
// }


// getData().then(({products}) => console.log(products));

function card({ id, brand, title, url, price }) {
    return `
            <div class="card" data-id="${id}">
                <div class="img-box">
                    <img src="${url}">
                </div>
                <h2>${brand}</h2>
                <p class="card-title">${title}</p>
                <div class="price-box">
                    <span>Price:</span>
                    <span class="price-cost">${price}</span>
                </div>
            </div>
    `
}

function create(tagName) {
    return new CreateElement(tagName)
}

class CreateElement {
    constructor(tagName) {
        this.content = document.createElement(tagName)
        return this
    }

    addClass(className) {
        this.content.classList.add(className)
        return this
    }

    childrens({ childList }) {
        childList.forEach(element => {
            for (const key in element) {
                console.log(key);
            }
        });
    }
}

class Child {
    constructor(...childs) {
        this.childList = childs
    }
}

console.log(create("div").childrens(new Child({ class: "bool", src: "url" }, { class: "cond", src: "urlu" })));

let db = create("div")
console.dir(db.addClass("bool").addClass("condition"));

class Card {
    constructor(cardObj) {
        return this.create(cardObj)
    }

    create({ id, brand, title, url, price }) {
        let card = document.createElement("div")
        let imgBox = document.createElement("div")
        let image = document.createElement("img")
        let brandName = document.createElement("h2")
        let cardTitle = document.createElement("p")
        let priceBox = document.createElement("div")
        let priceText = document.createElement("span")
        let priceCost = document.createElement("span")

        card.classList.add("card")
        card.setAttribute("data-id", id)

        imgBox.classList.add("img-box")
        image.src = url
        imgBox.append(image)

        brandName.innerText = brand

        cardTitle.classList.add("card-title")
        cardTitle.innerText = title

        priceBox.classList.add("price-box")
        priceText.innerText = "Price:"
        priceCost.classList.add("price-cost")
        priceCost.innerText = price
        priceBox.append(priceText, priceCost)

        card.append(imgBox, brandName, cardTitle, priceBox)
        return card
    }

    copy({ id, brand, title, url, price }) {
        let card = document.createElement("div")

        let imgBox = document.createElement("div")
        let image = document.createElement("img")
        let brandName = document.createElement("h2")
        let cardTitle = document.createElement("p")
        let priceBox = document.createElement("div")
        let priceText = document.createElement("span")
        let priceCost = document.createElement("span")

        card.classList.add("card")
        card.setAttribute("data-id", id)

        imgBox.classList.add("img-box")
        image.src = url
        imgBox.append(image)

        brandName.innerText = brand

        cardTitle.classList.add("card-title")
        cardTitle.innerText = title

        priceBox.classList.add("price-box")
        priceText.innerText = "Price:"
        priceCost.classList.add("price-cost")
        priceCost.innerText = price
        priceBox.append(priceText, priceCost)

        card.append(imgBox, brandName, cardTitle, priceBox)
        return card
    }
}

async function getData(url) {
    let data = await fetch(url)
    let dataJson = await data.json()
    return dataJson
}

let container = document.querySelector(".container")
let showMore = document.querySelector("#showmore")
let btnBox = document.querySelector(".btn-box")
let count = 8

let localProducts = []

getData("./products.json").then(({ products }) => {
    let start = new Date().getMilliseconds()
    for (let i = 0; i < (products.length <= 8 ? products.length : 8); i++) {
        container.append(new Card(products[i]))

        // container.innerHTML += card(products[i])
    }
    let end = new Date().getMilliseconds()
    console.log(end - start);
    if (products.length > 8) {
        btnBox.style.display = "block"
    }
    localProducts = [...products]
});

showMore.addEventListener("click", () => {
    console.log(localProducts);
    let { length: len } = localProducts
    if (len > count) {
        count += (len - (len - 8) <= 8) ? 8 : (len - (len - count))

        for (let i = count - 8; i < count; i++) {
            container.append(new Card(localProducts[i]))
        }

        if (len === count) {
            btnBox.style.display = "none"
        }
    }
})


window.onscroll = function (e) {
    if (localProducts.length === count) {
        return
    }
    // console.log(Math.round(window.scrollY + window.innerHeight) + " " + document.scrollingElement.scrollHeight + ' ' + scrollY);
    if (Math.round(window.scrollY + window.innerHeight) === document.scrollingElement.scrollHeight) {
        let { length: len } = localProducts
        if (len > count) {
            count += (len - (len - 8) <= 8) ? 8 : (len - (len - count))

            for (let i = count - 8; i < count; i++) {
                container.append(new Card(localProducts[i]))
            }

            if (len === count) {
                btnBox.style.display = "none"
            }
        }
    }
}

