import { TemplateService } from './services/TemplateService.js';

let isGameRunning = false;
let canSelect = false;
let selectedCards = [];
let cardList = [];
let score = 0;

function startLogoList(logoList) {
  return logoList
    .flatMap((name) => [name, name]) // duplica os nomes e nao deixa array dentro de array
    .map((name) => ({ name, position: Math.random() })) // embaralha
    .sort((a, b) => a.position - b.position) // ordena aleatoriamente a ordem
    .map((item, index) => ({
      // converte em um objeto mais legivel
      name: item.name,
      index,
      canSelect: true, // nao deixa selecionar
    }));
}

function gameOver() {
  isGameRunning = false;
  TemplateService.showResetButton();
}

export const Game = {
  start(logoList) {
    isGameRunning = true;
    canSelect = true;
    selectedCards = [];
    cardList = startLogoList(logoList);
    score = 0;
    TemplateService.setCardList(cardList.map((card) => card.name)); // pega so o nome sem .svg
    TemplateService.hideResetButton();
  },
  selectCard(cardIndex) {
    // logica de selecionar
    if (isGameRunning && canSelect && cardList[cardIndex].canSelect) {
      // o ultimo && é para ver se ele nao ja virou
      if (selectedCards.length < 2) {
        // ve se ja nao selecionou 2 cartas
        selectedCards.push(cardList[cardIndex]); // aumenta a quantidade de carta selecionada
        TemplateService.show(cardIndex, cardList[cardIndex].name); // insere o logo ao virar
        cardList[cardIndex].canSelect = false; // nao deixa selecionar 2 vezes
      }
      if (selectedCards.length === 2) {
        canSelect = false;
        const [first, second] = selectedCards;
        if (first.name === second.name) {
          canSelect = true;
          selectedCards = []; // reseta o num de cartas selecionadas
          score += 2;
        } else {
          // esconde as cartas
          setTimeout(() => {
            selectedCards.forEach((item) => {
              // esconde as cartas do array de cartas selecionadas
              TemplateService.hide(item.index);
            });
            setTimeout(() => {
              selectedCards = [];
              canSelect = true;
              first.canSelect = true;
              second.canSelect = true;
            }, 1000);
          }, 1500);
        }

        if (score === cardList.length) {
          gameOver();
        }
      }
    }
  },
};
