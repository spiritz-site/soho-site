document.addEventListener("DOMContentLoaded", function() {
  var menuBtns = document.querySelectorAll(".menu-btn");
  var sliders = document.querySelectorAll(".slides");
  var pagination = document.querySelector(".pagination");

  // отдельный индекс для каждого слайдера
  var slideIndexes = {};
  sliders.forEach(function(slider) {
    slideIndexes[slider.id] = 0;
  });

  function showSlide(slider) {
    var slides = slider.querySelectorAll(".slide");
    var index = slideIndexes[slider.id];

    // защита от ухода за пределы
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    slideIndexes[slider.id] = index;

    slides.forEach(function(s){ s.classList.remove("active"); });
    slides[index].classList.add("active");

    pagination.textContent = (index + 1) + "/" + slides.length;
  }

  // кнопки меню (категории)
  menuBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      menuBtns.forEach(b=>b.classList.remove("active"));
      this.classList.add("active");

      sliders.forEach(s => s.classList.remove("active"));

      var slider = document.getElementById(this.getAttribute("data-slider"));
      slider.classList.add("active");

      // при смене категории — всегда на первый кадр
      slideIndexes[slider.id] = 0;

      showSlide(slider);
    });
  });

  // стрелка вперёд
  document.querySelector(".next").addEventListener("click", function(){
    var slider = document.querySelector(".slides.active");
    var slides = slider.querySelectorAll(".slide");
    var id = slider.id;

    if (slideIndexes[id] < slides.length - 1) {
      slideIndexes[id]++;
    }

    showSlide(slider);
  });

  // стрелка назад
  document.querySelector(".prev").addEventListener("click", function(){
    var slider = document.querySelector(".slides.active");
    var id = slider.id;

    if (slideIndexes[id] > 0) {
      slideIndexes[id]--;
    }

    showSlide(slider);
  });

  // запуск
  showSlide(document.querySelector(".slides.active"));
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  function checkVisible() {
    const trigger = window.innerHeight * 0.8;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisible);
  checkVisible();
});
