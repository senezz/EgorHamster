const circle = document.querySelector('#circle')
const coinScore = document.querySelector('#score')

function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem('score', score)
    coinScore.textContent = score
}


let isBodya = false

function setImage() {
    if (getScore() % 20 === 0) {
        isBodya = !isBodya
        circle.setAttribute('src', isBodya ?
             './assets/bodya-coin.jpg' :
              './assets/egor-coin.jpg')
    } 
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
    setScore(getScore() + 1)
    setImage()
}

circle.addEventListener('click', ({offsetX:x, offsetY:y}) => {
    const {width, height} = circle.getBoundingClientRect()
    const halfWidth = width / 2
    const halfHeight = height / 2
    const offsetX = x - halfWidth
    const offsetY = y - halfHeight
    const maxAngle = 40

    const tiltX = (offsetY / halfHeight) * -maxAngle
    const tiltY = (offsetX / halfWidth) * maxAngle

    circle.style.setProperty('--tiltX', `${tiltX}deg`)
    circle.style.setProperty('--tiltY', `${tiltY}deg`)

    setTimeout(() => {
        circle.style.setProperty('--tiltX', `0deg`)
        circle.style.setProperty('--tiltY', `0deg`)
    }, 300)

    const plusOne = document.createElement('div')
    plusOne.classList.add('plus-one')
    plusOne.textContent = '+1'
    plusOne.style.left = `${x}px`
    plusOne.style.top = `${y}px`


    circle.parentElement.appendChild(plusOne)

    addOne()

    setTimeout(() => {
        plusOne.remove()
    }, 2000)
})

start()