window.addEventListener('DOMContentLoaded', function(){

  //! Tabs

  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent(){

    tabsContent.forEach(item=>{
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item=>{
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i=0){
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function(event){
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')){
      tabs.forEach((item, i)=> {
        if(target == item){
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });


  //! TIMER

  const deadline = '2021,04,01';

  const promotionDescr = document.querySelector('.promotion__descr'),
  spanDate = promotionDescr.querySelector('.spanDate');

  // установить дату конца акции
  function setDateSaleEnd(deadline, spanDate) {

    let date = new Date(deadline);
    let day = new Intl.DateTimeFormat("ru", {
      month: "long",
      day: "numeric"
    });
    let time = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric"
    });

    spanDate.textContent = `${day.format(date)} в ${time.format(date)}`;
    // console.log(day.format(date));
    // console.log(time.format(date));
    // console.log(date);
  }

  setDateSaleEnd(deadline, spanDate);


  function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor( (t/(1000*60*60*24)) ),
      seconds = Math.floor( (t/1000) % 60 ),
      minutes = Math.floor( (t/1000/60) % 60 ),
      hours = Math.floor( (t/(1000*60*60) % 24 ));

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
  }

  function getZero(num){
    if(num >= 0 && num < 10){
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime){

    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock, 1000);
  

    updateClock();

    function updateClock(){
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if(t.total <= 0){
        clearInterval(timeInterval);
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        days.textContent = "00";
      }
    }
  }

  setClock('.timer', deadline);

  //! MODAL

  const modalTrigger = document.querySelectorAll('[data-modal]'),
  modal = document.querySelector('.modal');

modalTrigger.forEach(btn => {
  btn.addEventListener('click', openModal);
});

function closeModal() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape" && modal.classList.contains('show')) { 
      closeModal();
  }
});

const modalTimerId = setTimeout(openModal, 300000);
// Изменил значение, чтобы не отвлекало

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
  }
}
window.addEventListener('scroll', showModalByScroll);


  //* CLASSES

  class MenuCard {
    constructor(src,alt,title,descr,price,parentSelector){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 28;
      this.changeToUAH(); 
    }

    changeToUAH(){
      this.price = this.price*this.transfer;
    }

    render(){
      const element = document.createElement('div');
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

  new MenuCard(
    "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
  ).render();

    //*FORMS
    //текст по результатуё
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
 

});


