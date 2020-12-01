const listElement = document.querySelector('.card-list'); // pega o primeiro que aparece
const resetButton = document.querySelector('#reset-button');

function createCardsTemplate(logoList) {
  // recebe lista de logos tipo angular vue ...
  return logoList
    .map(
      (logo) => `
        <li class="flipper-container" >
            <div class="flipper" >
                <div class="flipper-face front" >
                    <img src="img/antunes.png" class="card-logo antunes" >
                </div>
                <div class="flipper-face back" >
                    <img src="" class="card-logo" >
                </div>
            </div>
        </li>
    `
    )
    .join(''); // o join server pra ele nao junta com , tipo </li>,<li>
}

export const TemplateService = {
  setCardList(logoList) {
    listElement.innerHTML = createCardsTemplate(logoList);
  },
  show(index, logo) {
    const flipperElement = listElement.querySelector(
      `li:nth-child(${index + 1}) .flipper` // pega o .flipper do li onde é passado index (do array de imgs/cartas)
    );
    flipperElement.querySelector('.back .card-logo').src = `img/${logo}.svg`;
    flipperElement.classList.add('show'); // add o show para virar
  },
  hide(index) {
    // faz o inverso do show
    const flipperElement = listElement.querySelector(
      `li:nth-child(${index + 1}) .flipper`
    );
    flipperElement.classList.remove('show');
    flipperElement.querySelector('.back .card-logo').src = '';
  },
  showResetButton() {
    resetButton.classList.remove('hidden');
  },
  hideResetButton() {
    resetButton.classList.add('hidden');
  },
};
