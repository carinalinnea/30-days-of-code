const WINNING_COMBINATIONS = [
  // börjar med 0
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const CLASS_X = 'x'
const CLASS_CIRCLE = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    // ta bort alla classer och event
    cell.classList.remove(CLASS_X)
    cell.classList.remove(CLASS_CIRCLE)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()

  // ta bort meddelandet om resultat
  winningMessage.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CLASS_CIRCLE : CLASS_X
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    console.log('winnare!')
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Oavgjort!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Har vunnit!`
  }
  winningMessage.classList.add('show')
}

// oavgjort
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(CLASS_X) || cell.classList.contains(CLASS_CIRCLE)
  })
}

// placera markering
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}


// byt från x till 0
function swapTurns() {
  circleTurn = !circleTurn
}

// hovra över med aktuell tur, börjar med x
function setBoardHoverClass() {
  board.classList.remove(CLASS_X)
  board.classList.remove(CLASS_CIRCLE)
  if (circleTurn) {
    board.classList.add(CLASS_CIRCLE)
  } else {
    board.classList.add(CLASS_X)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}