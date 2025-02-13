let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let celebrationGif = document.getElementById("celebrationGif");
let celebrationAudio = document.getElementById("celebrationAudio");
let timerText = document.getElementById("timer");

let yesSize = 20; // Initial font size for Yes button
let noClickCount = 0; // Counter for "No" button clicks
let countdown = 30;

// Function to Create Floating Hearts
function createHeart() {
    let heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 90 + "vw"; // Adjusted for mobile
    heart.style.top = "100vh";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.animation = "floatUp 2s linear";
    
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 2000);
}

// Function to Create Confetti
function createConfetti() {
    let confetti = document.createElement("div");
    confetti.innerText = "🎊";
    confetti.style.position = "absolute";
    confetti.style.left = Math.random() * 90 + "vw"; // Adjusted for mobile
    confetti.style.top = "-10vh";
    confetti.style.fontSize = Math.random() * 20 + 20 + "px";
    confetti.style.animation = "fallDown 2s linear";
    
    document.body.appendChild(confetti);
    setTimeout(() => { confetti.remove(); }, 2000);
}

// "YES" Button Click Action
yesButton.addEventListener("click", function() {
    document.getElementById("response").innerHTML = "Yay! I'm so happy you said yes! ❤️💑";
    
    // Show the celebration GIF
    celebrationGif.style.display = "block";
    
    // Play the graduation song
    celebrationAudio.play();

    // Create Hearts and Confetti
    for (let i = 0; i < 20; i++) setTimeout(createHeart, i * 100);
    for (let i = 0; i < 30; i++) setTimeout(createConfetti, i * 50);
});

// "NO" Button Click Action
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
});

// "NO" Button Moves Away When Hovered (Mobile-Safe)
noButton.addEventListener("mouseover", function() {
    let randomX = Math.max(0, Math.min(window.innerWidth - 100, Math.random() * window.innerWidth - 50));
    let randomY = Math.max(0, Math.min(window.innerHeight - 50, Math.random() * window.innerHeight - 50));

    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
});

// Countdown Timer Auto-Clicks "YES"
let timer = setInterval(function() {
    countdown--;
    timerText.innerText = `Time left: ${countdown} seconds`;

    if (countdown <= 0) {
        clearInterval(timer);
        yesButton.click();
    }
}, 1000);
