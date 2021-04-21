function slider() {
  const prev = document.querySelector(".offer__slider-prev"),
    slider = document.querySelector(".offer__slider"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    slides = document.querySelectorAll(".offer__slide"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  //Window.getComputedStyle()  возвращает объект, содержащий значения всех CSS-свойств элемента,
  //полученных после применения всех активных таблиц стилей
  let slideIndex = 1;
  // на сколько отступили вправо или влево
  let offset = 0;

  // нумерация
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  // установить ширину этому блоку
  slidesField.style.width = 100 * slides.length + "%";

  // ограничить показ слайдов до одного
  slidesWrapper.style.overflow = "hidden";

  // разместить слайды горизонтально
  slidesField.style.display = "flex";
  // сместить за полсекунды
  slidesField.style.transition = "0.5s all";

  // каждому слайду устанавливаем одинаковую ширину
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  // убираем абсолютное позиционирование у элементов внутри слайдера
  slider.style.position = "relative";

  // создать обертку для точек
  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  // добавляем в слайдер
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .4;
    transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function addZero() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  // назначаем прозрачность актуальной точке
  function setOpacity() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  //убрать все не цифры
  function delNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", function () {
    // если наш отступ равен ширине одного слайда умноженного на кол. слайдов - 1
    // установить отступ в ноль
    // долистали до самого конца и надо вернуться в самое начало
    //  +width.slice(0, width.length - 2) получить число из ширины
    // width.replace(/\D/g, "") удалить все не числа из строки
    if (offset == delNotDigits(width) * (slides.length - 1)) {
      //width => 500px
      console.log(width.length);
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    //смещаем наш блок по горизинтали
    slidesField.style.transform = `translateX(-${offset}px)`;

    //контролируем slideIndex дошли до конца =1
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    // добавить ноль
    addZero();
    // if (slides.length < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }
    // назначаем прозрачность актуальной точке
    setOpacity();
    // dots.forEach((dot) => (dot.style.opacity = ".5"));
    // dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", function () {
    if (offset == 0) {
      //width => 500px
      offset = delNotDigits(width) * (slides.length - 1);
    } else {
      //если не последний слайд листаем влево
      offset -= +width.slice(0, width.length - 2);
    }
    //смещаем наш блок
    slidesField.style.transform = `translateX(-${offset}px)`;

    //контролируем slideIndex дошли до конца =1
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    // добавить ноль
    addZero();
    // if (slides.length < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }
    // назначаем прозрачность актуальной точке
    setOpacity();
    // dots.forEach((dot) => (dot.style.opacity = ".5"));
    // dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = delNotDigits(width) * (slideTo - 1);
      //смещаем наш блок
      slidesField.style.transform = `translateX(-${offset}px)`;

      // добавить ноль
      addZero();
      // if (slides.length < 10) {
      //   current.textContent = `0${slideIndex}`;
      // } else {
      //   current.textContent = slideIndex;
      // }

      setOpacity();
      // dots.forEach((dot) => (dot.style.opacity = ".5"));
      // dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

export default slider;
