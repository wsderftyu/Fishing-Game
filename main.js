greenBar = document.getElementById("greenBar")
jimmy = document.getElementById("jimmy")
greenPosition = 0
space = 0
gotFish = 0

document.addEventListener('keydown', function(event){
    if (event.code === 'Space') {
        space = 1
    }
})

document.addEventListener('keyup', function(event){
    if (event.code === 'Space'){
        space = 0
    }
})

setInterval(function() {
    if (space === 0){
        if (greenPosition > 0){
                greenPosition -= 0.25
            } else {
                greenPosition = 0
            }
    }
    if (space === 1){
            if (greenPosition < 100){
                    greenPosition += 0.25
                } else {
                    greenPosition = 100
                }
        }
    
    greenBar.setAttribute('style', `width: ${greenPosition}%`)
}, 10);


greenBar.setAttribute('style', `width: ${greenPosition}%`)

setInterval(function() {

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
    async function runProgram() {
        if (Math.random() > 0.999 && gotFish === 0) {
            jimmy.src = 'gotAFish.gif'
            console.log('a')
            gotFish = 1
            await delay(3000)
        } else {
            jimmy.src = 'jimmy.png'
            console.log('b')
        }
    }
    runProgram()
}, 10)