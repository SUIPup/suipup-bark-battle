
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let pupY = 150;
let velocity = 0;
let gravity = 0.5;
let obstacles = [];
let score = 0;

document.addEventListener("keydown", () => { velocity = -7; });

function drawPup() {
    ctx.fillStyle = "#f4a460";
    ctx.beginPath();
    ctx.arc(50, pupY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawObstacles() {
    ctx.fillStyle = "#FF6347";
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, 0, 20, obs.top);
        ctx.fillRect(obs.x, obs.top + 80, 20, canvas.height - obs.top - 80);
    }
}

function updateObstacles() {
    if (Math.random() < 0.02) {
        let top = Math.random() * 200 + 20;
        obstacles.push({ x: canvas.width, top });
    }

    for (let obs of obstacles) {
        obs.x -= 2;
        if (obs.x === 50) score++;
    }

    obstacles = obstacles.filter(obs => obs.x > -20);
}

function checkCollision() {
    for (let obs of obstacles) {
        if (50 + 15 > obs.x && 50 - 15 < obs.x + 20) {
            if (pupY - 15 < obs.top || pupY + 15 > obs.top + 80) {
                return true;
            }
        }
    }
    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pupY += velocity;
    velocity += gravity;
    drawPup();
    updateObstacles();
    drawObstacles();

    if (checkCollision() || pupY > canvas.height || pupY < 0) {
        alert("Game Over! Final Score: " + score);
        location.reload();
    }

    document.getElementById("score").innerText = "Score: " + score;
    requestAnimationFrame(gameLoop);
}

gameLoop();

