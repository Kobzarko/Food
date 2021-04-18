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
