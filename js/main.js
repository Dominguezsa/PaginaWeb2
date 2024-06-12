let app = document.getElementById('typewriter');

let typewriter = new Typewriter(app, {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(1500)
  .typeString('Conta la historia que te marcó')
  .pauseFor(500)
  .deleteChars(10)
  .start();

document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleButton');
  var navbarCollapse = document.getElementById('navbarSupportedContent');
  var navLinks = navbarCollapse.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse.classList.contains('show')) {
        toggleButton.click();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
  const question = faq.querySelector(".question");
  const answer = faq.querySelector(".answer");

  question.addEventListener("click", () => {
    if (faq.classList.contains("active")) {
      faq.classList.remove("active");
      answer.style.maxHeight = null;
    } else {
      faqs.forEach(otherFaq => {
        if (otherFaq.classList.contains("active")) {
          otherFaq.classList.remove("active");
          otherFaq.querySelector(".answer").style.maxHeight = null;
        }
      });

      faq.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

const inputs = document.querySelectorAll(".input2");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


let cartContent = JSON.parse(localStorage.getItem('cartContent')) || {}; // contenidoCarrito

// Calculate cartCount as the sum of the quantities of all products in the cart
let cartCount = Object.values(cartContent).reduce((total, product) => total + product.quantity, 0);

// Update cartCount in the UI
document.querySelector('.texto-carrito').textContent = cartCount;

document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    let productId = button.dataset.productId; // assuming each button has a data-product-id attribute
    let product = {
      id: productId,
      image: button.dataset.image, // assuming each button has a data-image attribute
      price: button.dataset.price, // assuming each button has a data-price attribute
      // add more attributes as needed
    };
    if (cartContent[productId]) {
      cartContent[productId].quantity++;
    } else {
      product.quantity = 1;
      cartContent[productId] = product;
    }

    // Recalculate cartCount and update it in the UI
    cartCount = Object.values(cartContent).reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.texto-carrito').textContent = cartCount;

    // Save cartContent to localStorage
    localStorage.setItem('cartContent', JSON.stringify(cartContent));
  });
});