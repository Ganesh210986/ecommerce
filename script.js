import data from './data.js';

const categorySelect = document.getElementById("categorySelect");
const searchInput = document.querySelector("#search-input");
const productsContainer = document.getElementById("products");

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="items-images">
      <img src="${product.image}" alt="${product.title}" />
      <img class="wish" src="./images/wishlist.png" />
      </div>
      <h3>${product.title}</h3>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Price:</strong>${product.price}</p>
      <button class="addcart">Add to Cart</button>
    `;
    productsContainer.appendChild(div);
    const addCartButton = div.querySelector(".addcart");
    addCartButton.addEventListener("click", () => {
      addToCart(product);
    });
  });
}

function filterAndDisplay() {
  const selectedCategory = categorySelect.value.toLowerCase();
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = data.filter(item => {
    const matchesCategory = selectedCategory=="all" || item.category.toLowerCase() === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  displayProducts(filtered);
}

displayProducts(data);
categorySelect.addEventListener("change", filterAndDisplay);
searchInput.addEventListener("input", filterAndDisplay);

const cart=[]
function addToCart(data){
  const existingItems= cart.find(item=>item.id===data.id);
  if(existingItems){
    existingItems.quantity+=1;
  }else{
    cart.push({...data,quantity:1})
  }
  const cartValue = document.getElementById("cart-value");
  cartValue.textContent =parseInt(cartValue.textContent) + 1;
displayCart();
}
function displayCart(){
  const cartitems=document.querySelector(".cart-items")
  cartitems.innerHTML=cart.map(item=>`
  <div class="added-items">
    <div class="cart-item">
    <img src="${item.image}" />
    <p> ${item.title}</p>
    </div>
    <p> ${item.quantity}</p>
    <p> Rs${item.price}</p>
    <p> Rs${item.price * item.quantity}</p>
    <button class="remove" data-id="${item.id}">Remove</button>

  </div>
  `)
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.getAttribute("data-id"));
      removeFromCart(itemId);
    });
  });
}
function removeFromCart(itemId) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    displayCart();
  }
}
document.querySelector("#cart-image").addEventListener("click", () => {
  const cartSidebar= document.querySelector(".cart-sidebar");
  cartSidebar.style.display="flex";
});
document.querySelector(".close").addEventListener("click", () => {
  const cartSidebar = document.querySelector(".cart-sidebar");
  cartSidebar.style.display = "none";
});
