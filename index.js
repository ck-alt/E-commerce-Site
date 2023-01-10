import products from "./products.js";

    const cart = document.getElementById("cart");
    const continueShopping = document.querySelector(".continueShopping");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    let addToCart = document.querySelectorAll(".add-to-cart");
    const pickedItem = document.getElementById("pickedItem");
    let gadgets = document.getElementById("gadgets");
    const subtotal = document.querySelector(".subtotal");
    const productNumb = document.querySelector(".productNumb");
    
    function renderProducts() {
    products.forEach((product) => {
        gadgets.innerHTML += `
            <div class="item">
            <div>
                <div class="container">
                    <img src="${product.imgSrc}" alt="" class="img">
                    <div class="container-overlay"></div>
                    <div class="price">
                        <h4>Price</h4>
                        <p>&#8358 ${product.price}</p>
                    </div>
                </div>
                <h3 class="productName">${product.name}</h3>
                <button onClick ="addToCartArray(${product.id})">ADD TO CART</button>
            </div>
            </div>`;
    });
    }
    renderProducts();

    function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    }

    function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    }

    cart.addEventListener("click", openModal);
    continueShopping.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // Cart Array
    let cartArray = [];
    let serialNumber = 1;


    //Add To Cart
    function addToCartArray(id){
        
    //Check if product exist
    if(cartArray.some((item) => item.id === id)){
        changeNumberOfUnit("plus", id);
        productNumb.innerText--;
    }else{
        const item = products.find((product)=> product.id === id);
        cartArray.push({
            serialNumber,
            ...item,
            quantity: 1,
        });
        serializing();
    }
    productNumb.innerText++;
    updateCartArray();
    }

//serializing function
    function serializing(){
        for(let i = 0; i<cartArray.length; i++){
            cartArray[i].serialNumber = i+1;
        }
    }


//Cart Update function
    function updateCartArray(){
        renderCartArrayItems();
        renderSubtotal();
    }

// calculate and render subtotal
function renderSubtotal(){
    let totalPrice = 0;

    cartArray.forEach((item)=>{
        totalPrice += item.price * item.quantity;
    });
    subtotal.innerText = totalPrice;

}


//Render Cart Array

function renderCartArrayItems(){
    pickedItem.innerHTML = ""; //clear element in the cart
    cartArray.forEach((item)=>{
        pickedItem.innerHTML += 
        `<ul>
        <li>${item.serialNumber}</li>
        <li class = "prodItem">${item.name}</li>
        <li class = "prodAmount">&#8358 ${item.price}</li>
        <li class = "prodQuantity"><div class="btn-minus" onClick ="changeNumberOfUnit('minus', ${item.id})">-</div>
        <div class="number">${item.quantity}</div>
        <div class="btn-plus" onClick = "changeNumberOfUnit('plus', ${item.id})">+</div>
        </li>
        <li><div class = "closeButton" onClick = "removeItem(${item.id})">x</div></li>
        </ul>
        `
    })
}

// Remove Item function
function removeItem(id){
    cartArray = cartArray.filter((item)=>{
        if(item.id === id){
            productNumb.innerText = productNumb.innerText - item.quantity;
        }
        return item.id != id;
    });
    
    serializing();
    
    updateCartArray();
}

//Quantity function

function changeNumberOfUnit(action, id){
    cartArray = cartArray.map((item)=>{

        let quantity = item.quantity;
        if(item.id === id){
            if( action === "minus" && quantity > 1){
                    quantity--;
                    productNumb.innerText--;
                
            }else if(action === "plus"){
                quantity++;
                productNumb.innerText++;
            }else{
                alert("Like To Remove Item? If Yes! Click 'x' Button.");
            }
        }
        return {
            ...item,
            quantity,
        };

});
updateCartArray();
}
