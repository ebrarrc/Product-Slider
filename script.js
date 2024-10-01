let currentIndex = 0;
let products = []; 

const slider = document.getElementById("slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function renderProducts() {
  slider.innerHTML = ""; 
  const mobileBreakpoint = 768;
  const productCount = window.innerWidth <= mobileBreakpoint ? 1 : 3; 
  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + productCount
  ); 

  visibleProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Fiyat: ${product.price} TL</p>
      <p>Stok: ${product.stock}</p>
      <div class="quantity-buttons">
      <button class="decrease" data-id="${product.id}" ${product.stock === 0 ? "disabled" : ""}>-</button>
        ${
          product.stock === 0
            ? `<span class="no-stock">Stok Tükenmiştir</span>`
            : `<input class="qtyNumber" type="number" id="${product.id}" value="0" min="0" max="${product.stock}">`
        }
        <button class="increase" data-id="${product.id}" ${
      product.stock === 0 ? "disabled" : "" }>+</button>
      </div>
    `;
    slider.appendChild(productDiv);
  });

 
  prevButton.classList.toggle("hidden", currentIndex === 0);
  nextButton.classList.toggle(
    "hidden",
    currentIndex + productCount >= products.length
  );
}

nextButton.addEventListener("click", () => {
  if (currentIndex + 1 < products.length) {
    currentIndex += 1; 
    renderProducts();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderProducts();
  }
});

slider.addEventListener("click", (e) => {
  const target = e.target;
  const productId = target.getAttribute("data-id");
  const qtyInput = document.getElementById(`${productId}`);

  if (target.classList.contains("increase")) {
    let currentQty = parseInt(qtyInput.value);
    let maxStock = products.find((p) => p.id == productId).stock;
    if (currentQty < maxStock) {
      qtyInput.value = currentQty + 1;
    }
  }

  if (target.classList.contains("decrease")) {
    let currentQty = parseInt(qtyInput.value);
    if (currentQty > 0) {
      qtyInput.value = currentQty - 1;
    }
  }
});
async function fetchProducts() {
  try {
    const response = await fetch("products.json");
    products = await response.json(); 
    renderProducts(); 
  } catch (error) {
    console.error("Ürünler alınırken hata oluştu:", error);
  }
}
fetchProducts();
