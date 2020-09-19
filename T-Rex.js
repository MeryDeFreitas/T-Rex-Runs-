document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino')
  const grid = document.querySelector('.grid')
  const alert = document.getElementById('alert')
  let isJumping = false
  let gravity = 0.9
  let gameOver = false
  
  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        //Cuando presione tecla 32 el dinosaurio salta
        isJumping = true
        jump()
      }
    }
  }

  document.addEventListener('keyup', control)
  
  let position = 0

  function jump() {

    let count = 0
    let timerId = setInterval(function () {
      //move down
      if (count ===15) {
        clearInterval(timerId) //Cancela el setInterval anterior, evita que siga subiendo el dinosaurio
        let downTimerId = setInterval(function () { //Para que el dinosaurio no se quede arriba y pueda bajar
          if (count === 0) { //Para evitar que el dinosaurio baje por debajo del suelo se detiene el setInterval de downTimerId cuando llega a 0
            clearInterval(downTimerId)
            isJumping = false //para que puedas volver a presionar la recla 32 y ejecutar la funcion
          }
          position -= 5
          count--
          position = position * gravity
          dino.style.bottom = position + 'px'
        },20)
      }
      //move up
      position +=30
      count++
      position = position * gravity
      dino.style.bottom = position + 'px'
    },20)
  }

  //Generar obstaculos
  function generateObstacles(){
    let randomTime = Math.random() * 4000
    //Crear el obstaculo
    let obstaclePosition = 1000 //Distancia con el dinosaurio
    const obstacle = document.createElement('div')
    if(!gameOver){
      //Si perdemos no se genera mas obstaculos
      obstacle.classList.add('obstacle')
      grid.appendChild(obstacle)
      obstacle.style.left = obstaclePosition + 'px'

    }

    //Hacer que se muevan los obstaculos
    let timerID = setInterval(function(){
      if(obstaclePosition >0 && obstaclePosition <60 && position <60){
        clearInterval(timerID)
        alert.innerHTML = 'Game Over'
        gameOver = true
        //remove all children
        while(grid.firstChild){
          grid.removeChild(grid.lastChild)
        }
      }
      obstaclePosition -=10
      obstacle.style.left = obstaclePosition + 'px'
    },20)
    if(!gameOver){
      setTimeout(generateObstacles, randomTime)
    }
  }
  generateObstacles()
})