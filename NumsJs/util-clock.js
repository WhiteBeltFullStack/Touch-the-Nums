'use strict'
var gMiliSeconds = 0
var gSeconds = 0
var gMinutes = 0
var gHours = 0

var gMainDate

 

function calcTimeDiff() {
  var currDate = Date.now()
  var diff = currDate - gMainDate
  //   console.log('diff:', diff)

  var newTime = new Date(diff)
  //   console.log('newTime:', newTime)

  gMiliSeconds = diff % 1000
//   console.log('gMiliSeconds:', gMiliSeconds)

  gHours = newTime.getHours() - 2
  //   console.log('gHours:', gHours)
  gMinutes = newTime.getMinutes()
  //   console.log('gMinutes:', gMinutes)
  gSeconds = newTime.getSeconds()
  //   console.log('gSeconds:', gSeconds)

  var elSeconds = document.querySelector('.seconds')
  var elMinutes = document.querySelector('.minutes')
  var elHours = document.querySelector('.hours')
  var elMiliseconds = document.querySelector('.mili-seconds')

  elSeconds.innerText =formatNumber(gSeconds)+'.'
  elMinutes.innerText =formatNumber(gMinutes)+':'
  elHours.innerText =formatNumber(gHours)+':'
  elMiliseconds.innerText = formatMilliSecs(gMiliSeconds)
}

function formatNumber(number) {
  return number < 10 ? '0' + number : number
}

function formatMilliSecs(number) {
  return number < 10 ? '00' + number : number < 100 ? '0' + number : number;
}
  

