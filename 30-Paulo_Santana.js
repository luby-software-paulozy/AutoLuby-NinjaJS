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

  let cars = [];

  function handleSubmit(e) {
    e.preventDefault();
    let fieldsEmpty = validateFields();

    if (fieldsEmpty) {
      return alert("Por favor preencher todos os campos");
    }

    cars.push({
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

  $form.on("submit", handleSubmit);

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

  /*
A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
projeto mesmo.
Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.
Na hora de criar, o GitHub te dá a opção de criar o repositório com um
README. Use essa opção.
Após criar o repositório, clone ele na sua máquina.
Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
desafio da aula anterior para esse novo repositório, nessa branch
`challenge-30`.
Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
O conteúdeo desse arquivo deve ser somente as duas linhas abaixo:
node_modules
npm-debug.log
Faça as melhorias que você achar que são necessárias no seu código, removendo
duplicações, deixando-o o mais legível possível, e então suba essa alteração
para o repositório do seu projeto.
Envie um pull request da branch `challenge-30` para a `master` e cole aqui
nesse arquivo, dentro do `console.log`, o link para o pull request no seu
projeto.
*/

  console.log("Link do pull request do seu projeto:");
  console.log(
    "https://github.com/paulozy/AutoLuby-NinjaJS/commit/9a2cd5d694e01717975b8d836da633c61bc85080"
  );
})(window.DOM);
