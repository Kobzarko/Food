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

export { postData };
export { getResource };
