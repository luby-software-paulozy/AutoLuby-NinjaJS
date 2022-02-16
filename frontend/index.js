(function (DOM) {
  "use strict";

  let $form = new DOM('[data-js="form"]');
  let $imgInput = new DOM('[data-js="carimg"]').get()[0];
  let $brandInput = new DOM('[data-js="brand"]').get()[0];
  let $modelInput = new DOM('[data-js="model"]').get()[0];
  let $yearInput = new DOM('[data-js="year"]').get()[0];
  let $boardInput = new DOM('[data-js="board"]').get()[0];
  let $colorInput = new DOM('[data-js="color"]').get()[0];
  let $catalogContainer = new DOM('[data-js="catalog"]').get()[0];
  let $companyName = new DOM('[data-js="logo-name"]').get()[0];
  let $companyPhone = new DOM('[data-js="phone"]').get()[0];

  let cardId = 0;
  let carID = 0;

  $form.on("submit", handleSubmit);

  populateHTML();

  function handleSubmit(e) {
    e.preventDefault();
    validateFields();

    let car = `id=${(carID += 1)}&image=${$imgInput.value}&brand=${
      $brandInput.value
    }&model=${$modelInput.value}&year=${$yearInput.value}&plate=${
      $boardInput.value
    }&color=${$colorInput.value}`;

    addCar(car);
    populateHTML();
    $form.get()[0].reset();
  }

  function removeCarHandler(event) {
    getCars((err, data) => {
      if (err) {
        console.log(err);
      }

      let cars = JSON.parse(data);

      let element = event.target.parentElement;
      let carForRemove = cars.filter((car) => car.id === element.id);

      removeCarRequest(carForRemove);
      $catalogContainer.removeChild(element);
    });
  }

  function removeCarRequest(car) {
    let request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      let isRequestOk = request.readyState === 4 && request.status === 200;
      let isRequestNotOk = request.readyState === 4;

      if (isRequestOk) {
        return;
      }

      if (isRequestNotOk) {
        return alert("n foi possivel excluir o carro");
      }
    });

    request.open("DELETE", `http://localhost:3000/car/${car.id}`);
    request.send();
  }

  function populateHTML() {
    getCars((err, data) => {
      if (err) {
        console.log(err);
      }

      let cars = JSON.parse(data);
      console.log(cars);
      cars.forEach((car) => {
        let HTMLTemplate = `
          <div class="box-image">
            <img
              src="${car.image}"
              alt=""
              class="car-image"
            >
          </div>
          <div class="box-info">
            <div class="name-year">
              <span>${car.brand}: ${car.model}</span>
              <span>Ano: ${car.year}</span>
            </div>
            <div class="board-color">
              <span>Placa: ${car.plate}</span>
              <span>Cor: ${car.color}</span>
            </div>
          </div>
          `;

        createCardCar(HTMLTemplate);
      });
    });
  }

  function createCardCar(html) {
    let $cardCatalog = document.createElement("div");
    let $deleteCardButton = document.createElement("button");

    $deleteCardButton.innerText = "Excluir";

    $cardCatalog.id = cardId += 1;
    $deleteCardButton.addEventListener("click", removeCarHandler);

    $cardCatalog.classList.add("card");
    $cardCatalog.innerHTML = html;
    $cardCatalog.appendChild($deleteCardButton);

    return $catalogContainer.appendChild($cardCatalog);
  }

  function getCompanyInfo(callback) {
    let request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      let isRequestOk = request.readyState === 4 && request.status === 200;
      let isRequestNotOk = request.readyState === 4;

      if (isRequestOk) {
        return callback(null, request.responseText);
      }

      if (isRequestNotOk) {
        return callback("n foi possivel obter os dados", null);
      }
    });

    request.open("GET", "./company.json", true);
    request.send();
  }

  function validateFields() {
    let isEmpty =
      $imgInput.value === "" ||
      $brandInput.value === "" ||
      $modelInput.value === "" ||
      $yearInput.value === "" ||
      $boardInput.value === "" ||
      $colorInput.value === "";

    if (!isEmpty) {
      return;
    }

    return alert("Por favor preencha todos os campos");
  }

  function getCars(callback) {
    let request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      let isRequestOk = request.readyState === 4 && request.status === 200;
      let isRequestNotOk = request.readyState === 4;

      if (isRequestOk) {
        return callback(null, request.responseText);
      }

      if (isRequestNotOk) {
        return callback("errinho", null);
      }
    });

    request.open("GET", "http://localhost:3000/car", true);
    request.send();
  }

  function addCar(carObj) {
    let request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      let isRequestOk = request.readyState === 4 && request.status === 200;
      let isRequestNotOk = request.readyState === 4;

      if (isRequestOk) {
        return;
      }

      if (isRequestNotOk) {
        return alert("n foi possivel enviar os dados");
      }
    });

    request.open("POST", "http://localhost:3000/car");
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send(carObj);
  }

  getCompanyInfo((err, data) => {
    if (err) {
      throw new Error(err);
    }

    let dataJson = JSON.parse(data);

    $companyName.innerText = dataJson.name;
    $companyPhone.innerText = dataJson.phone;
  });
})(window.DOM);
