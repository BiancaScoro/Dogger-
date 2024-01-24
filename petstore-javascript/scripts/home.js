import { formatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";

let hamburger = document.querySelector('#Ham');
let close = document.querySelector('#close');
let navigationLinks = document.querySelector('#navigation-links');

const hamburgerEvent = (navigation, closeDisplay, open) => {
    navigationLinks.style.display = navigation;
    hamburger.style.display = open;
    close.style.display = closeDisplay;
};

hamburger.addEventListener('click', () => hamburgerEvent("flex", "block", "none"));
close.addEventListener('click', () => hamburgerEvent("none", "none", "block"));

let productsHTML = '';

console.log(formatCurrency);
products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
    <div class="image-container">
    <img class="product-image"
    src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
        <h3 class="product-name">
        ${product.name}
        </h3>
        <p class="product-price">
          $${formatCurrency(product.priceCents)}
        </p>
        <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
      
          <div class="added-to-cart">
            Added
          </div>
        <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">Add To Cart</button>
    </div>
</div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    })
  })

