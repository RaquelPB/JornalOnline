const duck = document.getElementById("duck");

// posições
let targetX = 40, targetY = 40;
let currentX = 40, currentY = 40;
let prevX = currentX;

const isMobile = window.matchMedia("(hover: none), (pointer: coarse)").matches;
let last = performance.now();

// NOVO: ocioso no desktop => passear sozinho
const IDLE_MS = 2500;                 // tempo sem mouse para começar a passear
let lastMouseTs = performance.now();  // último movimento do mouse
let desktopWander = isMobile;         // mobile já vagueia por padrão

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Orientação (vira para o lado que está indo)
function updateFacing(vx) {
  const th = 0.2;
  if (vx < -th) { duck.classList.add('facing-left'); duck.classList.remove('facing-right'); }
  else if (vx > th) { duck.classList.add('facing-right'); duck.classList.remove('facing-left'); }
}

// ------ MOBILE: movimento suave por direção/velocidade (steering) ------
let angle = Math.random() * Math.PI * 2;
let speed = 90;              // px/s
let aimAngle = angle;
let aimSpeed = speed;
let nextSteerAt = performance.now() + 1500;

// NOVO: alvo por toque (quando existir, vai até lá)
let touchTarget = null;

function planNextSteer(now) {
  aimAngle += (Math.random() * 0.9 - 0.45);  // curva leve
  aimSpeed = 70 + Math.random() * 60;        // 70–130 px/s
  nextSteerAt = now + 1200 + Math.random() * 1500; // 1.2–2.7s
}

// Loop de animação
function animate(now = performance.now()) {
  const dt = (now - last) / 1000; // segundos
  last = now;

  // NOVO: ativa/desativa passeio automático no desktop
  if (!isMobile) {
    desktopWander = (now - lastMouseTs) > IDLE_MS;
  }

  // Antes: if (isMobile) { ... }
  // Agora: mobile OU desktop ocioso vagueiam com steering
  if (isMobile || desktopWander) {
    // Se houver toque no mobile, prioriza o alvo; no desktop isso fica sempre nulo
    if (touchTarget) {
      const toX = touchTarget.x - currentX;
      const toY = touchTarget.y - currentY;
      aimAngle = Math.atan2(toY, toX);
      aimSpeed = 130;

      // Chegou bem perto? limpa o alvo e volta a passear
      const dist = Math.hypot(toX, toY);
      if (dist < 8) {
        touchTarget = null;
        aimSpeed = 90;
        nextSteerAt = now + 900;
      }
    } else {
      if (now >= nextSteerAt) planNextSteer(now);
    }

    // aproxima direção/velocidade do alvo
    angle += (aimAngle - angle) * 0.08;
    speed += (aimSpeed - speed) * 0.08;

    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    // move o alvo (target) continuamente
    targetX += vx * dt;
    targetY += vy * dt;

    // limites com “rebate” nas bordas
    const maxX = window.innerWidth - duck.offsetWidth;
    const maxY = window.innerHeight - duck.offsetHeight;

    if (targetX <= 0 || targetX >= maxX) {
      targetX = clamp(targetX, 0, maxX);
      angle = Math.PI - angle;
      aimAngle = angle;
      touchTarget = null; // evita ficar preso tentando alcançar fora da área
    }
    if (targetY <= 0 || targetY >= maxY) {
      targetY = clamp(targetY, 0, maxY);
      angle = -angle;
      aimAngle = angle;
      touchTarget = null;
    }
  }

  // interpola posição atual até o alvo (suavidade)
  currentX += (targetX - currentX) * 0.16;
  currentY += (targetY - currentY) * 0.16;

  // atualiza DOM
  duck.style.left = `${currentX}px`;
  duck.style.bottom = `${currentY}px`;

  // estado walking (asas/patinhas mexem quando movendo)
  const dx = Math.abs(targetX - currentX);
  const dy = Math.abs(targetY - currentY);
  duck.classList.toggle('walking', dx + dy > 0.4);

  // orientação
  updateFacing(currentX - prevX);
  prevX = currentX;

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ------ DESKTOP: segue o cursor (um pouco à esquerda e perto) ------
if (!isMobile) {
  const GAP_X = 8, GAP_Y = 6;
  document.addEventListener("mousemove", (e) => {
    // NOVO: detecta atividade para pausar o passeio
    lastMouseTs = performance.now();
    desktopWander = false;

    targetX = e.clientX - duck.offsetWidth - GAP_X;
    targetY = window.innerHeight - e.clientY - (duck.offsetHeight / 2) - GAP_Y;

    targetX = clamp(targetX, 0, window.innerWidth - duck.offsetWidth);
    targetY = clamp(targetY, 0, window.innerHeight - duck.offsetHeight);
  }, { passive: true });
}

// NOVO: no mobile, mover suavemente para o local tocado
if (isMobile) {
  window.addEventListener('touchstart', (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;

    const x = clamp(t.clientX - duck.offsetWidth / 2, 0, window.innerWidth - duck.offsetWidth);
    const y = clamp(window.innerHeight - t.clientY - duck.offsetHeight / 2, 0, window.innerHeight - duck.offsetHeight);

    touchTarget = { x, y };
    aimAngle = Math.atan2(y - currentY, x - currentX);
    aimSpeed = Math.max(aimSpeed, 140);
  }, { passive: true });
}

// Mantém dentro da viewport ao redimensionar
window.addEventListener('resize', () => {
  targetX = clamp(targetX, 0, window.innerWidth - duck.offsetWidth);
  targetY = clamp(targetY, 0, window.innerHeight - duck.offsetHeight);
});

// estado inicial
duck.classList.add('facing-right');
