let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let celebrationGif = document.getElementById("celebrationGif");
let celebrationAudio = document.getElementById("celebrationAudio");
let nopeSound = document.getElementById("nopeSound");
let timerText = document.getElementById("timer");
let nameInputScreen = document.getElementById("nameInputScreen");
let mainContent = document.getElementById("mainContent");
let nameInput = document.getElementById("nameInput");
let startButton = document.getElementById("startButton");
let valentineMessage = document.getElementById("valentineMessage");

let yesSize = 20;
let noClickCount = 0;
let countdown = 30;
let timer;
let soundPlayed = false; // Prevent sound from playing too often

// Handle Name Input and Show Website
startButton.addEventListener("click", function() {
    let userName = nameInput.value.trim();
    if (userName) {
        valentineMessage.innerHTML = `Happy Valentine's Day, ${userName}! ❤️`;
        nameInputScreen.style.display = "none";
        mainContent.style.display = "block";
        
        // Start countdown after entering name
        startCountdown();
    } else {
        alert("Please enter your name! 😊");
    }
});

// Countdown Timer Auto-Clicks "YES"
function startCountdown() {
    timer = setInterval(function() {
        countdown--;
        timerText.innerText = `Time left: ${countdown} seconds`;

        if (countdown <= 0) {
            clearInterval(timer);
            yesButton.click();
        }
    }, 1000);
}

// "YES" Button Click Action
yesButton.addEventListener("click", function() {
    document.getElementById("response").innerHTML = "Yay! I'm so happy you said yes! ❤️💑";
    celebrationGif.style.display = "block";
    celebrationAudio.play();
    clearInterval(timer);
});

// "NO" Button Click Action (Mobile & Desktop Compatible)
noButton.addEventListener("click", function() {
    noClickCount++;
    yesSize += 20;
    yesButton.style.fontSize = yesSize + "px";
    yesButton.style.padding = (yesSize / 2) + "px";

    if (yesSize >= 300) {
        yesButton.style.width = "100vw";
        yesButton.style.height = "100vh";
        yesButton.innerHTML = "YOU HAVE TO SAY YES! 😆💖";
    }

    if (noClickCount >= 10) {
        noButton.style.display = "none";
        document.getElementById("response").innerText = "Oops! The 'No' button disappeared! Guess you have to say YES! 😆💖";
    }

    // Play Nope Sound when tapped on mobile
    playNopeSound();
});

// "NO" Button Moves Away When Hovered (Desktop) & Plays Sound
noButton.addEventListener("mouseover", function() {
    if (!isMobileDevice()) {
        moveNoButton();
        playNopeSound();
    }
});

// Function to Move "No" Button (Desktop Only)
function moveNoButton() {
    let randomX = Math.random() * window.innerWidth * 0.8;
    let randomY = Math.random() * window.innerHeight * 0.8;
    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
}

// Function to Play Nope Sound (Desktop & Mobile)
function playNopeSound() {
    if (!soundPlayed) {
        nopeSound.play();
        soundPlayed = true;
        setTimeout(() => { soundPlayed = false; }, 500); // Prevent sound spam
    }
}

// Function to Detect Mobile Device
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
