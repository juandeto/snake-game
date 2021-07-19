const squares = document.querySelectorAll(".grid div")
const scoreDisplay = document.querySelector(".score")
const startBtn = document.querySelector("button")

const width = 10;
let appleIndex = 0
let currentSnake = [2,1,0]
let direction = 1
let score = 0
let speed = 0.8
let intervalTime = 0
let interval = 0



// function q se dispara cuando comienza el juego
function startGame() {
    //reseteas variables
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    //seteas un intervalo de tiempo para q la funcion movementSnake
    //se ejecute cada cierto intervalo de tiempo
    interval = setInterval(movementSnake, intervalTime)
  }



//moivmiento de la serpiente
function movementSnake() {
    //cuando se choca contra si misma
    if(squares[currentSnake[0] + direction] &&
        squares[currentSnake[0] + direction].classList.contains('snake')){
            return clearInterval(interval)
        }

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    let newSquare;

    //decide donde se agrega el proximo cuadrado: la cabeza del array
    if(//cuando choca contra la pared derecha
        ((currentSnake[0]+1) % width === 0) && (direction === 1)
    ){
        newSquare = ((currentSnake[0] - width +1))
    }else if(//cuando choca contra la izquierda
        (currentSnake[0] % (width) === 0) && (direction === -1) &&
        currentSnake[0] === 0
    ) { 
        newSquare = ((currentSnake[0] + width-1))
    }else if(//cuando choca contra el tope
        (currentSnake[0] + direction  < 0) &&
        (direction === -width)
    ){
        newSquare =  (currentSnake[0] + squares.length - width)
    }else if(//cuando choca contra abajo
        (currentSnake[0] + direction  >= squares.length)&&
        (direction === width) 
    ){
        newSquare =  (currentSnake[0] - squares.length + width)
    }else{//si no choca...
          newSquare =  (currentSnake[0]  + direction)
    } 
    
    currentSnake.unshift(newSquare)
  
        
  //deals with snake getting apple
  if(squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    randomApple()
    score++
    scoreDisplay.textContent = score * 100
    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(moveOutcomes, intervalTime)
  }
  squares[currentSnake[0]].classList.add('snake')

}

//genera nueva manzana cuando es comida
function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
      squares[appleIndex].classList.add('apple')
    }

//direccion de la serpiente
function control(e) {

    switch (e.keyCode) {
        case 39: // a la derecha
            direction = 1
            break;
        case 38: //hacia arriba
            direction = -width
            break;
        case 40: //hacia abajo
            direction= width
            break;
        case 37: // a la izquierda
            direction = -1
            break;
        default:
            break;
    }
}

document.addEventListener("keyup", control)
startBtn.addEventListener('click', startGame)