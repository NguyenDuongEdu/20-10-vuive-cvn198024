
"use strict";

// ==========================================
// NHẠC NỀN
// ==========================================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const openBtn = document.getElementById("openBtn");

let musicPlaying = false;

async function playMusic() {
    if (!music || !musicBtn) return;

    try {
        await music.play();
        musicPlaying = true;
        musicBtn.textContent = "🔊";
    } catch (error) {
        musicPlaying = false;
        musicBtn.textContent = "🎵";
        console.log("Không thể phát nhạc:", error);
    }
}

function pauseMusic() {
    if (!music || !musicBtn) return;

    music.pause();
    musicPlaying = false;
    musicBtn.textContent = "🎵";
}

if (musicBtn) {
    musicBtn.addEventListener("click", () => {
        if (musicPlaying && music && !music.paused) {
            pauseMusic();
        } else {
            playMusic();
        }
    });
}


// ==========================================
// LỜI CHÚC GÕ TỪNG CHỮ
// ==========================================

const mainIntro = document.getElementById("mainIntro");
const greetingMessage = document.getElementById("greetingMessage");
const wishText = document.getElementById("wishText");
const introFacebook = document.getElementById("introFacebook");

const greeting = `Giữa vũ trụ công việc bận rộn, các chị chính là những người đồng nghiệp tuyệt vời mang đến năng lượng tích cực, sự ân cần và nguồn cảm hứng lớn cho một người em như em. Cảm ơn các chị vì đã luôn hướng dẫn, sẻ chia và giúp đỡ em trong suốt thời gian qua.

Nhân ngày 20/10, em xin kính chúc các chị luôn ngập tràn niềm vui, trẻ trung, hạnh phúc và gặt hái được nhiều thành công hơn nữa trên con đường sự nghiệp! Mời các chị cùng thưởng thức một chút socola ngọt ngào hôm nay nhé! 🍫`;

const TYPING_SPEED = 35;

let typingTimer = null;
let greetingStarted = false;

function typeGreeting() {
    if (!wishText) {
        console.error("Không tìm thấy phần tử #wishText trong HTML.");
        return;
    }

    if (typingTimer !== null) {
        clearInterval(typingTimer);
        typingTimer = null;
    }

    wishText.textContent = "";
    wishText.classList.add("typing");
    wishText.style.display = "block";
    wishText.style.visibility = "visible";
    wishText.style.opacity = "1";

    const characters = Array.from(greeting);
    let index = 0;

    typingTimer = setInterval(() => {
        if (index >= characters.length) {
            clearInterval(typingTimer);
            typingTimer = null;
            wishText.classList.remove("typing");
            return;
        }

        wishText.textContent += characters[index];
        index++;
    }, TYPING_SPEED);
}

if (openBtn) {
    openBtn.addEventListener("click", () => {
        if (greetingStarted) return;
        greetingStarted = true;

        // Bắt đầu nhạc sau thao tác của người dùng
        playMusic();

        // Chuyển sang màn hình lời chúc
        if (mainIntro) {
            mainIntro.style.display = "none";
        }

        if (introFacebook) {
            introFacebook.style.display = "none";
        }

        if (greetingMessage) {
            greetingMessage.style.display = "block";
        }

        // Gõ nội dung lời chúc
        typeGreeting();

        // Bắn pháo giấy
        launchConfetti();
    });
}


// ==========================================
// HIỆU ỨNG REVEAL KHI CUỘN
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => observer.observe(element));
}


// ==========================================
// THANH TIẾN TRÌNH
// ==========================================

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
});


// ==========================================
// CÁNH HOA RƠI
// ==========================================

const petalsContainer = document.getElementById("petals");
const flowers = ["🌸", "🌷", "🌹", "💮"];

function createPetal() {
    if (!petalsContainer) return;

    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = 12 + Math.random() * 16 + "px";

    const duration = 6 + Math.random() * 7;

    petal.style.animationDuration =
        `${duration}s, ${2 + Math.random() * 3}s`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

if (petalsContainer) {
    setInterval(createPetal, 600);
}


// ==========================================
// POPUP LỜI CHÚC CUỐI (NẾU CÓ TRONG HTML)
// ==========================================

const finishBtn = document.getElementById("finishBtn");
const finalMessage = document.getElementById("finalMessage");
const closeFinal = document.getElementById("closeFinal");

if (finishBtn && finalMessage) {
    finishBtn.addEventListener("click", () => {
        playMusic();
        finalMessage.classList.add("show");
        launchConfetti();
    });
}

if (closeFinal && finalMessage) {
    closeFinal.addEventListener("click", () => {
        finalMessage.classList.remove("show");
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && finalMessage) {
        finalMessage.classList.remove("show");
    }
});


// ==========================================
// PHÁO GIẤY
// ==========================================

const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas
    ? confettiCanvas.getContext("2d")
    : null;

let confettiParticles = [];
let confettiFrame = null;

function resizeConfettiCanvas() {
    if (!confettiCanvas) return;

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

resizeConfettiCanvas();
window.addEventListener("resize", resizeConfettiCanvas);

function launchConfetti() {
    if (!confettiCanvas || !confettiCtx) return;

    confettiParticles = [];

    for (let i = 0; i < 180; i++) {
        confettiParticles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            size: 5 + Math.random() * 8,
            speedX: (Math.random() - 0.5) * 16,
            speedY: (Math.random() - 0.5) * 16 - 5,
            gravity: 0.25 + Math.random() * 0.15,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            life: 1,
            hue: Math.random() * 360
        });
    }

    if (confettiFrame !== null) {
        cancelAnimationFrame(confettiFrame);
    }

    animateConfetti();
}

function animateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;

    confettiCtx.clearRect(
        0, 0, confettiCanvas.width, confettiCanvas.height
    );

    for (const p of confettiParticles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        p.life -= 0.008;

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rotation);
        confettiCtx.globalAlpha = Math.max(p.life, 0);
        confettiCtx.fillStyle = `hsl(${p.hue}, 80%, 70%)`;

        confettiCtx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
        );

        confettiCtx.restore();
    }

    confettiParticles = confettiParticles.filter(p => p.life > 0);

    if (confettiParticles.length > 0) {
        confettiFrame = requestAnimationFrame(animateConfetti);
    } else {
        confettiCtx.clearRect(
            0, 0, confettiCanvas.width, confettiCanvas.height
        );
        confettiFrame = null;
    }
}
