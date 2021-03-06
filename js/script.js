require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

//* Tabs
import tabs from "./modules/tabs";
//* MODAL
import modal from "./modules/modal";
//*TIMER
import timer from "./modules/timer";
//* CLASSES
import cards from "./modules/cards";
//*FORMS
import forms from "./modules/forms";
//*SLIDER
import slider from "./modules/slider";
//* CALCULATING
import calc from "./modules/calc";
//* COOKIES
import cookieConsent from "./modules/cookieConsent";
//* import function
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", function () {
  // don't forget json-server db.json

  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    300000
  );
  // вызов функций
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalTimerId);
  timer(".timer", "2021,05,01");
  cards();
  calc();
  forms("form", modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  cookieConsent();
});
