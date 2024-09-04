(function ($) {
  "use strict";

  const cart = JSON.parse(localStorage.getItem("cart"));

  function displayCartItems() {
    const cartContainer = document.getElementById("lista-compra-body");
    const subtotalElement = document.getElementById("subtotal");
    const igvElement = document.getElementById("igv");
    const totalElement = document.getElementById("total");

    let subtotal = 0;

    // Vaciar el contenido actual de la tabla
    cartContainer.innerHTML = "";

    // Recorrer los elementos del carrito y generar las filas de la tabla
    cart.items.forEach((item) => {
      const cartRow = document.createElement("tr");

      const itemImage = document.createElement("td");
      const image = document.createElement("img");

      // Acceder a la imagen del producto desde el carrito
      image.src = item.image;
      image.style.width = "50px"; // Ajusta el tamaño de la imagen según sea necesario
      itemImage.appendChild(image);
      cartRow.appendChild(itemImage);

      const itemName = document.createElement("td");
      itemName.textContent = `${item.type} - ${item.option}`;
      cartRow.appendChild(itemName);

      const itemPrice = document.createElement("td");
      itemPrice.textContent = `${item.price.toFixed(2)} USD`;
      cartRow.appendChild(itemPrice);

      const itemQuantity = document.createElement("td");
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = item.quantity;
      quantityInput.addEventListener("change", () =>
        updateQuantity(item, quantityInput.value)
      );
      itemQuantity.appendChild(quantityInput);
      cartRow.appendChild(itemQuantity);

      const itemSubtotal = document.createElement("td");
      const subtotalForItem = item.price * item.quantity;
      itemSubtotal.textContent = `${subtotalForItem.toFixed(2)} USD`;
      subtotal += subtotalForItem;
      cartRow.appendChild(itemSubtotal);

      const removeButtonCell = document.createElement("td");
      const removeButton = document.createElement("button");
      removeButton.textContent = "Eliminar";
      removeButton.className = "btn btn-danger btn-sm";
      removeButton.addEventListener("click", () => removeFromCart(item));
      removeButtonCell.appendChild(removeButton);
      cartRow.appendChild(removeButtonCell);

      cartContainer.appendChild(cartRow);
    });

    // Calcular el IGV y el total
    const igv = subtotal * 0.12;
    const total = subtotal + igv;

    // Mostrar los valores calculados en la página
    subtotalElement.textContent = `${subtotal.toFixed(2)} USD`;
    igvElement.textContent = `${igv.toFixed(2)} USD`;
    totalElement.textContent = `${total.toFixed(2)} USD`;
  }

  function removeFromCart(product) {
    const index = cart.items.findIndex(
      (item) => item.type === product.type && item.option === product.option
    );
    cart.items.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el carrito en localStorage
    displayCartItems(); // Mostrar los productos actualizados en el carrito
  }

  function updateQuantity(product, newQuantity) {
    // Verificar si el nuevo valor de cantidad es mayor a cero y menor o igual a 50
    if (parseInt(newQuantity) > 0 && parseInt(newQuantity) <= 50) {
      const index = cart.items.findIndex(
        (item) => item.type === product.type && item.option === product.option
      );
      cart.items[index].quantity = parseInt(newQuantity);
      localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el carrito en localStorage
      displayCartItems(); // Mostrar los productos actualizados en el carrito
    } else {
      // Si se ingresó un valor menor o igual a cero o mayor a 50, establecer la cantidad a 1
      const index = cart.items.findIndex(
        (item) => item.type === product.type && item.option === product.option
      );
      cart.items[index].quantity = 1;
      localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el carrito en localStorage
      displayCartItems(); // Mostrar los productos actualizados en el carrito

      // Mostrar un mensaje de error o realizar otra acción según sea necesario
      alert("La cantidad permitida debe estar entre 1 y 50.");
    }
  }

  // Manejador de evento para el formulario de procesar pago
  $("#procesar-pago").submit(function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    const cliente = $("#cliente").val().trim();
    const correo = $("#correo").val().trim();

    // Verificar si se ingresó el nombre del cliente y el correo
    if (cliente === "" || correo === "") {
      // Mostrar un mensaje de error si no se ingresaron todos los datos
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa el nombre del cliente y el correo antes de confirmar la compra.",
      });
      return; // Salir de la función si no se ingresaron todos los datos
    }

    Swal.fire({
      title: "¿Deseas confirmar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la compra
        localStorage.setItem("cart", JSON.stringify({ items: [] }));
        Swal.fire(
          "Compra confirmada",
          "La compra se ha realizado con éxito.",
          "success"
        ).then(() => {
          location.reload();
        });
      }
    });
  });

  // Mostrar los productos almacenados en el carrito al cargar la página
  displayCartItems();
})(jQuery);
