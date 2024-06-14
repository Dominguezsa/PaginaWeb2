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


let isDown = false;
let startX;
let scrollLeft;

const slider = document.querySelector('.testimonialsContainer');

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 0.5; //scroll-slow
  slider.scrollLeft = scrollLeft - walk;
});