/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", sex);
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", ratio);
  }

  // изменяет класс активности элемента относительно данных в localstorage
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      //если элемент содержит атрибут id который равен значению из localStorage
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        // добавить класс активности элемента
        elem.classList.add(activeClass);
      }
      //если элемент содержит атрибут data-ratio который равен значению из localStorage
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        // добавить класс активности элемента
        elem.classList.add(activeClass);
      }
    });
  }
  // вызов initLocalSettings
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // изменяет данные каждый раз когда меняется значение в каком то поле
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "0";
      return;
    }
    // рассчет каллорий
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInfo(selector, activeClass) {
    // получить все дивы элемента в элементе document.querySelectorAll(`${selector} div`);
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        // если элемент содержит дата-ratio то взять с него значение для коффициента ratio
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          //запись данных в localStorage
          localStorage.setItem("ratio", ratio);
        } else {
          sex = e.target.getAttribute("id");
          //запись данных в localStorage
          if (sex) {
            localStorage.setItem("sex", sex);
          }
        }

        console.log(ratio, sex);

        // убираем класс активности для всех элементов
        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });
        // и добаляем только нужному элементу
        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // обрабатывает каждый отдельный инпут
  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);
    // запись данных в определенную переменную
    input.addEventListener("input", () => {
      //проверка валидности входящих данных
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
  //test
  // npm i json-server --save-dev
  // npm i
  // json-server db.json
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 28;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
          <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          </div>
          `;
      this.parent.append(element);
    }
  }

  // GET запрос для получения данных из db.json
  const getResource = async (url) => {
    const res = await fetch(url);
    // .ok - состояние запроса
    if (!res.ok) {
      // выбросить ошибку
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    // вернуть результат
    return await res.json();
  };

  // вызов для получения данных из бд используем класс
  getResource("http://localhost:3000/menu").then((data) => {
    //вытягиваем данные через деструктуризацию объекта по частям
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // axios library using
  // axios.get("http://localhost:3000/menu").then((data) => {
  //   data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // //альтернативный вариант без класса для одной карточки
  // getResource("http://localhost:3000/menu").then((data) => createCard(data));
  // // создать елемент на странице без класса
  // function createCard(data) {
  //   //перебираем полученный объект из бд
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     // создаем новый элемент контейнер для нашей карточки
  //     const element = document.createElement("div");
  //     // корректируем цену по курсу
  //     price = price * 28;
  //     //добавляем класс
  //     element.classList.add("menu__item");
  //     // формируем верстку
  //     element.innerHTML = `
  //   <div class="menu__item">
  //     <img src=${img} alt=${altimg}>
  //     <h3 class="menu__item-subtitle">${title}</h3>
  //     <div class="menu__item-descr">${descr}</div>
  //     <div class="menu__item-divider"></div>
  //     <div class="menu__item-price">
  //       <div class="menu__item-cost">Цена:</div>
  //       <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //     </div>
  //   </div>
  //   `;
  //     // добавить элемент в общую верстку в нужное место
  //     document.querySelector(".menu .container").append(element);
  //   });
  // }
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/cookieConsent.js":
/*!*************************************!*\
  !*** ./js/modules/cookieConsent.js ***!
  \*************************************/
/***/ ((module) => {

function cookieConsent() {
  //   const cookieStorage = {
  //     getItem: (key) => {
  //       const cookies = document.cookie.split(";").map(cookie.split("=")).reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
  //       return cookies[key];
  //     },
  //     setItem: (key, value) => {
  //       document.cookie = `${key}=${value}; expires=Sun, 05 Jul 3567 06:23:43 GMT`;
  //     },
  //   };
  //   const storageType = localStorage;
  const storageType = localStorage;
  const consentPropertyType = "site_consent";

  // получаем либо true либо false
  // true не показывать окно
  // false показать окно
  const hasConsented = () =>
    storageType.getItem(consentPropertyType) === "true" ? true : false;

  // сохраняем согласие пользователя если true
  const toggleStorage = (prop) =>
    storageType.setItem(consentPropertyType, prop);

  const popup = document.querySelector(".popup"),
    btnConfirm = document.querySelector("[data-confirm]"),
    btnCancel = document.querySelector("[data-cancel]");

  if (hasConsented()) {
    // есть согласие получи метрики
    console.log("Loading...");
  } else {
    // нет согласия получи модальное окно
    popup.classList.add("popup_active");
  }

  btnConfirm.addEventListener("click", () => {
    toggleStorage(true);
    popup.classList.remove("popup_active");
    console.log("Loading...");
  });

  btnCancel.addEventListener("click", () => {
    toggleStorage(false);
    popup.classList.remove("popup_active");
    console.log("Canceled");
  });
}

module.exports = cookieConsent;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
  //текст по результату
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    // loading: 'loading',
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

  // data данные которые будут поститься в этой функции
  const postData = async (url, data) => {
    // начинаем запрос
    // await ждет результат запроса
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    // возвращаем промис
    return await res.json();
  };

  function bindpostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      // напрямую обращаемся к атрибуту
      statusMessage.src = message.loading;
      // добавляем стили нашему img
      statusMessage.style.cssText = `
           display: block;
           margin: 0 auto;
         `;
      // form.appendChild(statusMessage);

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      // formData.entries возвращает массив собственных перечисляемых свойств
      // Object.fromEntries() преобразует список пар ключ-значение в объект.
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // // перебрать formdata в объект
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });
      // трансформация данных на этапе создания промиса
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  // функция заменяет одно окно другим ,а потом возвращает предыдущее окно
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();
    // создать элемент
    const thanksModal = document.createElement("div");
    // добавить класс элементу, класс старого окна
    thanksModal.classList.add("modal__dialog");
    // создать окно
    thanksModal.innerHTML = `
           <div class="modal__content">
               <div class="modal__close" data-close>&times</div>
               <div class="modal__title">${message}</div>
           </div>
       `;
    // блоку modal добавить новое окно
    document.querySelector(".modal").append(thanksModal);
    // удалить новое окно через 4 сек
    setTimeout(() => {
      thanksModal.remove();
      // показываем старое окно
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      // прячем блок .modal со старым окном
      closeModal();
    }, 4000);
  }

  // FETCH

  // db.json

  // fetch("http://localhost:3000/menu")
  //   .then((data) => data.json)
  //   .then((res) => console.log(res));

  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POST",
  //   body: JSON.stringify({ name: "Alex" }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 10
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
  //! TIMER

  const deadline = "2021,04,01";

  const promotionDescr = document.querySelector(".promotion__descr"),
    spanDate = promotionDescr.querySelector(".spanDate");

  // установить дату конца акции
  function setDateSaleEnd(deadline, spanDate) {
    let date = new Date(deadline);
    let day = new Intl.DateTimeFormat("ru", {
      month: "long",
      day: "numeric",
    });
    let time = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric",
    });

    spanDate.textContent = `${day.format(date)} в ${time.format(date)}`;
    // console.log(day.format(date));
    // console.log(time.format(date));
    // console.log(date);
  }

  setDateSaleEnd(deadline, spanDate);

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        days.textContent = "00";
      }
    }
  }

  setClock(".timer", deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", function () {
  //! Tabs
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");

  //! MODAL
  const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");

  //*TIMER
  const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

  //* CLASSES
  const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

  //*FORMS
  const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");

  //*SLIDER
  const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

  //* CALCULATING
  const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

  //* COOKIES
  const cookieConsent = __webpack_require__(/*! ./modules/cookieConsent */ "./js/modules/cookieConsent.js");

  // вызов функций

  tabs();
  modal();
  timer();
  cards();
  calc();
  forms();
  slider();
  cookieConsent();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map