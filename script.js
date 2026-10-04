/* =========================================
   THULIR FRESH FOOD PRODUCTS - script.js
========================================= */

const exploreButton = document.getElementById("exploreButton");
const productsSection = document.getElementById("products");
const mainProducts = document.getElementById("mainProducts");
const variantSection = document.getElementById("variantSection");
const variantTitle = document.getElementById("variantTitle");
const variantList = document.getElementById("variantList");

const cartButton = document.getElementById("cartButton");
const cartSection = document.getElementById("cartSection");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const closeCartButton = document.getElementById("closeCartButton");

const proceedButton = document.getElementById("proceedButton");
const checkoutSection = document.getElementById("checkoutSection");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const backToCartButton = document.getElementById("backToCartButton");

const placeOrderButton = document.getElementById("placeOrderButton");

const successSection = document.getElementById("successSection");
const successTotal = document.getElementById("successTotal");
const continueShoppingButton =
    document.getElementById("continueShoppingButton");

const signInButton = document.getElementById("signInButton");
const signInSection = document.getElementById("signInSection");
const closeSignInButton =
    document.getElementById("closeSignInButton");

const customerForm = document.getElementById("customerForm");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerAddress = document.getElementById("customerAddress");

const savedCustomerDetails =
    document.getElementById("savedCustomerDetails");

const editAddressButton =
    document.getElementById("editAddressButton");

const upiSection = document.getElementById("upiSection");

const exitButton = document.getElementById("exitButton");


/* =========================================
   CART
========================================= */

let cart = [];


/* =========================================
   CUSTOMER DETAILS
========================================= */

let customer =
    JSON.parse(
        localStorage.getItem("thulirCustomer")
    ) || null;


/* =========================================
   ORDER ID
========================================= */

let lastOrderId = "";


/* =========================================
   PRODUCT DATA
========================================= */

const productVariants = {

    "Fresh Corn": [

        {
            name: "Wrapped Full Corn",
            price: 30,
            image:
                "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
        },

        {
            name: "Fresh Full Corn",
            price: 25,
            image:
                "Fresh Corn.jpeg"
        }

    ],


    "Packet Corn": [

        {
            name: "Packet Corn 200 gms",
            price: 36,
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Corn_on_the_cob.jpg/640px-Corn_on_the_cob.jpg"
        },

        {
            name: "Packet Corn 500 gms",
            price: 100,
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Corn_on_the_cob.jpg/640px-Corn_on_the_cob.jpg"
        },

        {
            name: "Packet Corn 1 kg",
            price: 200,
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Corn_on_the_cob.jpg/640px-Corn_on_the_cob.jpg"
        },

        {
            name: "Packet Corn 1 kg Pouch",
            price: 200,
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Corn_on_the_cob.jpg/640px-Corn_on_the_cob.jpg"
        }

    ],


    "Baby Corn": [

        {
            name: "Baby Corn 200 gms",
            price: 65,
            image:
                "Baby Corn200gms.jpeg"
        },

        {
            name: "Baby Corn 1 kg",
            price: 250,
            image:
                "https://images.unsplash.com/photo-1603046891744-76e6300e6e2d?auto=format&fit=crop&w=600&q=80"
        }

    ]

};


/* =========================================
   EXPLORE PRODUCTS
========================================= */

exploreButton.addEventListener(
    "click",
    function () {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   SIGN IN
========================================= */

signInButton.addEventListener(
    "click",
    function () {

        mainProducts.style.display =
            "none";

        variantSection.style.display =
            "none";

        cartSection.style.display =
            "none";

        checkoutSection.style.display =
            "none";

        successSection.style.display =
            "none";

        signInSection.style.display =
            "block";


        if (customer) {

            customerName.value =
                customer.name;

            customerPhone.value =
                customer.phone;

            customerAddress.value =
                customer.address;

        }


        signInSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   SAVE CUSTOMER
========================================= */

customerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            customerName.value.trim();

        const phone =
            customerPhone.value.trim();

        const address =
            customerAddress.value.trim();


        if (phone.length !== 10) {

            alert(
                "Please enter a valid 10 digit phone number."
            );

            return;
        }


        customer = {

            name: name,
            phone: phone,
            address: address

        };


        localStorage.setItem(
            "thulirCustomer",
            JSON.stringify(customer)
        );


        alert(
            "Your details have been saved successfully!"
        );


        signInSection.style.display =
            "none";

        mainProducts.style.display =
            "flex";


        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   CLOSE SIGN IN
========================================= */

closeSignInButton.addEventListener(
    "click",
    function () {

        signInSection.style.display =
            "none";

        mainProducts.style.display =
            "flex";


        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   MAIN PRODUCT BUTTONS
========================================= */

const orderButtons =
    document.querySelectorAll(
        ".mainOrderButton"
    );


orderButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const productName =
                    button.getAttribute(
                        "data-product"
                    );


                mainProducts.style.display =
                    "none";

                cartSection.style.display =
                    "none";

                checkoutSection.style.display =
                    "none";

                variantSection.style.display =
                    "block";


                variantTitle.textContent =
                    productName;


                variantList.innerHTML =
                    "";


                const variants =
                    productVariants[
                        productName
                    ] || [];


                variants.forEach(
                    function (variant) {

                        createVariantCard(
                            variant
                        );

                    }
                );


                variantSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }
);


/* =========================================
   CREATE VARIANT CARD
========================================= */

function createVariantCard(variant) {

    const variantCard =
        document.createElement("div");

    variantCard.className =
        "variant-card";


    /* IMAGE */

    const image =
        document.createElement("img");

    image.className =
        "variant-image";

    image.src =
        variant.image;

    image.alt =
        variant.name;


    /* DETAILS */

    const details =
        document.createElement("div");

    details.className =
        "variant-details";


    /* NAME */

    const name =
        document.createElement("h3");

    name.textContent =
        variant.name;


    /* PRICE */

    const price =
        document.createElement("p");

    price.className =
        "variant-price";

    price.textContent =
        "MRP. ₹" +
        variant.price;


    /* QUANTITY */

    const quantityArea =
        document.createElement("div");

    quantityArea.className =
        "quantity-area";


    const minusButton =
        document.createElement("button");

    minusButton.textContent =
        "−";


    const quantityNumber =
        document.createElement("span");

    quantityNumber.className =
        "quantity-number";

    quantityNumber.textContent =
        "1";


    const plusButton =
        document.createElement("button");

    plusButton.textContent =
        "+";


    /* ITEM TOTAL */

    const itemTotal =
        document.createElement("p");

    itemTotal.className =
        "item-total";

    itemTotal.textContent =
        "Total: ₹" +
        variant.price;


    /* ADD CART */

    const addCartButton =
        document.createElement("button");

    addCartButton.className =
        "add-cart-button";

    addCartButton.textContent =
        "Add to Cart";


    let quantity = 1;


    /* UPDATE QUANTITY */

    function updateQuantity() {

        quantityNumber.textContent =
            quantity;

        itemTotal.textContent =
            "Total: ₹" +
            (variant.price * quantity);

    }


    /* PLUS */

    plusButton.addEventListener(
        "click",
        function () {

            quantity++;

            updateQuantity();

        }
    );


    /* MINUS */

    minusButton.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

                updateQuantity();

            }

        }
    );


    /* ADD CART */

    addCartButton.addEventListener(
        "click",
        function () {

            addToCart(
                variant,
                quantity
            );

        }
    );


    quantityArea.appendChild(
        minusButton
    );

    quantityArea.appendChild(
        quantityNumber
    );

    quantityArea.appendChild(
        plusButton
    );


    details.appendChild(
        name
    );

    details.appendChild(
        price
    );

    details.appendChild(
        quantityArea
    );

    details.appendChild(
        itemTotal
    );

    details.appendChild(
        addCartButton
    );


    variantCard.appendChild(
        image
    );

    variantCard.appendChild(
        details
    );


    variantList.appendChild(
        variantCard
    );

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(
    product,
    quantity
) {

    const existingProduct =
        cart.find(
            function (item) {

                return item.name ===
                    product.name;

            }
        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    } else {

        cart.push({

            name:
                product.name,

            price:
                product.price,

            quantity:
                quantity

        });

    }


    updateCart();


    alert(
        product.name +
        " added to cart!"
    );

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML =
        "";

    let total = 0;

    let totalQuantity = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.textContent =
            "0";

        cartCount.textContent =
            "0";

        return;

    }


    cart.forEach(
        function (item) {

            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;


            totalQuantity +=
                item.quantity;


            const cartItem =
                document.createElement(
                    "div"
                );

            cartItem.className =
                "cart-item";


            const itemDetails =
                document.createElement(
                    "div"
                );


            const itemName =
                document.createElement(
                    "h3"
                );

            itemName.textContent =
                item.name;


            const itemPrice =
                document.createElement(
                    "p"
                );

            itemPrice.textContent =
                "₹" +
                item.price +
                " × " +
                item.quantity;


            const itemAmount =
                document.createElement(
                    "p"
                );

            itemAmount.className =
                "cart-item-total";

            itemAmount.textContent =
                "₹" +
                itemTotal;


            itemDetails.appendChild(
                itemName
            );

            itemDetails.appendChild(
                itemPrice
            );


            cartItem.appendChild(
                itemDetails
            );

            cartItem.appendChild(
                itemAmount
            );


            cartItems.appendChild(
                cartItem
            );

        }
    );


    cartTotal.textContent =
        total;

    cartCount.textContent =
        totalQuantity;

}


/* =========================================
   OPEN CART
========================================= */

cartButton.addEventListener(
    "click",
    function () {

        signInSection.style.display =
            "none";

        variantSection.style.display =
            "none";

        checkoutSection.style.display =
            "none";

        successSection.style.display =
            "none";

        mainProducts.style.display =
            "none";

        cartSection.style.display =
            "block";


        updateCart();


        cartSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   CLOSE CART
========================================= */

closeCartButton.addEventListener(
    "click",
    function () {

        cartSection.style.display =
            "none";

        mainProducts.style.display =
            "flex";


        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   BACK TO PRODUCTS
========================================= */

exitButton.addEventListener(
    "click",
    function () {

        variantSection.style.display =
            "none";

        mainProducts.style.display =
            "flex";


        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   PROCEED TO ORDER
========================================= */

proceedButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;
        }


        if (!customer) {

            alert(
                "Please Sign In first and save your delivery details."
            );


            signInSection.style.display =
                "block";

            cartSection.style.display =
                "none";

            mainProducts.style.display =
                "none";


            signInSection.scrollIntoView({
                behavior: "smooth"
            });

            return;
        }


        cartSection.style.display =
            "none";

        checkoutSection.style.display =
            "block";


        showCustomerDetails();

        showCheckoutItems();


        checkoutSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   SHOW CUSTOMER DETAILS
========================================= */

function showCustomerDetails() {

    if (!customer) {

        savedCustomerDetails.innerHTML =
            "<p>No customer details found.</p>";

        return;
    }


    savedCustomerDetails.innerHTML = `
        <div class="customer-info">

            <strong>Name:</strong>
            ${customer.name}
            <br>

            <strong>Phone:</strong>
            ${customer.phone}
            <br>

            <strong>Address:</strong>
            ${customer.address}

        </div>
    `;

}


/* =========================================
   SHOW CHECKOUT ITEMS
========================================= */

function showCheckoutItems() {

    checkoutItems.innerHTML =
        "";

    let total = 0;


    cart.forEach(
        function (item) {

            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;


            const checkoutItem =
                document.createElement(
                    "div"
                );

            checkoutItem.className =
                "checkout-item";


            checkoutItem.innerHTML = `
                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ₹${itemTotal}
                </strong>
            `;


            checkoutItems.appendChild(
                checkoutItem
            );

        }
    );


    checkoutTotal.textContent =
        total;

}


/* =========================================
   BACK TO CART
========================================= */

backToCartButton.addEventListener(
    "click",
    function () {

        checkoutSection.style.display =
            "none";

        cartSection.style.display =
            "block";


        cartSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   EDIT ADDRESS
========================================= */

editAddressButton.addEventListener(
    "click",
    function () {

        signInSection.style.display =
            "block";

        checkoutSection.style.display =
            "none";


        if (customer) {

            customerName.value =
                customer.name;

            customerPhone.value =
                customer.phone;

            customerAddress.value =
                customer.address;

        }


        signInSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   PAYMENT METHOD
========================================= */

const paymentOptions =
    document.querySelectorAll(
        'input[name="payment"]'
    );


paymentOptions.forEach(
    function (option) {

        option.addEventListener(
            "change",
            function () {

                if (
                    option.value ===
                    "UPI"
                ) {

                    upiSection.style.display =
                        "block";

                } else {

                    upiSection.style.display =
                        "none";

                }

            }
        );

    }
);


/* =========================================
   SHOW ORDER ID
========================================= */

function showOrderId(orderId) {

    let orderIdElement =
        document.getElementById(
            "successOrderId"
        );


    if (!orderIdElement) {

        orderIdElement =
            document.createElement(
                "p"
            );

        orderIdElement.id =
            "successOrderId";

        orderIdElement.style.fontWeight =
            "bold";

        orderIdElement.style.fontSize =
            "18px";

        orderIdElement.style.margin =
            "10px 0";


        const heading =
            successSection.querySelector(
                "h2"
            );


        if (heading) {

            heading.insertAdjacentElement(
                "afterend",
                orderIdElement
            );

        } else {

            successSection.prepend(
                orderIdElement
            );

        }

    }


    orderIdElement.textContent =
        "Order ID: " +
        orderId;

}


/* =========================================
   PLACE ORDER
========================================= */

placeOrderButton.addEventListener(
    "click",
    async function () {

        if (!customer) {

            alert(
                "Please Sign In first."
            );

            return;
        }


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        if (!selectedPayment) {

            alert(
                "Please select a payment method."
            );

            return;
        }


        /* CALCULATE TOTAL */

        let total = 0;


        cart.forEach(
            function (item) {

                total +=
                    item.price *
                    item.quantity;

            }
        );


        /* =====================================
           SEND ORDER TO FLASK BACKEND
        ===================================== */

        const orderData = {

            customer:
                customer,

            products:
                cart,

            payment_method:
                selectedPayment.value,

            total:
                total

        };


        try {

            placeOrderButton.disabled =
                true;


            placeOrderButton.textContent =
                "Placing Order...";


            const response =
                await fetch(
                    "http://127.0.0.1:5000/api/orders",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                orderData
                            )

                    }
                );


            const data =
                await response.json();


            console.log(
                "Backend Order Response:",
                data
            );


            if (
                data.status !==
                "success"
            ) {

                throw new Error(
                    data.message ||
                    "Order was not successful."
                );

            }


            /* SAVE ORDER ID */

            lastOrderId =
                data.order_id;


            /* SHOW TOTAL */

            successTotal.textContent =
                data.total;


            /* SHOW ORDER ID */

            showOrderId(
                data.order_id
            );


            /* HIDE CHECKOUT */

            checkoutSection.style.display =
                "none";


            /* SHOW SUCCESS */

            successSection.style.display =
                "block";


            successSection.scrollIntoView({
                behavior: "smooth"
            });


            /* CLEAR CART */

            cart = [];

            updateCart();


            alert(
                "Order placed successfully!"
            );


        } catch (error) {

            console.error(
                "Order Error:",
                error
            );


            alert(
                "Order could not be placed. Please check whether the Flask backend is running."
            );

        } finally {

            placeOrderButton.disabled =
                false;

            placeOrderButton.textContent =
                "Place Order";

        }

    }
);


/* =========================================
   CONTINUE SHOPPING
========================================= */

continueShoppingButton.addEventListener(
    "click",
    function () {

        successSection.style.display =
            "none";

        mainProducts.style.display =
            "flex";


        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   INITIAL CART
========================================= */

updateCart();


/* =========================================
   FRONTEND LOADED MESSAGE
========================================= */

console.log(
    "Thulir Fresh Food Products Frontend Loaded"
);