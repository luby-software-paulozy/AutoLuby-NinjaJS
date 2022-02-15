(function (DOM) {
  "use strict";

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

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

  let cars = [];

  $form.on("submit", (e) => {
    e.preventDefault();
    let fieldsEmpty = validateFields();

    if (fieldsEmpty) {
      return alert("Por favor preencher todos os campos");
    }

    let car = {
      img: $imgInput.value,
      brand: $brandInput.value,
      model: $modelInput.value,
      year: $yearInput.value,
      board: $boardInput.value,
      color: $colorInput.value,
    };

    cars.push(car);
    populateHTML();

    $form.get()[0].reset();
  });

  function populateHTML() {
    let cardCatalog = document.createElement("div");

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
        </div>`;

      cardCatalog.classList.add("card");
      cardCatalog.innerHTML = HTMLTemplate;
      return $catalogContainer.appendChild(cardCatalog);
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
})(window.DOM);
