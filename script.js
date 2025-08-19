/* ================= Estrelas no fundo ================= */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars() {
  stars = [];
  for (let i = 0; i < 250; i++) {
    const isNeon = Math.random() < 0.2; // 20% das estrelas são neon
    let color = "white";
    let size = random(0.3, 1.2);

    if (isNeon) {
      color = Math.random() < 0.5 ? "#9d4dff" : "#00e5ff"; // roxo ou azul neon
      size = random(1.2, 2.0); // maiores que as brancas
    }

    stars.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      size: size,
      speed: random(0.05, 0.4),
      color: color
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = star.color !== "white" ? 10 : 0; // brilho apenas neon
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Movimento
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = random(0, canvas.width);

      // Reatribui cor e tamanho ao resetar
      const isNeon = Math.random() < 0.2;
      star.color = isNeon
        ? (Math.random() < 0.5 ? "#9d4dff" : "#00e5ff")
        : "white";
      star.size = isNeon ? random(1.2, 5.0) : random(0.3, 1.2);
    }
  });
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

createStars();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
});