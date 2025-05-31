greenBar = document.getElementById("greenBar")
grayBar = document.getElementById("grayBar")
jimmy = document.getElementById("jimmy")
fishBar = document.getElementById("fishBar")
blackBox = document.getElementById("blackBox")
fishingHook = document.getElementById("fishingHook")
messageText = document.getElementById("messageText")
fishBarDirection = 1
fishBarSpeed = 3-2*Math.random()
fishDistFromLeft = 0
greenPosition = 25
grayAcceleration = 0
grayPosition = 0
space = 0
fishingStatus = 0
timer = 0
timer2 = 0

/*
fishingStatus = 0: rod out of water, press space to cast
=1: casting animation
=2: in water, press space if fish is biting
=3: pulling fish, press space to reel in fish
=4: pull fish out of water animation
=5: no fish, pull rod out
*/

let lastGif = '';

function setGif(newSrc) {
    if (lastGif !== newSrc) {
        jimmy.src = newSrc;
        lastGif = newSrc;
    }
}

function createMessage(input, whichColor){
    messageText.style.color = (whichColor)
    messageText.style.fontSize = 25
    messageText.textContent = input
}

document.addEventListener('keydown', function(event){
    if (event.code === 'Space' && fishingStatus != 4 && fishingStatus != 5) {
        space = 1
    }
})

document.addEventListener('keyup', function(event){
    if (event.code === 'Space' && fishingStatus != 4 && fishingStatus != 5){
        space = 0
    }
})

setInterval(function(){
    if (Math.random() > 0.96) {
        fishBarDirection *= -1
    }
    if (Math.random() > 0.95) {
        fishBarSpeed = 3-2*Math.random()
    }
}, 200)

setInterval(function() {

    if (fishingStatus === 3) {
        if (space === 0){
        if (grayPosition > 0){
                grayAcceleration += 0.01
                grayPosition -= grayAcceleration
            } else {
                grayPosition = 0
            }
        }
        if (space === 1){
            if (grayPosition < 100 - ((fishingHook.offsetWidth)/window.innerWidth)*100){
                grayAcceleration -= 0.01
                    grayPosition -= grayAcceleration
            } else {
                grayPosition = 100-((fishingHook.offsetWidth)/window.innerWidth)*100
            }
        }

            fishDistFromLeft += fishBarSpeed*fishBarDirection
        if (fishDistFromLeft > window.innerWidth-fishBar.offsetWidth){
            fishDistFromLeft = window.innerWidth-fishBar.offsetWidth
            if (Math.random()>0.9){
                fishBarDirection *= -1
            }
        }
        if (fishDistFromLeft < 0){
            fishDistFromLeft = 0
            if (Math.random()>0.9){
                fishBarDirection *= -1
            }
        }

        fishBar.style.left = `${fishDistFromLeft}px`
        fishingHook.style.left= `${grayPosition*window.innerWidth/100}px`

        grayAcceleration *= 0.95
        grayBar.style.width = `${grayPosition}%`

        if (Math.abs(fishDistFromLeft-window.innerWidth*grayPosition/100) < 50) {
            console.log(greenPosition)
            greenPosition += 0.15
        } else {
            if (greenPosition >= 0) {
                greenPosition -= 0.1
            }
            
        }

        greenBar.style.width = `${greenPosition}%`
    }


    

    timer -= 0.01
    timer2 -= 0.01

    if (fishingStatus === 0) {
        setGif('idleJimmy.gif')
        createMessage("Press space to cast", "Black")
        if (space === 1) {
            fishingStatus = 1
        }

    } else if (fishingStatus === 1) {
        if (timer <= 0.1) {
            setGif('castRod.gif')
            timer = 2
        }
        fishingStatus = 2

        console.log("hello")
        
    } else if (fishingStatus === 2) {
        if (timer <= 0.1) {
            setGif('boredJimmy.gif')
        }

        if (Math.random() > 0.999 && timer <= 0.1) {
            createMessage("!!!", 'yellow')
            timer2 = 3
        } 

        if (space === 1 && timer2 <= 0.1 && timer <= 0.1) {
            fishingStatus = 5
            timer = 2
        }

        if (space === 1 && timer2 > 0.1) {
            fishingStatus = 3
            show()
    }
    
    } else if (fishingStatus === 3) {
        setGif('fishBit.gif')
        if (greenPosition > 99) {
            createMessage("You got a fish!", 'green')
            fishingStatus = 4
            timer = 3
        } else if (greenPosition <= 0) {
            fishingStatus = 5
            timer = 2
            createMessage("Fail...", 'red')
        }
    } else if (fishingStatus === 4) {
        setGif('gotAFish.gif')
        if (timer <= 0.1) {
            fishingStatus = 0
            reset()
        }
    } else if (fishingStatus === 5) {
        setGif('noFish.gif')
        if (timer <= 0.1) {
            fishingStatus = 0
            reset()
        }
    }

    
}, 10);


grayBar.setAttribute('style', `width: ${grayPosition}%`)

function reset(){
    fishingStatus = 0
    greenBar.style.display = 'none'
    grayBar.style.display = 'none'
    fishBar.style.display = 'none'
    fishingHook.style.display = 'none'
    greenPosition = 25
    fishDistFromLeft = 0
    grayAcceleration = 0
    grayPosition = 0
    space = 0
    fishBarDirection = 1
    fishBarSpeed = 3-2*Math.random()
    timer = 0
}

function show(){
    jimmy.src = 'fishBit.gif'
    greenBar.style.display = 'inline-block'
    grayBar.style.display = 'inline-block'
    fishBar.style.display = 'inline-block'
    fishingHook.style.display = 'inline-block'
    blackBox.style.display = 'inline-block'

}

