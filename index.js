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

  let carID = 0;
  let cardId = 0;
  let cars = [];

  function handleSubmit(e) {
    e.preventDefault();

    if (validateFields()) {
      return alert("Por favor preencher todos os campos");
    }

    cars.push({
      id: (carID += 1),
      img: $imgInput.value,
      brand: $brandInput.value,
      model: $modelInput.value,
      year: $yearInput.value,
      board: $boardInput.value,
      color: $colorInput.value,
    });

    populateHTML();
    $form.get()[0].reset();
  }

  function removeCarHandler(event) {
    let element = event.target.parentElement;

    $catalogContainer.removeChild(element);

    let carForRemove = cars.filter((car) => car.id === Number(element.id));

    cars.pop(carForRemove);
  }

  function populateHTML() {
    let $cardCatalog = document.createElement("div");
    let $deleteCardButton = document.createElement("button");

    $deleteCardButton.innerText = "Excluir";

    $cardCatalog.id = cardId += 1;
    $deleteCardButton.addEventListener("click", removeCarHandler);

    cars.forEach((car) => {
      let HTMLTemplate = `
        <div class="box-image">
          <img
            src="${car.img}"
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
            <span>Placa: ${car.board}</span>
            <span>Cor: ${car.color}</span>
          </div>
        </div>
        `;

      $cardCatalog.classList.add("card");
      $cardCatalog.innerHTML = HTMLTemplate;
      $cardCatalog.appendChild($deleteCardButton);

      return $catalogContainer.appendChild($cardCatalog);
    });
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

    return isEmpty;
  }

  getCompanyInfo((err, data) => {
    if (err) {
      throw new Error(err);
    }

    let dataJson = JSON.parse(data);

    $companyName.innerText = dataJson.name;
    $companyPhone.innerText = dataJson.phone;
  });

  $form.on("submit", handleSubmit);
})(window.DOM);
