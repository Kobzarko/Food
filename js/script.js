window.addEventListener("DOMContentLoaded", function () {
  //! Tabs
  const tabs = require("./modules/tabs");

  //! MODAL
  const modal = require("./modules/modal");

  //*TIMER
  const timer = require("./modules/timer");

  //* CLASSES
  const cards = require("./modules/cards");

  //*FORMS
  const forms = require("./modules/forms");

  //*SLIDER
  const slider = require("./modules/slider");

  //* CALCULATING
  const calc = require("./modules/calc");

  //* COOKIES
  const cookieConsent = require("./modules/cookieConsent");

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
