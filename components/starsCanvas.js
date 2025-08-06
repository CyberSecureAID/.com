export function iniciarEstrellas(canvasId) {
  const stars = document.getElementById(canvasId);
  if (!stars) return;
  stars.width = innerWidth;
  stars.height = innerHeight;
  const ctx = stars.getContext("2d");
  const field = Array.from({ length: 100 }, () => ({
    x: Math.random() * stars.width,
    y: Math.random() * stars.height,
    r: Math.random() * 1.5,
    s: Math.random() * 0.5 + 0.2
  }));
  function draw() {
    ctx.clearRect(0, 0, stars.width, stars.height);
    ctx.fillStyle = "#fff";
    field.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.s;
      if (star.y > stars.height) star.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener("resize", () => {
    stars.width = innerWidth;
    stars.height = innerHeight;
  });
}
