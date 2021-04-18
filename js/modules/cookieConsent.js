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
