const cart = [];

function renderCart() {
  const tbody = document.getElementById("cart-body");
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>€${item.price.toFixed(2)}</td>
      <td>€${(item.price * item.qty).toFixed(2)}</td>
      <td><button data-idx="${idx}" class="remove">X</button></td>
    `;
    tbody.appendChild(row);
    total += item.price * item.qty;
  });

  document.getElementById("total").textContent = `€${total.toFixed(2)}`;
}

document.querySelectorAll("#catalogo button").forEach((btn) =>
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const existing = cart.find((p) => p.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
  })
);

document.getElementById("cart-body").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const idx = e.target.dataset.idx;
    cart.splice(idx, 1);
    renderCart();
  }
});
