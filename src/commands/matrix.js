import { ansi } from '../utils/ansi.js';

export function matrix() {
  // Trigger matrix canvas if available on document body
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  canvas.style.opacity = '1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const columns = Math.floor(width / 20) + 1;
  const drops = new Array(columns).fill(1);
  const chars = '0123456789ABCDEFﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';

  ctx.font = '16px monospace';
  let running = true;
  let raf = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  function draw() {
    if (!running) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff66';
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * 20;
      const y = drops[i] * 18;

      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    raf = requestAnimationFrame(draw);
  }

  draw();

  const cleanup = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('keydown', cleanup);
    canvas.style.transition = 'opacity 0.6s ease-out';
    canvas.style.opacity = '0';
    setTimeout(() => canvas.remove(), 600);
  };

  // Stop after 6 seconds or on next keypress
  setTimeout(cleanup, 6000);
  window.addEventListener('keydown', cleanup, { once: true });

  return [
    ansi.bold(ansi.brightGreen('Connecting to the Construct...')),
    ansi.dim('Digital rain engaged. Press any key to disconnect (or auto-terminates in 6s).'),
  ].join('\n');
}
