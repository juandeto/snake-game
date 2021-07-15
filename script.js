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



// startGame
function startGame() {
    //reseteamos las variables
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    clearInterval(interval)
    score = 0
    //randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000 //ms

    //vuelvo al principio
    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.add('snake'))
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

    if(//cuando choca contra la derecha
        ((currentSnake[0]+1 % width === 0) && direction === 1)
    ){
        newSquare = currentSnake[0] - width + 1
    }else if( //cuando choca contra la izquierda
        ((currentSnake[0]+1 % width === 0) && direction === -1)
    ){
        newSquare = currentSnake[0] + width - 1
    }else if( // cuando choca contra arriba
        (currentSnake[0] - direction < 0) &&
        direction === -width
    ){
        newSquare = currentSnake[0] + squares.length - width
    }else if(//cuando choca contra abajo
        (currentSnake[0] + direction >= squares.length + width) &&
        direction === width
    ){
        newSquare = currentSnake[0] - squares.length + width
    }else{
        newSquare = currentSnake[0] + direction
    }

    currentSnake.unshift(newSquare)

    squares[currentSnake[0]].classList.add('snake')

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