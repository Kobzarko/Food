import { getResource } from "../services/services";

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

export default cards;
