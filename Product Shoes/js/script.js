let storeProducts = [
    {
        name: "ProductName1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_1.jpg",
        price: 105
    },
    {
        name: "ProductName2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_2.jpg",
        price: 78
    },
    {
        name: "ProductName3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_3.jpg",
        price: 92
    },
    {
        name: "ProductName4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_4.jpg",
        price: 43
    },
    {
        name: "ProductName5",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_5.jpg",
        price: 120
    },
    {
        name: "ProductName6",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_6.jpg",
        price: 65
    },
    {
        name: "ProductName7",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_7.jpg",
        price: 82
    },
    {
        name: "ProductName8",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!",
        imageUrl: "images/productImage_8.jpg",
        price: 37
    }
];


if(!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(storeProducts));
} 

/* Get card-container for add product cards  */
const cardContainer = document.querySelector(".card-container");

if(localStorage.getItem("products") && JSON.parse(localStorage.getItem("products")).length) {
    cardContainer.innerHTML = JSON.parse(localStorage.getItem("products")).reduce((result, product, index) => result + addCard(product, index), "");
} 


function addCard({name, description, imageUrl, price}, index) {
    return `
            <div class="card-item" data-id="${index}">
                <div class="img-box">
                    <img src="${imageUrl}" alt="" class="img-item">
                    <i class="card-select-status display-none"></i>
                </div>
                <h2 class="card-product-name">${name}</h2>
                <p class="card-desc">
                    ${description}
                </p>
                <div class="card-price-box">
                    <span>Price:</span>
                    <span class="card-price" data-price="${price}">${price}</span>
                </div>
            </div>
    `
}



let totalPrice = document.querySelector("#totalPrice");
let count = 0;

let cardItem = document.querySelectorAll(".card-item");


/* Event when click a product card */
const onCardClick = (event) => {
    const cond = event.currentTarget.querySelector("i").classList.toggle("display-none"); // switch state when click a card
    const dataPrice = event.currentTarget.querySelector(".card-price").dataset.price; // get a current product price


    if(!cond) {                     // state when card indicated
        count += +dataPrice;
        totalPrice.dataset.totalprice = count;
        totalPrice.innerText = count
    } else {                        // state when card not indicated
        count -= +dataPrice;
        totalPrice.dataset.totalprice = count;
        totalPrice.innerText = count
    }
}


/* Add event for all cards */
cardItem.forEach(item => {
    item.addEventListener("click", onCardClick)
});


const removeAllBtn = document.querySelector("#removeall");
const removeSelectedBtn = document.querySelector("#removeselected");


/* Remove indicated products when click a <Remove selected products> button */
removeSelectedBtn.addEventListener("click", () => {
    let imgBox = document.querySelectorAll(".img-box");

    storeProducts = JSON.parse(localStorage.getItem("products"));

    imgBox.forEach((item) => {
        if(!item.querySelector('i').classList.contains("display-none")) {
            storeProducts[+item.parentElement.dataset.id] = undefined;
            item.parentElement.remove();
        }
    });

    storeProducts = storeProducts.filter(elem => elem);

    localStorage.setItem("products", JSON.stringify(storeProducts));
    cardContainer.innerHTML = storeProducts.reduce((result, product, index) => result + addCard(product, index), "");

    let cardItem = document.querySelectorAll(".card-item");

    /* Add event for old and new product cards */
    cardItem.forEach(item => {
        item.addEventListener("click", onCardClick)
    });

    count = 0;
    totalPrice.dataset.totalprice = count;
    totalPrice.innerText = count
});


/* Remove all products when click a <Remove all products> button */
removeAllBtn.addEventListener("click", () => {
    let imgBox = document.querySelectorAll(".img-box");

    imgBox.forEach(item => {
        item.parentElement.remove()
    });

    storeProducts.length = 0;
    localStorage.setItem("products", JSON.stringify(storeProducts))
    count = 0;
    totalPrice.dataset.totalprice = count;
    totalPrice.innerText = count
})


/* class Product for make a new products */
class Product {
    constructor(name, description, imageUrl, price) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}


let desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, doloremque!";

/* Get <Add new product> button */
const addProduct = document.querySelector("#addproduct");

addProduct.addEventListener("click", () => {
    let random = Math.floor(Math.random() * (19 - 1) + 1); // for random images
    let randomPrice = Math.floor(Math.random() * (124 - 32) + 32); // random prices

    storeProducts = JSON.parse(localStorage.getItem("products"));
    /* Push a new product objects inside storeProducts array */
    storeProducts.push(new Product(`ProductName${storeProducts.length + 1}`, desc, `images/productImage_${random}.jpg`, randomPrice));
    localStorage.setItem("products", JSON.stringify(storeProducts));

    cardContainer.innerHTML += addCard(storeProducts[storeProducts.length - 1], storeProducts.length - 1); 

    let cardItem = document.querySelectorAll(".card-item");

    /* Add event for old and new product cards */
    cardItem.forEach(item => {
        item.addEventListener("click", onCardClick)
    });
});
