import { startMatrix } from './MatrixRain.js';

let isBootSkipped = false;
const skipCallbacks = new Set();

export function isSkipped() {
  return isBootSkipped;
}

export function onSkip(callback) {
  if (isBootSkipped) {
    callback();
    return () => {};
  }
  skipCallbacks.add(callback);
  return () => skipCallbacks.delete(callback);
}

export function triggerSkip() {
  if (isBootSkipped) return;
  isBootSkipped = true;
  skipCallbacks.forEach(cb => {
    try {
      cb();
    } catch {
      // ignore callback error
    }
  });
  skipCallbacks.clear();
}

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
      <div class="boot-overlay__skip-hint" id="boot-skip-hint">[Press ESC or click to skip]</div>
    </div>
  `;

  // noise layer for subtle texture
  const noise = document.createElement('div');
  noise.className = 'boot-overlay__noise';
  overlay.appendChild(noise);

  const handleKey = e => {
    if (['Escape', 'Enter', ' '].includes(e.key)) {
      triggerSkip();
    }
  };

  window.addEventListener('keydown', handleKey, { once: true });
  overlay.addEventListener('click', () => {
    triggerSkip();
  }, { once: true });

  onSkip(() => {
    window.removeEventListener('keydown', handleKey);
  });

  document.body.insertBefore(overlay, document.body.firstChild);
  return overlay;
}

export function getBootOutput() {
  return document.querySelector('#boot-output');
}

export function hideBootOverlay() {
  const overlay = document.querySelector('#boot-overlay');
  if (!overlay) return Promise.resolve();

  if (isBootSkipped) {
    overlay.remove();
    return Promise.resolve();
  }

  // Create matrix canvas on top of overlay
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.className = 'matrix-canvas';
  document.body.appendChild(canvas);

  const { stop } = startMatrix(canvas);

  // run matrix for a short transition then remove overlay and canvas
  return new Promise(resolve => {
    const DURATION = 1400;
    overlay.classList.add('boot-overlay--matrix');

    const finish = () => {
      stop();
      overlay.remove();
      canvas.remove();
      resolve();
    };

    const timer = setTimeout(finish, DURATION);
    onSkip(() => {
      clearTimeout(timer);
      finish();
    });
  });
}

// Typewriter helper: writes text into the boot output one char at a time.
export async function typeText(text, speed = 12) {
  const el = getBootOutput();
  if (!el || isBootSkipped) return;

  for (let i = 0; i < text.length; i++) {
    if (isBootSkipped) break;
    el.textContent += text[i];
    el.parentElement?.scrollTo(0, el.parentElement.scrollHeight);
    await new Promise(r => {
      const timer = setTimeout(r, speed);
      onSkip(() => {
        clearTimeout(timer);
        r();
      });
    });
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
    if (isBootSkipped) {
      counterEl.textContent = '100%';
      return;
    }

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
