const CONFETTI_COLORS = [
  '#ff69b4',
  '#ff1493',
  '#ffb6c1',
  '#e91e8c',
  '#ffc0cb',
  '#d44d7a',
  '#e8c547',
] as const;

const CONFETTI_SYMBOLS = ['🌸', '💐', '🌷', '✨', '💕', '❤️', '🌟'] as const;

function getEl<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function createConfettiPiece(
  container: HTMLElement,
  isEmoji: boolean,
  symbols: readonly string[],
  colors: readonly string[]
): void {
  const el = document.createElement('div');
  el.className = 'confetti-piece';
  if (isEmoji) {
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.fontSize = `${14 + Math.random() * 16}px`;
  } else {
    el.style.width = `${6 + Math.random() * 8}px`;
    el.style.height = `${6 + Math.random() * 8}px`;
    el.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
  }
  el.style.left = `${Math.random() * 100}vw`;
  el.style.animationDelay = `${Math.random() * 5}s`;
  el.style.animationDuration = `${4 + Math.random() * 4}s`;
  el.style.opacity = String(0.6 + Math.random() * 0.4);
  container.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}

function createConfetti(): void {
  const container = getEl('confetti');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const isEmoji = Math.random() > 0.5;
    createConfettiPiece(
      container,
      isEmoji,
      CONFETTI_SYMBOLS,
      CONFETTI_COLORS
    );
  }
}

function injectConfettiStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    .confetti-piece {
      position: absolute;
      top: -50px;
      animation: confettiFall linear forwards;
      pointer-events: none;
    }
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);
}

function initWhereWishes(): void {
  document.querySelectorAll('.where-card__wish-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.where-card__wish-wrap');
      const text = wrap?.querySelector<HTMLElement>('.where-card__wish-text');
      if (!text) return;
      text.hidden = false;
      (btn as HTMLButtonElement).textContent = '🌸 Открыто';
      (btn as HTMLButtonElement).disabled = true;
    });
  });
}

function init(): void {
  injectConfettiStyles();
  createConfetti();
  setInterval(createConfetti, 8000);
  setTimeout(() => document.body.classList.remove('bameple-not-loaded'), 1000);
  initWhereWishes();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
