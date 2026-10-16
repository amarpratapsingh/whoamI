export function startMatrix(canvas, { colors = ['#f5f5f5', '#d9d9d9', '#a8a8a8', '#7d7d7d'] } = {}) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const columns = Math.floor(width / 20) + 1;
  const drops = new Array(columns).fill(1);
  const chars = 'アカサタナハマヤラワガザダバパイチニヒミリヰウクスツヌフムユルグズドブプエケセテネヘメレヱオコソトノホモヨロゴゾドボポABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  ctx.font = '16px monospace';
  let raf = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * 20;
      const y = drops[i] * 16;

      const brightness = Math.min(1, (drops[i] % 20) / 10);
      const colorIdx = Math.floor((i + drops[i]) % colors.length);
      const color = colors[colorIdx];

      ctx.fillStyle = color;
      ctx.globalAlpha = brightness * 0.55;
      ctx.shadowColor = color;
      ctx.shadowBlur = brightness * 6;
      ctx.fillText(text, x, y);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (y > height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i] += 0.8;
    }

    raf = requestAnimationFrame(draw);
  }

  draw();

  return {
    stop() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    },
  };
}

export function createMatrixRain(canvas, options) {
  return startMatrix(canvas, options);
}
