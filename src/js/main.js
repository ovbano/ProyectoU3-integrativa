(function ($) {
  "use strict";

  const cart = {
    items: [],
    total: 0,
  };

  const selectedProduct = {
    type: "Notebook",
    option: null,
    image: {
      Notebook: {
        original: "../public/arkana_notebook_original.jpg",
        red: "arkana_notebook_red_md.jpg",
        blue: "arkana_notebook_blue_md.jpg",
        black: "arkana_notebook_black_md.jpg",
        texture1: "arkana_notebook_t1_md.jpg",
        texture2: "arkana_notebook_t2_md.jpg",
        texture3: "arkana_notebook_t3_md.jpg",
      },
      Agenda: {
        original: "arkana_agenda_original.jpg",
        red: "arkana_agenda_red_md.jpg",
        blue: "arkana_agenda_blue_md.jpg",
        black: "arkana_agenda_black_md.jpg",
        texture1: "arkana_agenda_t1_md.jpg",
        texture2: "arkana_agenda_t2_md.jpg",
        texture3: "arkana_agenda_t3_md.jpg",
      },
    },
    prices: {
      Notebook: {
        original: 1.0,
        red: 1.25,
        blue: 1.25,
        black: 1.25,
        texture1: 2.0,
        texture2: 2.0,
        texture3: 2.0,
      },
      Agenda: {
        original: 1.5,
        red: 1.75,
        blue: 1.75,
        black: 1.75,
        texture1: 2.5,
        texture2: 2.5,
        texture3: 2.5,
      },
    },
    names: {
      Notebook: {
        original: "Cuaderno Original",
        red: "Cuaderno Rojo",
        blue: "Cuaderno Azul",
        black: "Cuaderno Negro",
        texture1: "Cuaderno Carro",
        texture2: "Cuaderno Spiderman",
        texture3: "Cuaderno Chica",
      },
      Agenda: {
        original: "Agenda Original",
        red: "Agenda Roja",
        blue: "Agenda Azul",
        black: "Agenda Negra",
        texture1: "Agenda Carro",
        texture2: "Agenda Spiderman",
        texture3: "Agenda Chica",
      },
    },
  };

  // Función para cargar los datos del carrito desde localStorage al iniciar la página
  function loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      cart.items = storedCart.items;
      updateCart();
    }
  }

  // Función para guardar el carrito en localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Cargar datos del carrito al iniciar la página
  loadCartFromLocalStorage();

  function setProductType(type) {
    selectedProduct.type = type;
    updateProduct();
    updatePrice();
  }

  function selectOption(option) {
    selectedProduct.option = option;
    updateProduct();
    updatePrice();
  }

  function updateProduct() {
    const type = selectedProduct.type;
    const option = selectedProduct.option;
    const imgchange = document.getElementById("imgchange");

    if (!option || option === "original") {
      imgchange.src = selectedProduct.image[type]["original"];
      imgchange.style.backgroundImage = "none";
    } else {
      imgchange.src = selectedProduct.image[type][option];
      imgchange.style.backgroundImage = `url('${selectedProduct.image[type][option]}')`;
    }
  }

  function updatePrice() {
    const type = selectedProduct.type;
    const option = selectedProduct.option;
    const price = selectedProduct.prices[type][option];

    const priceElement = document.getElementById("price");
    priceElement.textContent = `Precio: ${price} USD`;
  }

  function addToCart(product, quantity = 1) {
    const existingProduct = cart.items.find(
      (item) => item.type === product.type && item.option === product.option
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.items.push({ ...product, quantity });
    }

    updateCart();
    updateCartItemCount(); // Llamar a la función para actualizar el número de productos en el carrito
    saveCartToLocalStorage(); // Guardar el carrito en localStorage

    // Display success message using Swal.fire
    Swal.fire({
      icon: "success",
      title: "Agregado",
      timer: 900,
      showConfirmButton: false,
    });
  }

  function updateCart() {
    const cartContainer = document.getElementById("lista-carrito");
    const totalElement = document.getElementById("cartTotal");

    cartContainer.innerHTML = "";
    cart.total = 0;

    cart.items.forEach((item) => {
      const cartRow = document.createElement("tr");

      const itemImage = document.createElement("td");
      const image = document.createElement("img");
      image.src = selectedProduct.image[item.type][item.option];
      image.style.width = "50px"; // Ajustar tamaño de imagen según sea necesario
      itemImage.appendChild(image);
      cartRow.appendChild(itemImage);

      const itemName = document.createElement("td");
      itemName.textContent = selectedProduct.names[item.type][item.option]; // Modificado para usar los nombres correspondientes
      cartRow.appendChild(itemName);

      const itemPrice = document.createElement("td");
      itemPrice.textContent = `${item.price.toFixed(2)} USD`;
      cartRow.appendChild(itemPrice);

      const removeButtonCell = document.createElement("td");
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "btn btn-danger btn-sm";
      removeButton.addEventListener("click", () => removeFromCart(item));
      removeButtonCell.appendChild(removeButton);
      cartRow.appendChild(removeButtonCell);

      cartContainer.appendChild(cartRow);

      cart.total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: ${cart.total.toFixed(2)} USD`;
  }

  function removeFromCart(product) {
    const index = cart.items.findIndex(
      (item) => item.type === product.type && item.option === product.option
    );
    cart.items.splice(index, 1);
    updateCart();
    updateCartItemCount(); // Llamar a la función para actualizar el número de productos en el carrito
    saveCartToLocalStorage(); // Guardar el carrito en localStorage
  }

  function confirmPurchase() {
    if (cart.items.length === 0) {
      // Mostrar mensaje si no hay productos en el carrito
      Swal.fire({
        icon: "warning",
        title: "Carrito Vacío",
        text: "No hay productos agregados al carrito.",
      });
    } else {
      const confirmed = window.confirm("¿Deseas confirmar la compra?");
      if (confirmed) {
        alert("¡Compra realizada con éxito!");
        cart.items = [];
        updateCart();
        updateCartItemCount(); // Llamar a la función para actualizar el número de productos en el carrito
        saveCartToLocalStorage(); // Guardar el carrito en localStorage
      }
    }
  }

  // Event listeners
  let notebookBtn = document.getElementById("notebookBtn");
  let agendaBtn = document.getElementById("agendaBtn");
  let redBtn = document.getElementById("red");
  let blueBtn = document.getElementById("blue");
  let blackBtn = document.getElementById("black");
  let texture1Btn = document.getElementById("texture1");
  let texture2Btn = document.getElementById("texture2");
  let texture3Btn = document.getElementById("texture3");
  let imgchange = document.getElementById("imgchange");
  let addToCartBtn = document.getElementById("addToCartBtn");
  let checkoutBtn = document.getElementById("checkoutBtn");
  let vaciarCarritoBtn = document.getElementById("vaciar-carrito"); // Agregado: Obtener referencia al botón "Vaciar Carrito"
  let procesarPedidoBtn = document.getElementById("procesar-pedido"); // Agregado: Obtener referencia al botón "Procesar Compra"
  let cartItemCount = document.getElementById("cartItemCount"); // Agregado: Obtener referencia al elemento que muestra el número de productos en el carrito

  notebookBtn.addEventListener("click", function () {
    setProductType("Notebook");
  });

  agendaBtn.addEventListener("click", function () {
    setProductType("Agenda");
  });

  redBtn.addEventListener("click", function () {
    selectOption("red");
  });

  blueBtn.addEventListener("click", function () {
    selectOption("blue");
  });

  blackBtn.addEventListener("click", function () {
    selectOption("black");
  });

  texture1Btn.addEventListener("click", function () {
    selectOption("texture1");
  });

  texture2Btn.addEventListener("click", function () {
    selectOption("texture2");
  });

  texture3Btn.addEventListener("click", function () {
    selectOption("texture3");
  });

  addToCartBtn.addEventListener("click", function () {
    const currentProduct = {
      type: selectedProduct.type,
      option: selectedProduct.option,
      price:
        selectedProduct.prices[selectedProduct.type][selectedProduct.option],
      image:
        selectedProduct.image[selectedProduct.type][selectedProduct.option], // Añadir la información de la imagen
    };
    addToCart(currentProduct);
  });

  checkoutBtn.addEventListener("click", function () {
    confirmPurchase();
  });

  vaciarCarritoBtn.addEventListener("click", function () {
    cart.items = [];
    updateCart();
    updateCartItemCount(); // Llamar a la función para actualizar el número de productos en el carrito
    saveCartToLocalStorage(); // Guardar el carrito en localStorage
  });

  procesarPedidoBtn.addEventListener("click", function () {
    if (cart.items.length === 0) {
      // Mostrar mensaje si no hay productos en el carrito
      Swal.fire({
        icon: "warning",
        title: "Carrito Vacío",
        text: "No hay productos agregados al carrito.",
      });
    } else {
      // Si hay productos en el carrito, dirigir al usuario a carrito.html
      window.location.href = "carrito.html";
    }
  });

  // Función para actualizar el número de productos en el carrito
  function updateCartItemCount() {
    const itemCount = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartItemCount.textContent = itemCount; // Actualiza el número mostrado en el icono del carrito
  }

  // Actualizar el carrito al cargar la página
  updateCart();
})(jQuery);
