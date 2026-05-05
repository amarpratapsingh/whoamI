export function createBootOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'boot-overlay';
  overlay.className = 'boot-overlay boot-overlay--active';
  overlay.innerHTML = `
    <div class="boot-overlay__content">
      <div class="boot-overlay__banner">
        <h1 class="boot-overlay__title">Amar Pratap Singh</h1>
        <p class="boot-overlay__subtitle">Portfolio • Booting</p>
        <pre class="boot-overlay__ascii" id="boot-ascii" aria-hidden="true"></pre>
      </div>
      <div class="boot-overlay__output-wrap">
        <pre class="boot-overlay__output" id="boot-output" aria-live="polite"></pre>
      </div>
      <div class="boot-overlay__progress">
        <div class="boot-overlay__bar"></div>
        <div class="boot-overlay__counter" id="boot-counter">0%</div>
      </div>
    </div>
  `;

  // noise layer for subtle texture
  const noise = document.createElement('div');
  noise.className = 'boot-overlay__noise';
  overlay.appendChild(noise);

  document.body.insertBefore(overlay, document.body.firstChild);
  return overlay;
}

export function getBootOutput() {
  return document.querySelector('#boot-output');
}

export function hideBootOverlay() {
  const overlay = document.querySelector('#boot-overlay');
  if (!overlay) return Promise.resolve();

  // Create matrix canvas on top of overlay
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.className = 'matrix-canvas';
  document.body.appendChild(canvas);

  const { stop } = startMatrix(canvas);

  // run matrix for a short transition then remove overlay and canvas
  return new Promise(resolve => {
    // let matrix run visibly for a bit (ms)
    const DURATION = 1400;
    // fade overlay slightly to blend with matrix
    overlay.classList.add('boot-overlay--matrix');

    setTimeout(() => {
      stop();
      overlay.remove();
      canvas.remove();
      resolve();
    }, DURATION);
  });
}

// Matrix rain implementation
function startMatrix(canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const columns = Math.floor(width / 20) + 1;
  const drops = new Array(columns).fill(1);

  const chars = 'アカサタナハマヤラワガザダバパイチニヒミリヰウクスツヌフムユルグズドブプエケセテネヘメレヱオコソトノホモヨロゴゾドボポABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  ctx.font = '16px monospace';
  
  // Monochrome palette to match the black theme
  const colors = ['#f5f5f5', '#d9d9d9', '#a8a8a8', '#7d7d7d'];

  let raf = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);

  function draw() {
    // translucent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * 20;
      const y = drops[i] * 16;
      
      // Vary color: brighter at tail, dimmer as it falls
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

// Typewriter helper: writes text into the boot output one char at a time.
export async function typeText(text, speed = 12) {
  const el = getBootOutput();
  if (!el) return;
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    el.parentElement?.scrollTo(0, el.parentElement.scrollHeight);
    await new Promise(r => setTimeout(r, speed));
  }
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

// Counter animation: increments from 0 to 100 over duration
export function startCounter(duration = 7254) {
  const counterEl = document.querySelector('#boot-counter');
  if (!counterEl) return;

  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = easeInOutCubic(Math.min(1, elapsed / duration));
    const percentage = Math.round(progress * 100);
    counterEl.textContent = percentage + '%';
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}
