const products = [
  {id:1, name:"Kaos Putih", price:120000, img:"https://via.placeholder.com/200x200?text=Kaos+Putih"},
  {id:2, name:"Jeans Slim Fit", price:250000, img:"https://via.placeholder.com/200x200?text=Jeans"},
  {id:3, name:"Jaket Denim", price:350000, img:"https://via.placeholder.com/200x200?text=Jaket"},
  {id:4, name:"Dress Casual", price:400000, img:"https://via.placeholder.com/200x200?text=Dress"},
  {id:5, name:"Topi Hitam", price:80000, img:"https://via.placeholder.com/200x200?text=Topi"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = localStorage.getItem("user");

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(p => {
    const el = document.createElement("div");
    el.className = "product";
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>Rp ${p.price.toLocaleString()}</p>
      <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
    `;
    container.appendChild(el);
  });
}

function addToCart(id) {
  if (!user) return alert("Silakan login terlebih dahulu!");
  const item = products.find(p => p.id === id);
  const found = cart.find(c => c.id === id);
  if (found) found.qty += 1;
  else cart.push({...item, qty:1});
  saveCart();
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    list.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x${item.qty}</span>
        <button onclick="removeItem(${i})">❌</button>
      </div>`;
  });
  document.getElementById("total-price").innerText = "Total: Rp " + total.toLocaleString();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function login() {
  const username = prompt("Masukkan nama pengguna:");
  if (username) {
    user = username;
    localStorage.setItem("user", username);
    updateUserStatus();
  }
}

function logout() {
  user = null;
  localStorage.removeItem("user");
  updateUserStatus();
}

function updateUserStatus() {
  document.getElementById("user-status").innerText = user ? "Halo, " + user : "Belum login";
}

renderProducts();
renderCart();
updateUserStatus();
