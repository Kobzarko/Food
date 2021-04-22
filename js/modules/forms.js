import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  //текст по результату
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/form/spinner.svg",
    // loading: 'loading',
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

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
    openModal(".modal", modalTimerId);
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
      closeModal(".modal");
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

export default forms;
