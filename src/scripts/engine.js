const emojis = [
  "🦦",
  "🦦",
  "🦝",
  "🦝",
  "🦊",
  "🦊",
  "🌹",
  "🌹",
  "🌷",
  "🌷",
  "🦄",
  "🦄",
  "🐯",
  "🐯",
  "🐰",
  "🐰",
];

let openCards = [];
let matchedCards = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Trocar elementos
  }
  return array;
}

// Embaralha os emojis
let shuffledEmojis = shuffle([...emojis]);

const gameBoard = document.querySelector(".game");
gameBoard.innerHTML = "";
shuffledEmojis.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("item");
  card.innerHTML = emoji;
  card.addEventListener("click", handleCardClick);
  gameBoard.appendChild(card);
});

function handleCardClick() {
  if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  // Quando duas cartas são abertas, verifica se são iguais
  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// Verifica se as cartas abertas fazem par
function checkMatch() {
  const [firstCard, secondCard] = openCards;

  if (firstCard.innerHTML === secondCard.innerHTML) {
    // Se forem iguais, marcar como "match"
    firstCard.classList.add("boxMatch");
    secondCard.classList.add("boxMatch");
    matchedCards++;
  } else {
    // Se não forem iguais, fechar as cartas
    firstCard.classList.remove("boxOpen");
    secondCard.classList.remove("boxOpen");
  }

  openCards = [];

  // Verifica se todas as cartas foram combinadas
  if (matchedCards === emojis.length / 2) {
    setTimeout(() => {
      alert("Você venceu!");
    }, 300);
  }
}

// Função para resetar o jogo
function resetGame() {
  matchedCards = 0;
  openCards = [];
  shuffledEmojis = shuffle([...emojis]);

  // Recriar o tabuleiro
  gameBoard.innerHTML = "";
  shuffledEmojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("item");
    card.innerHTML = emoji;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

document.querySelector(".reset").addEventListener("click", resetGame);
