greenBar = document.getElementById("greenBar")
grayBar = document.getElementById("grayBar")
jimmy = document.getElementById("jimmy")
fishBar = document.getElementById("fishBar")
blackBox = document.getElementById("blackBox")
fishingHook = document.getElementById("fishingHook")
messageText = document.getElementById("messageText")
totalFishText = document.getElementById("totalFish")
totalFish2Text = document.getElementById("totalFish2")
totalTimeDisplay = document.getElementById("time")
currentYearDisplay = document.getElementById("currentYear")
riverImage = document.getElementById("riverImage")
totalTime = 46
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
timer3 = 0
timer4 = 0
totalFish = 0
totalFish2 = 0
totalBites = 0
totalBites2 = 0
avgTime = 0
avgTime2 = 0
avgTimeList = []
avgTimeList2 = []
jimmy.src = 'castRod.gif'
jimmy.src = 'idleJimmy.gif'
currentYear = 1980
hasSwitchedYear = 0
reset()

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
    messageText.style.fontSize = '30px'
    messageText.style.textAlign = 'center'
    messageText.innerHTML = input
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
    if (fishingStatus === 2){
        timer3 += 0.01
    }
    timer4 -= 0.01

    if (totalTime > 0.01) {
        totalTime -=0.01
    }

    if (fishingStatus === 0) {
        setGif('idleJimmy.gif')
        if (timer <= 0.1){
            createMessage("Press space to cast", "Black")
        }
        if (space === 1) {
            fishingStatus = 1
        }

    } else if (fishingStatus === 1) {
        setGif('test.gif')

        if (timer <= 0.1) {
            timer = 1.2
            fishingStatus = 2
        }
 

        
    } else if (fishingStatus === 2) {
 
        if (timer <= 0.1) {
            setGif('boredJimmy.gif')
        }
        if (currentYear === 1980){
            if (Math.random() > 0.998 && timer <= 0.1) {
            createMessage("!!!", 'black')
            timer2 = 3
            totalBites += 1
            avgTimeList.push(Math.floor(timer3))
            timer3 = 0
            }
        }
        
        if (currentYear === 2020) {

            if (Math.random() > 0.9995 && timer <= 0.1) {
            createMessage("!!!", 'black')
            timer2 = 3
            totalBites2 += 1
            avgTimeList2.push(Math.floor(timer3))
            timer3 = 0
            } 
        }

        if (timer2 <= 0.1) {
            createMessage("", "")
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
        jimmy.style.display = 'none'
        setGif('fishBit.gif')
        jimmy.style.display = 'inline-block'
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
        
            if (currentYear === 1980){
                if (timer4 <= 0.1){
                    totalFish += 1
                }

                timer4 = 3
            }
            if (currentYear === 2020) {
                if (timer4 <= 0.1){
                    totalFish2 += 1
                }

                timer4 = 3
            }
        if (timer <= 0.1) {
            fishingStatus = 0
            reset()
        }
    } else if (fishingStatus === 5) {
        timer3 = 0
        setGif('noFish.gif')
        if (timer <= 0.1) {
            fishingStatus = 0
            reset()

        }
    }

    if (totalTime < 1) {
        if (currentYear === 1980) {
            createMessage(`You caught ${totalFish} fish`, "Black")
            reset()
            timer = 2
            if (fishingStatus === 2 || fishingStatus === 3) {
                fishingStatus = 5
            }
            currentYear = 2020
        }

        if (currentYear === 2020  && hasSwitchedYear === 1) {
            fishingStatus = 1500

            function calculateAverage(list) {
                if (list.length > 0) {
                    const sum = list.reduce((acc, curr) => acc + curr, 0);
                    return sum / list.length;
                } else {
                    return "N/A"
                }

            }

            avgTime = calculateAverage(avgTimeList);
            avgTime2 = calculateAverage(avgTimeList2);
            createMessage(`In 1980, you got ${totalBites} bites and caught ${totalFish} fish. In 2020, you got ${totalBites2} bites and caught ${totalFish2} fish. Your average wait time in 1980 was ${avgTime}, and your average wait time in 2020 was ${avgTime2}.`)
        }
    }
    if (hasSwitchedYear === 0 && currentYear === 2020) {
        if (timer <= 0.1){
            fishingStatus = 0
            totalTime = 47
            hasSwitchedYear = 1
            reset()
        }
    }

    if (currentYear === 1980) {
        riverImage.style.backgroundImage = "url(river.png)"
    } else {
        riverImage.style.backgroundImage = "url(dirtyRiver.png)"
    }

    currentYearDisplay.textContent = `Current Year: ${currentYear}`
    totalFishText.textContent = `Total Fish for 1980: ${totalFish}`
    totalFish2Text.textContent = `Total Fish for 2020: ${totalFish2}`
    totalTimeDisplay.textContent = `Time Left: ${Math.floor(totalTime)}`

    console.log(timer3)
}, 10);


grayBar.setAttribute('style', `width: ${grayPosition}%`)

function reset(){
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

