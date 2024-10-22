'use strict'
var gBoard
var gClickedNum = 1
var gDifficulty = 4
var gIntervalHandle
var gStartGame = false

function onInit() {
  clearInterval(gIntervalHandle)
  renderBoard(gDifficulty)
}

function onClickLevel(elLevel) {
  var difficulty = elLevel.getAttribute(['data-level'])
  gClickedNum = 1
  gDifficulty = +difficulty

  renderBoard(difficulty)
  onInit()
}

function shuffleLevel(difficultySize) {
  var storageNums = []
  //press on the num save the num on the spot
}

function renderBoard(size = 4) {
  var gameSize = size * size
  var randNums = []
  for (var i = 0; i < gameSize; i++) {
    randNums.push(i + 1)
  }

  var strHtml = ''
  for (var i = 0; i < size; i++) {
    strHtml += `\n<tr>`
    for (let j = 0; j < size; j++) {
      var randIdx = getRandomInt(0, randNums.length)
      strHtml += `<td onclick="onCellClicked(this,${randNums[randIdx]})">${randNums[randIdx]}</td>`
      randNums.splice(randIdx, 1)
    }
    strHtml += `</tr>`
  }
  const elGame = document.querySelector('.game table')
  elGame.innerHTML = strHtml
}

function onCellClicked(elCell, clickedNum) {
  var elSadSpan = document.querySelector('.sad')
  var elHappySpan = document.querySelector('.happy')

  if (gClickedNum === 1) {
    gMainDate = Date.now()
    gIntervalHandle = setInterval(calcTimeDiff, 31)
  }

  if (clickedNum === gClickedNum) {
    elCell.classList.add('clicked')
    var correctAudio = new Audio('sounds/correct.mp3')
    correctAudio.play()

    if (elHappySpan) {
      elHappySpan.classList.remove('happy')
      setTimeout(() => {
        elHappySpan.classList.add('happy')
      }, 1000)
    }

    winTheGame()
    nextNumGuider()
    gClickedNum++
  } else {
    var wrongAudio = new Audio('sounds/wrong.mp3')
    wrongAudio.play()
    if (elSadSpan) {
      elSadSpan.classList.remove('sad')
      setTimeout(() => {
        elSadSpan.classList.add('sad')
      }, 1000)
    }
    return
  }
}

function nextNumGuider() {
  var elNextNumSpan = document.querySelector('.next-num')
  if (gClickedNum + 1 > gDifficulty * gDifficulty) {
    elNextNumSpan.innerText = 'You Won!'
    clearInterval(gIntervalHandle)
    gMainDate = Date.now()
    return
  }
  elNextNumSpan.innerText = +gClickedNum + 1
}

function newGame() {
  gClickedNum = 1
  clearInterval(gIntervalHandle)
  gMainDate = Date.now()
  onInit()
}

function winTheGame() {
  var lastNumber = gDifficulty * gDifficulty
  if (lastNumber === gClickedNum) {
    var winSound = new Audio('sounds/success.mp3')
    winSound.play()
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}
