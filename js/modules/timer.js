function timer(id, deadline) {
  //! TIMER
  // const deadline = "2021,04,01";

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

  setClock(id, deadline);
}

export default timer;
