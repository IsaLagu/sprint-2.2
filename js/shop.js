// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

// Exercise 1
function buy(id) {
  const purchase = products.find((product) => product.id === id);
  const indexOfProduct = cart.findIndex((product) => product.id === id);

  if (indexOfProduct !== -1) {
    cart[indexOfProduct].quantity = cart[indexOfProduct].quantity + 1;
  } else {
    if (purchase) {
      cart.push({ ...purchase, quantity: 1 });
    }
  }
}

// Exercise 2
function cleanCart() {
  cart = [];
  printCart();
}

// Exercise 3
function calculateTotal() {
  let total = 0;
  applyPromotionsCart();
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].subtotalWithDiscount ? cart[i].subtotalWithDiscount : cart[i].price * cart[i].quantity;
  }

  return total;
}

// Exercise 4
function applyPromotionsCart() {
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    if (product.offer) {
      if (product.quantity >= product.offer.number) {
        let subtotalWithDiscount =
          product.price * product.quantity - product.price * product.quantity * (product.offer.percent / 100);
        cart[i].subtotalWithDiscount = subtotalWithDiscount;
      }
    }
  }
}

// Exercise 5
function printCart() {
  const cartListBody = document.getElementById("cart_list");
  applyPromotionsCart();

  cartListBody.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    cartListBody.innerHTML += `
    <tr>
      <th>${cart[i].name}</th>
      <td>${cart[i].price}</td>
      <td>${cart[i].quantity}</td>
      <td>${cart[i].subtotalWithDiscount ? cart[i].subtotalWithDiscount : cart[i].price * cart[i].quantity}</td>
    </tr>
    `;
  }
  document.getElementById("total_price").innerHTML = calculateTotal();
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  const itemIndex = cart.findIndex((product) => product.id === id);

  const item = cart[itemIndex];

  if (item.quantity === 1) {
    cart = cart.filter((product) => product.id !== item.id);
  } else {
    item.quantity = item.quantity - 1;
  }
}

function open_modal() {
  printCart();
}
