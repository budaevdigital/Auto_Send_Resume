// Задержка, чтоб не вызывать подозрений и чтобы данные успели подгрузиться
function wait(ms) {
  return new Promise((tasks) => setTimeout(tasks, ms));
}

async function start() {
  // Счетчик для цикла
  var countVacancies = 0;
  // Селектор для списка вакансий
  var vacanciesList = document.querySelectorAll(
    '[data-qa="vacancy-serp__vacancy_response"]'
  );
  // Селектор на странице вакансии
  var vacancyPage = document.querySelector(
    '[data-qa="vacancy-response-link-top"]'
  );

  // Функция отправки письма
  function sendCover() {
    // Селектор для выделения заголовка вакансии
    var vacancyTitle = document.querySelector(
      ".bloko-modal-header_outlined > div"
    ).textContent;
    console.log("Вакансия: ", vacancyTitle);
    var vacancyNameResume = vacancyTitle.slice(1, vacancyTitle.length - 1);
    var messageText = `Здравствуйте! Меня заинтересовала ваша вакансия ${vacancyNameResume} и я хотел бы предложить свою кандидатуру.

    Работал с:
    - фреймворками - Django / DRF, FastAPI, Scrapy / BS4;
    - базами данных и ORM - PostgreSQL, SQLite, SQLAlchemy;
    - разное - Docker, Git Actions (CI/CD), Alembic, Pydantic.

    Мне близка сфера работы вашей компании и хотелось бы сделать посильный вклад в ваши проекты.

    Буду с нетерпением ждать ответа и возможности обсудить условия работы и взаимные ожидания на собеседовании.

    Спасибо, что уделили время.`;

    // Показываем поле сопроводительного письма если оно есть
    var messageShow = document.querySelector(
      '[data-qa="vacancy-response-letter-toggle"]'
    );
    if (messageShow) {
      messageShow.click();
    }

    // Вставляем текст в поле
    var messageArea = document.querySelector(
      '[data-qa="vacancy-response-popup-form-letter-input"]'
    );
    messageArea.value = messageText;

    // Применяем изменения поля
    var event = document.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    messageArea.dispatchEvent(event);

    // Жмем кнопку Откликнуться
    var btnSendResume = document.querySelector(
      '[data-qa="vacancy-response-submit-popup"]'
    );
    btnSendResume.click();
    console.log("Резюме отправлено!");
  }

  // Вызываем функцию на странице с вакансией
  if (vacancyPage) {
    vacancyPage.click();
    await wait(3000);
    sendCover();
  }
  // Или вызываем функцию на странице со списком вакансий
  else {
    // В цикле, пока не обработаем весь массив
    while (vacanciesList.length >= countVacancies) {
      // Открываем модальное окно в списке вакансий
      vacanciesList[countVacancies].click();
      await wait(3000);
      sendCover();
      countVacancies++;
      console.log(
        "Вакансия по счёту на странице: ",
        countVacancies,
        " из ",
        vacanciesList.length
      );
      await wait(3000);
    }
  }
}

start();
