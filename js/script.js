//! Tabs
import tabs from "./modules/tabs";

//! MODAL
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
  tabs();
  modal("[data-modal]", ".modal", modalTimerId);
  timer();
  cards();
  calc();
  forms(modalTimerId);
  slider();
  cookieConsent();
});
