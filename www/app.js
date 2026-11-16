/**
 * =========================================================================
 * MEETING VIEWER - SPLIT-FLAP STATION BOARD ENGINE
 * =========================================================================
 */

// Diccionari Multiidioma (Català, Castellà, Anglès)
const I18N = {
  ca: {
    boardTitle: "PANEL D'INFORMACIÓ",
    colTime: "HORA",
    colEvent: "CONVOCATÒRIA",
    colLoc: "LLOC / SALA",
    colStatus: "ESTAT",
    statusConnected: "CONNECTAT",
    statusDisconnected: "NO CONNECTAT",
    statusDemo: "MODE DEMO",
    noEventsNotice: "FELICITATS. AVUI NO TENS FEINA",
    noAccountNotice: "AVÍS: CAL CONFIGURAR ELS CALENDARIS",
    noAccountSubnotice: "OBRIU LA CONFIGURACIÓ A DALT A LA DRETA PER AFEGIR-NE",
    upcomingHeader: "PREVISTES",
    lblFilterTitle: "CALENDARI:",
    lblFilterAll: "TOTS",
    lblCustomTitle: "Títol del Panell:",
    customTitlePlaceholder: "PANELL D'INFORMACIÓ",
    customTitleHelp: "Personalitza el text principal que apareix a la cantonada superior esquerra.",
    statusInProgress: "EN CURS",
    statusSoon: "AVIAT",
    statusOnTime: "A TEMPS",
    statusFinished: "FINALITZAT",
    allDay: "TOT EL DIA",
    modalTitle: "Configuració del Panell",
    lblLanguage: "Idioma del Panell:",
    lblDemoMode: "Mode de demostració (convocatòries simulades):",
    lblCalendarsTitle: "Calendaris Sincronitzats:",
    calPlaceholder: "Adreça iCal (.ics) o fitxer JSON (ex: secrets/calendar-jlmonte.json)",
    calendarsHelpText: "Afegeix els teus calendaris mitjançant l'adreça secreta iCal (.ics) o fitxers JSON de Power Automate (ex: secrets/calendar-jlmonte.json). Activa o desactiva la casella per triar quins es mostren al panell.",
    btnDeleteCalConfirm: "Segur que vols eliminar aquest calendari?",
    lblRefreshInterval: "Freqüència de refresc automàtic:",
    optRefresh30: "Cada 30 segons",
    optRefresh60: "Cada 1 minut (Recomanat)",
    optRefresh120: "Cada 2 minuts",
    optRefresh300: "Cada 5 minuts",
    lblSound: "Efecte de so mecànic de les lletres:",
    btnApplyAndClose: "Acceptar i tancar"
  },
  es: {
    boardTitle: "PANEL DE INFORMACIÓN",
    colTime: "HORA",
    colEvent: "CONVOCATORIA",
    colLoc: "LUGAR / SALA",
    colStatus: "ESTADO",
    statusConnected: "CONECTADO",
    statusDisconnected: "NO CONECTADO",
    statusDemo: "MODO DEMO",
    noEventsNotice: "FELICIDADES. HOY NO TIENES TRABAJO",
    noAccountNotice: "AVISO: CONFIGURE SUS CALENDARIOS",
    noAccountSubnotice: "ABRA LA CONFIGURACIÓN ARRIBA A LA DERECHA PARA AÑADIRLOS",
    upcomingHeader: "PREVISTAS",
    lblFilterTitle: "CALENDARIO:",
    lblFilterAll: "TODOS",
    lblCustomTitle: "Título del Panel:",
    customTitlePlaceholder: "PANEL DE INFORMACIÓN",
    customTitleHelp: "Personaliza el texto principal que aparece en la esquina superior izquierda.",
    statusInProgress: "EN CURSO",
    statusSoon: "PRONTO",
    statusOnTime: "A TIEMPO",
    statusFinished: "FINALIZADA",
    allDay: "TODO EL DIA",
    modalTitle: "Configuración del Panel",
    lblLanguage: "Idioma del Panel:",
    lblDemoMode: "Modo de demostración (convocatorias simuladas):",
    lblCalendarsTitle: "Calendarios Sincronizados:",
    calPlaceholder: "Dirección iCal (.ics) o archivo JSON (ej: secrets/calendar-jlmonte.json)",
    calendarsHelpText: "Añade tus calendarios mediante la Dirección secreta en formato iCal (.ics) o archivos JSON de Power Automate (ej: secrets/calendar-jlmonte.json). Activa o desactiva la casilla para elegir cuáles se muestran en el panel.",
    btnDeleteCalConfirm: "¿Seguro que deseas eliminar este calendario?",
    lblRefreshInterval: "Frecuencia de refresco automático:",
    optRefresh30: "Cada 30 segundos",
    optRefresh60: "Cada 1 minuto (Recomendado)",
    optRefresh120: "Cada 2 minutos",
    optRefresh300: "Cada 5 minutos",
    lblSound: "Efecto de sonido mecánico de las letras:",
    btnApplyAndClose: "Aceptar y cerrar"
  },
  en: {
    boardTitle: "MEETING INFORMATION",
    colTime: "TIME",
    colEvent: "MEETING",
    colLoc: "LOCATION / ROOM",
    colStatus: "STATUS",
    statusConnected: "CONNECTED",
    statusDisconnected: "DISCONNECTED",
    statusDemo: "DEMO MODE",
    noEventsNotice: "CONGRATULATIONS. NO MEETINGS TODAY",
    noAccountNotice: "NOTICE: CALENDARS CONFIGURATION REQUIRED",
    noAccountSubnotice: "OPEN CONFIGURATION AT TOP-RIGHT TO ADD CALENDARS",
    upcomingHeader: "UPCOMING",
    lblFilterTitle: "CALENDAR:",
    lblFilterAll: "ALL",
    lblCustomTitle: "Board Title:",
    customTitlePlaceholder: "MEETING INFORMATION",
    customTitleHelp: "Customize the main title shown in the top-left corner.",
    statusInProgress: "BOARDING",
    statusSoon: "SOON",
    statusOnTime: "ON TIME",
    statusFinished: "DEPARTED",
    allDay: "ALL DAY",
    modalTitle: "Board Settings",
    lblLanguage: "Board Language:",
    lblDemoMode: "Demo mode (simulated meetings):",
    lblCalendarsTitle: "Synced Calendars:",
    calPlaceholder: "iCal (.ics) address or JSON file (e.g. secrets/calendar-jlmonte.json)",
    calendarsHelpText: "Add your calendars using the Secret address in iCal format (.ics) or Power Automate JSON files (e.g. secrets/calendar-jlmonte.json). Toggle the checkbox to choose which ones appear on the board.",
    btnDeleteCalConfirm: "Are you sure you want to delete this calendar?",
    lblRefreshInterval: "Auto-refresh frequency:",
    optRefresh30: "Every 30 seconds",
    optRefresh60: "Every 1 minute (Recommended)",
    optRefresh120: "Every 2 minutes",
    optRefresh300: "Every 5 minutes",
    lblSound: "Mechanical letter sound effect:",
    btnApplyAndClose: "Apply and Close"
  }
};

// Alfabet mecànic
const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:/-_#&@!?()Ç";

// Estat global
const state = {
  lang: localStorage.getItem("mv_lang") || "ca",
  customTitle: localStorage.getItem("mv_custom_title") || "",
  soundEnabled: localStorage.getItem("mv_sound") !== "false",
  demoMode: localStorage.getItem("mv_demo") === "true",
  calendars: (() => {
    try {
      const stored = localStorage.getItem("mv_calendars");
      if (stored) return JSON.parse(stored);
      const oldUrl = localStorage.getItem("mv_ical_url");
      if (oldUrl) {
        return [{ id: '1', name: 'Principal', url: oldUrl, enabled: true }];
      }
      return [];
    } catch (e) {
      return [];
    }
  })(),
  refreshIntervalSec: parseInt(localStorage.getItem("mv_refresh_sec") || "60", 10),
  calendarTimer: null,
  selectedCalendarFilter: 'ALL',
  events: [],
  rowsCount: 8,
  colLengths: {
    time: 10,
    event: 30,
    loc: 18,
    status: 11
  },
  boardRows: [],
  tickerFlaps: [],
  audioCtx: null,
  audioUnlocked: false,
  activeFlippers: 0
};

// =========================================================================
// MOTOR ACÚSTIC MECÀNIC SPLIT-FLAP (Inspirat en Solari / Hakodate Airport)
// =========================================================================

const soundEngine = {
  compressor: null,
  masterGain: null,
  impulseBuffers: {},
  sampleBuffer: null,
  flutterTimer: null,
  lastLatchTime: 0,
  isInitialized: false,

  init(ctx) {
    if (!ctx || this.isInitialized) return;

    try {
      // 1. Dinàmica Màster: Compressor per unificar el volum col·lectiu i evitar distorsió
      this.compressor = ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, ctx.currentTime);
      this.compressor.knee.setValueAtTime(6, ctx.currentTime);
      this.compressor.ratio.setValueAtTime(7, ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.002, ctx.currentTime);
      this.compressor.release.setValueAtTime(0.05, ctx.currentTime);

      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.70, ctx.currentTime);

      this.compressor.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      // 2. Precomputar banc d'impulsos acústics realistes de policarbonat/xapa
      const sampleRate = ctx.sampleRate || 44100;
      this.impulseBuffers.sharp = this.createImpulseBuffer(ctx, sampleRate, 'sharp');
      this.impulseBuffers.hollow = this.createImpulseBuffer(ctx, sampleRate, 'hollow');
      this.impulseBuffers.edge = this.createImpulseBuffer(ctx, sampleRate, 'edge');
      this.impulseBuffers.latch = this.createImpulseBuffer(ctx, sampleRate, 'latch');

      this.isInitialized = true;

      // 3. Comprovar si hi ha una gravació real d'àudio a la carpeta www/snd/ (ex: flap.mp3 o sample_preview.wav)
      this.loadExternalRecording(ctx);
    } catch (e) {
      console.warn('[SoundEngine] Init warning:', e);
    }
  },

  async loadExternalRecording(ctx) {
    const candidateFiles = ['snd/flap.mp3', 'snd/flap.wav', 'snd/sample_preview.wav'];
    for (const url of candidateFiles) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const ab = await res.arrayBuffer();
          this.sampleBuffer = await ctx.decodeAudioData(ab);
          console.log(`[SoundEngine] S'ha carregat la gravació d'àudio autèntica: ${url}`);
          break;
        }
      } catch (err) {
        // Continua al següent candidat
      }
    }
  },

  createImpulseBuffer(ctx, sampleRate, type) {
    const duration = type === 'latch' ? 0.024 : 0.014;
    const length = Math.floor(sampleRate * duration);
    const audioBuffer = ctx.createBuffer(1, length, sampleRate);
    const data = audioBuffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      let s = 0;

      if (type === 'sharp') {
        // Cop sec de làmina prima de plàstic
        const env = Math.exp(-t * 420);
        const noise = (Math.random() * 2 - 1) * 0.65;
        const resonance = Math.sin(2 * Math.PI * 3800 * t) * 0.45;
        s = (noise + resonance) * env;
        if (t > 0.0035) {
          const tb = t - 0.0035;
          s += (Math.random() * 2 - 1) * Math.exp(-tb * 480) * 0.35;
        }
      } else if (type === 'hollow') {
        // Ressonància de caixa buida
        const env = Math.exp(-t * 340);
        const noise = (Math.random() * 2 - 1) * 0.5;
        const body = Math.sin(2 * Math.PI * 2200 * t) * 0.35 + Math.sin(2 * Math.PI * 650 * t) * 0.25;
        s = (noise + body) * env;
      } else if (type === 'edge') {
        // Frec de vora i aire
        const env = Math.exp(-t * 560);
        const noise = (Math.random() * 2 - 1) * 0.85;
        const snap = Math.sin(2 * Math.PI * 4600 * t) * 0.35;
        s = (noise + snap) * env;
      } else {
        // Latch: parada / ancoratge final
        const env = Math.exp(-t * 220);
        const noise = (Math.random() * 2 - 1) * 0.4;
        const thud = Math.sin(2 * Math.PI * 1300 * t) * 0.4 + Math.sin(2 * Math.PI * 420 * t) * 0.3;
        s = (noise + thud) * env;
      }

      data[i] = Math.max(-1, Math.min(1, s));
    }
    return audioBuffer;
  },

  playImpulse(type = 'sharp', customGain = 0.4, pitchShift = 1.0) {
    if (!state.soundEnabled || !state.audioUnlocked || !state.audioCtx || state.audioCtx.state !== 'running') {
      return;
    }

    const ctx = state.audioCtx;
    if (!this.isInitialized) {
      this.init(ctx);
    }

    try {
      const buffer = this.impulseBuffers[type] || this.impulseBuffers.sharp;
      if (!buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = pitchShift;

      const gain = ctx.createGain();
      gain.gain.value = customGain;

      source.connect(gain);
      gain.connect(this.compressor || ctx.destination);

      source.start();
    } catch (e) {}
  },

  onFlapMotionStart() {
    state.activeFlippers++;
    if (!this.flutterTimer) {
      this.startFlutterLoop();
    }
  },

  onFlapMotionEnd() {
    state.activeFlippers = Math.max(0, state.activeFlippers - 1);
    if (state.activeFlippers === 0 && this.flutterTimer) {
      clearTimeout(this.flutterTimer);
      this.flutterTimer = null;
    }
    this.playLandingLatch();
  },

  startFlutterLoop() {
    if (!state.soundEnabled || !state.audioUnlocked) return;

    const tick = () => {
      if (state.activeFlippers <= 0) {
        this.flutterTimer = null;
        return;
      }

      // Si tenim gravació externa d'àudio carregada
      if (this.sampleBuffer && state.audioCtx) {
        this.playSampleSlice();
      } else {
        // Motor físic procedural d'alta fidelitat (Solari style)
        const pool = ['sharp', 'hollow', 'edge'];
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        const pitchJitter = 0.92 + Math.random() * 0.16;
        const dynamicGain = 0.30 + Math.min(0.35, state.activeFlippers * 0.015);
        this.playImpulse(chosen, dynamicGain, pitchJitter);
      }

      // Cadència mecànica: interval continu estètic (20ms - 34ms)
      const nextDelay = 20 + Math.floor(Math.random() * 14);
      this.flutterTimer = setTimeout(tick, nextDelay);
    };

    tick();
  },

  playSampleSlice() {
    const ctx = state.audioCtx;
    if (!ctx || !this.sampleBuffer) return;
    try {
      const src = ctx.createBufferSource();
      src.buffer = this.sampleBuffer;
      const dur = this.sampleBuffer.duration;
      const offset = dur > 0.15 ? Math.random() * (dur - 0.05) : 0;
      src.playbackRate.value = 0.94 + Math.random() * 0.12;

      const g = ctx.createGain();
      g.gain.value = 0.45;

      src.connect(g);
      g.connect(this.compressor || ctx.destination);
      src.start(0, offset, 0.04);
    } catch (e) {}
  },

  playLandingLatch() {
    const now = performance.now();
    if (now - this.lastLatchTime < 18) return;
    this.lastLatchTime = now;

    this.playImpulse('latch', 0.50, 0.96 + Math.random() * 0.08);
  }
};

/**
 * Desbloqueja l'àudio exclusivament en resposta a un gest real de l'usuari.
 * Això compleix estrictament l'Autoplay Policy de Chrome/Edge.
 */
function userGestureUnlockAudio() {
  if (state.audioUnlocked && state.audioCtx && state.audioCtx.state === "running") {
    return;
  }

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!state.audioCtx) {
      state.audioCtx = new AudioContext();
    }

    if (state.audioCtx.state === "suspended") {
      state.audioCtx.resume().then(() => {
        state.audioUnlocked = true;
        soundEngine.init(state.audioCtx);
      }).catch(() => {});
    } else {
      state.audioUnlocked = true;
      soundEngine.init(state.audioCtx);
    }
  } catch (e) {
    // Es gestionarà en el proper gest de l'usuari
  }
}

/**
 * Força el gir en cascada de tot el panell (amb efecte sonor)
 */
function flipEntireBoard() {
  state.boardRows.forEach(row => {
    ['time', 'event', 'loc', 'status'].forEach(col => {
      if (row[col]) {
        row[col].forEach(flap => {
          flap.dataset.char = '';
        });
      }
    });
  });
  renderBoard();
}

// Escolta el primer gest d'usuari a la finestra per activar l'àudio
['pointerdown', 'click', 'keydown', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, userGestureUnlockAudio, { passive: true });
});

// Àlies per compatibilitat
const initAudio = userGestureUnlockAudio;
function playMechanicalClack() {
  soundEngine.playImpulse('sharp');
}

// Ràfega de prova de so (simula el gir d'una fitxa amb el repic mecànic)
function playTestSoundBurst() {
  userGestureUnlockAudio();
  if (state.audioCtx) soundEngine.init(state.audioCtx);
  state.activeFlippers = 10;
  soundEngine.startFlutterLoop();
  setTimeout(() => {
    state.activeFlippers = 0;
    soundEngine.playLandingLatch();
  }, 420);
}

// =========================================================================
// MOTOR SPLIT-FLAP (Lletres mecàniques d'alta visibilitat)
// =========================================================================

function normalizeChar(char) {
  if (!char) return ' ';
  let c = char.toUpperCase();
  if (c === 'Á' || c === 'À') c = 'A';
  else if (c === 'É' || c === 'È') c = 'E';
  else if (c === 'Í' || c === 'Ï') c = 'I';
  else if (c === 'Ó' || c === 'Ò') c = 'O';
  else if (c === 'Ú' || c === 'Ü') c = 'U';
  else if (c === 'Ñ') c = 'N';
  return FLAP_CHARS.includes(c) ? c : ' ';
}

function createFlapUnit(initialChar = ' ') {
  const unit = document.createElement('div');
  unit.className = 'flap-unit';
  
  const span = document.createElement('span');
  span.className = 'flap-char';
  span.textContent = initialChar;
  
  unit.appendChild(span);
  unit.dataset.char = initialChar;
  return unit;
}

function animateFlap(flapUnit, targetChar, colorClass = '', speedIndex = 0) {
  targetChar = normalizeChar(targetChar);
  const currentChar = flapUnit.dataset.char || ' ';

  flapUnit.classList.remove('color-yellow', 'color-green', 'color-red', 'color-dim');
  if (colorClass) flapUnit.classList.add(colorClass);

  if (currentChar === targetChar) {
    flapUnit.querySelector('.flap-char').textContent = targetChar;
    return;
  }

  flapUnit.classList.add('flipping');
  soundEngine.onFlapMotionStart();
  const steps = 3 + (speedIndex % 3);
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    if (currentStep < steps) {
      const randChar = FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
      flapUnit.querySelector('.flap-char').textContent = randChar;
    } else {
      clearInterval(interval);
      flapUnit.querySelector('.flap-char').textContent = targetChar;
      flapUnit.dataset.char = targetChar;
      flapUnit.classList.remove('flipping');
      soundEngine.onFlapMotionEnd();
    }
  }, 35 + (speedIndex % 4) * 12);
}

function updateFlapGroup(flapUnits, text, maxLength, colorClass = '') {
  const normText = (text || '').padEnd(maxLength, ' ').slice(0, maxLength);
  for (let i = 0; i < maxLength; i++) {
    if (flapUnits[i]) {
      const targetChar = normText[i] || ' ';
      animateFlap(flapUnits[i], targetChar, colorClass, i);
    }
  }
}

// =========================================================================
// CONSTRUCCIÓ I DIMENSIONAMENT DEL PANELL
// =========================================================================

function buildBoardStructure() {
  const boardBody = document.getElementById('boardBody');
  boardBody.innerHTML = '';
  state.boardRows = [];

  const bodyHeight = boardBody.clientHeight || (window.innerHeight - 170);
  const bodyWidth = boardBody.clientWidth || (window.innerWidth - 40);

  // Alçada òptima de fila per a màxima visibilitat
  const idealRowHeight = Math.max(42, Math.min(56, Math.floor(bodyHeight / 8)));
  state.rowsCount = Math.max(4, Math.floor(bodyHeight / idealRowHeight));

  // Ample òptim de fitxa: entre 20px i 26px
  const flapWidth = Math.max(19, Math.min(27, Math.floor(bodyWidth / 75)));

  state.colLengths.time = 10;
  state.colLengths.status = 11;

  const timeColWidth = state.colLengths.time * (flapWidth + 3);
  const statusColWidth = state.colLengths.status * (flapWidth + 3);

  // Sincronitzar amples de capçaleres de columna
  const headTime = document.getElementById('colHeadTime');
  if (headTime) headTime.style.width = `${timeColWidth}px`;
  const headStatus = document.getElementById('colHeadStatus');
  if (headStatus) headStatus.style.width = `${statusColWidth}px`;

  // Calcular quantes fitxes hi caben a CONVOCATÒRIA i LLOC per omplir completament l'espai
  // Ample fix: TIME + STATUS + LED (36px) + Gaps i padding (~70px)
  const remainingWidth = Math.max(300, bodyWidth - (timeColWidth + statusColWidth + 36 + 70));
  const totalFlexChars = Math.floor(remainingWidth / (flapWidth + 3));
  
  // 60% per a CONVOCATÒRIA, 40% per a LLOC
  state.colLengths.event = Math.max(16, Math.floor(totalFlexChars * 0.62));
  state.colLengths.loc = Math.max(10, Math.floor(totalFlexChars * 0.38));

  for (let r = 0; r < state.rowsCount; r++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'board-row';

    // Columna HORA
    const colTime = document.createElement('div');
    colTime.className = 'row-col-time';
    colTime.style.width = `${timeColWidth}px`;
    const timeFlaps = [];
    for (let i = 0; i < state.colLengths.time; i++) {
      const flap = createFlapUnit();
      colTime.appendChild(flap);
      timeFlaps.push(flap);
    }

    // Columna CONVOCATÒRIA
    const colEvent = document.createElement('div');
    colEvent.className = 'row-col-event';
    const eventFlaps = [];
    for (let i = 0; i < state.colLengths.event; i++) {
      const flap = createFlapUnit();
      colEvent.appendChild(flap);
      eventFlaps.push(flap);
    }

    // Columna LLOC
    const colLoc = document.createElement('div');
    colLoc.className = 'row-col-loc';
    const locFlaps = [];
    for (let i = 0; i < state.colLengths.loc; i++) {
      const flap = createFlapUnit();
      colLoc.appendChild(flap);
      locFlaps.push(flap);
    }

    // Columna ESTAT
    const colStatus = document.createElement('div');
    colStatus.className = 'row-col-status';
    colStatus.style.width = `${statusColWidth}px`;
    const statusFlaps = [];
    for (let i = 0; i < state.colLengths.status; i++) {
      const flap = createFlapUnit();
      colStatus.appendChild(flap);
      statusFlaps.push(flap);
    }

    // Columna LED
    const colLed = document.createElement('div');
    colLed.className = 'row-col-led';
    const led = document.createElement('div');
    led.className = 'led-indicator';
    colLed.appendChild(led);

    rowDiv.appendChild(colTime);
    rowDiv.appendChild(colEvent);
    rowDiv.appendChild(colLoc);
    rowDiv.appendChild(colStatus);
    rowDiv.appendChild(colLed);

    boardBody.appendChild(rowDiv);

    state.boardRows.push({
      time: timeFlaps,
      event: eventFlaps,
      loc: locFlaps,
      status: statusFlaps,
      led: led
    });
  }

  // Ajustar estil i mida de font de totes les fitxes
  adjustFlapDimensions(flapWidth, idealRowHeight);
}

function adjustFlapDimensions(flapWidth, rowHeight) {
  // Alçada de la fitxa és ~82% de l'alçada de la fila
  const flapHeight = Math.max(28, Math.floor(rowHeight * 0.82));
  // Mida de lletra: gran i ben proporcionada (omplint el 75% de la fitxa)
  const fontSize = Math.max(16, Math.min(26, Math.floor(flapHeight * 0.72)));

  document.querySelectorAll('.flap-unit').forEach(el => {
    el.style.width = `${flapWidth}px`;
    el.style.height = `${flapHeight}px`;
    el.style.fontSize = `${fontSize}px`;
  });
}

// =========================================================================
// SELECTOR RÀPID DE CALENDARIS (PEU INFERIOR)
// =========================================================================

function updateCalendarFilterBar() {
  const bar = document.getElementById('calendarFilterBar');
  const container = document.getElementById('filterPillsContainer');
  const lblTitle = document.getElementById('lblFilterTitle');
  if (!bar || !container) return;

  const t = I18N[state.lang] || I18N.ca;
  if (lblTitle) lblTitle.textContent = t.lblFilterTitle || 'CALENDARI:';

  // Obtenir calendaris actius
  let activeCals = (state.calendars || []).filter(c => c.enabled);

  // En mode demo, simulem 2 calendaris per poder provar
  if (state.demoMode) {
    activeCals = [
      { id: 'd1', name: 'FEINA' },
      { id: 'd2', name: 'PERSONAL' }
    ];
  }

  // Si no hi ha calendaris actius o configurats
  if (activeCals.length === 0) {
    container.innerHTML = '';
    const emptySpan = document.createElement('span');
    emptySpan.style.fontSize = '0.78rem';
    emptySpan.style.color = '#64748b';
    emptySpan.style.letterSpacing = '1px';
    emptySpan.textContent = (state.calendars && state.calendars.length > 0)
      ? '(CAP CALENDARI ACTIVAT)'
      : '(SENSE CALENDARIS CONFIGURATS)';
    container.appendChild(emptySpan);
    state.selectedCalendarFilter = 'ALL';
    return;
  }

  // Si l'opció anteriorment seleccionada ja no existeix
  if (state.selectedCalendarFilter !== 'ALL' && !activeCals.some(c => c.name === state.selectedCalendarFilter)) {
    state.selectedCalendarFilter = 'ALL';
  }

  // Si només hi ha 1 calendari actiu
  if (activeCals.length === 1) {
    container.innerHTML = '';
    const singleBtn = document.createElement('button');
    singleBtn.type = 'button';
    singleBtn.className = 'filter-pill active';
    singleBtn.textContent = activeCals[0].name;
    container.appendChild(singleBtn);
    state.selectedCalendarFilter = activeCals[0].name;
    return;
  }

  // Comprovar si ja tenim exactament els mateixos botons al DOM
  const existingButtons = Array.from(container.querySelectorAll('.filter-pill'));
  const targetNames = ['ALL', ...activeCals.map(c => c.name)];
  const existingKeys = existingButtons.map(b => b.dataset.calKey);

  const isSameStructure = existingKeys.length === targetNames.length &&
                          existingKeys.every((k, i) => k === targetNames[i]);

  if (isSameStructure) {
    // Si l'estructura és la mateixa, només actualitzem la classe .active sense tocar el DOM!
    existingButtons.forEach(btn => {
      const isSelected = (btn.dataset.calKey === state.selectedCalendarFilter);
      btn.classList.toggle('active', isSelected);
    });
    return;
  }

  // Si ha canviat la llista de calendaris, regenerem els botons
  container.innerHTML = '';

  // Pestanya [ TOTS ]
  const btnAll = document.createElement('button');
  btnAll.type = 'button';
  btnAll.dataset.calKey = 'ALL';
  btnAll.className = 'filter-pill' + (state.selectedCalendarFilter === 'ALL' ? ' active' : '');
  btnAll.textContent = t.lblFilterAll || 'TOTS';
  btnAll.addEventListener('click', () => {
    if (state.selectedCalendarFilter !== 'ALL') {
      state.selectedCalendarFilter = 'ALL';
      playMechanicalClack();
      updateCalendarFilterBar();
      renderBoard();
    }
  });
  container.appendChild(btnAll);

  // Pestanya per a cada calendari actiu
  activeCals.forEach(cal => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.calKey = cal.name;
    btn.className = 'filter-pill' + (state.selectedCalendarFilter === cal.name ? ' active' : '');
    btn.textContent = cal.name;
    btn.addEventListener('click', () => {
      if (state.selectedCalendarFilter !== cal.name) {
        state.selectedCalendarFilter = cal.name;
        playMechanicalClack();
        updateCalendarFilterBar();
        renderBoard();
      }
    });
    container.appendChild(btn);
  });
}

// =========================================================================
// RENDERITZACIÓ DE DADES
// =========================================================================

function renderBoard() {
  const t = I18N[state.lang];
  const hasActiveCalendars = state.calendars && state.calendars.some(c => c.enabled);

  updateCalendarFilterBar();

  // Si no té calendaris actius ni mode demo
  if (!state.demoMode && !hasActiveCalendars) {
    renderUnconfiguredState();
    return;
  }

  let eventsToShow = [];
  if (state.demoMode) {
    eventsToShow = generateDemoEvents();
  } else {
    eventsToShow = state.events || [];
  }

  // Filtrar pel calendari seleccionat a la barra superior
  if (state.selectedCalendarFilter !== 'ALL') {
    eventsToShow = eventsToShow.filter(e => e.calendarName === state.selectedCalendarFilter);
  }

  if (eventsToShow.length === 0) {
    renderNoEventsState();
    return;
  }

  updateBoardHeaders();

  const now = new Date();
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const todayEvents = [];
  const futureEvents = [];

  eventsToShow.forEach(ev => {
    const evStart = new Date(ev.start);
    const evEnd = new Date(ev.end || ev.start);
    // És d'avui si comença o acaba avui o està en curs
    if (isSameDay(evStart, now) || (evStart <= now && evEnd >= now)) {
      todayEvents.push(ev);
    } else if (evStart > now) {
      futureEvents.push(ev);
    }
  });

  // Construir la llista de files del panell
  const rowsData = [];

  // 1. Convocatòries d'avui
  todayEvents.forEach(ev => {
    rowsData.push({ type: 'today', event: ev });
  });

  // 2. Línia separadora i convocatòries de futur
  if (futureEvents.length > 0) {
    rowsData.push({ type: 'separator', title: t.upcomingHeader || 'PREVISTES' });
    futureEvents.forEach(ev => {
      rowsData.push({ type: 'future', event: ev });
    });
  }

  for (let r = 0; r < state.rowsCount; r++) {
    const rowRef = state.boardRows[r];
    if (!rowRef) continue;

    if (r < rowsData.length) {
      const item = rowsData[r];

      if (item.type === 'today') {
        const ev = item.event;
        const timing = computeEventStatus(ev, now);
        const isAllDay = (timing.timeStr === (t.allDay || 'TOT EL DIA'));

        // Si és una hora curta (ex: "10:30"), la centrem a la columna de 10 caràcters
        let displayTime = timing.timeStr;
        if (!isAllDay && displayTime.length < state.colLengths.time) {
          displayTime = displayTime.padStart(Math.floor((state.colLengths.time + displayTime.length) / 2), ' ').padEnd(state.colLengths.time, ' ');
        }

        updateFlapGroup(rowRef.time, displayTime, state.colLengths.time, isAllDay ? 'color-yellow' : '');
        updateFlapGroup(rowRef.event, ev.title, state.colLengths.event);
        updateFlapGroup(rowRef.loc, ev.location || '---', state.colLengths.loc);
        updateFlapGroup(rowRef.status, timing.statusText, state.colLengths.status, timing.colorClass);
        rowRef.led.className = `led-indicator ${timing.ledClass}`;
      } else if (item.type === 'separator') {
        const sepText = `--- ${item.title} ---`;
        updateFlapGroup(rowRef.time, '>>', state.colLengths.time, 'color-yellow');
        updateFlapGroup(rowRef.event, sepText, state.colLengths.event, 'color-yellow');
        updateFlapGroup(rowRef.loc, 'CALENDAR', state.colLengths.loc, 'color-yellow');
        updateFlapGroup(rowRef.status, item.title, state.colLengths.status, 'color-yellow');
        rowRef.led.className = 'led-indicator yellow';
      } else if (item.type === 'future') {
        const ev = item.event;
        const evStart = new Date(ev.start);
        const evEnd = new Date(ev.end || ev.start);

        // Columna Time mostra la data: DD/MM centrada en 10 caràcters
        const d = String(evStart.getDate()).padStart(2, '0');
        const m = String(evStart.getMonth() + 1).padStart(2, '0');
        const rawDate = `${d}/${m}`;
        const dateStr = rawDate.padStart(Math.floor((state.colLengths.time + rawDate.length) / 2), ' ').padEnd(state.colLengths.time, ' ');

        // Columna Status mostra l'hora d'inici prevista o 'TOT EL DIA'
        const hh = String(evStart.getHours()).padStart(2, '0');
        const mm = String(evStart.getMinutes()).padStart(2, '0');
        const durationH = (evEnd - evStart) / 3600000;
        const isAllDay = ev.isAllDay || ((hh === '00' && mm === '00') && (durationH >= 20 || durationH === 0));

        let timeStr = isAllDay ? (t.allDay || 'TOT EL DIA') : `${hh}:${mm}`;

        updateFlapGroup(rowRef.time, dateStr, state.colLengths.time, 'color-yellow');
        updateFlapGroup(rowRef.event, ev.title, state.colLengths.event);
        updateFlapGroup(rowRef.loc, ev.location || '---', state.colLengths.loc);
        updateFlapGroup(rowRef.status, timeStr, state.colLengths.status, 'color-green');
        rowRef.led.className = 'led-indicator green';
      }
    } else {
      updateFlapGroup(rowRef.time, ' ', state.colLengths.time);
      updateFlapGroup(rowRef.event, ' ', state.colLengths.event);
      updateFlapGroup(rowRef.loc, ' ', state.colLengths.loc);
      updateFlapGroup(rowRef.status, ' ', state.colLengths.status);
      rowRef.led.className = 'led-indicator';
    }
  }
}

function renderUnconfiguredState() {
  const t = I18N[state.lang];
  updateBoardHeaders();

  for (let r = 0; r < state.rowsCount; r++) {
    const rowRef = state.boardRows[r];
    if (!rowRef) continue;

    if (r === 1) {
      updateFlapGroup(rowRef.time, '!', state.colLengths.time, 'color-yellow');
      updateFlapGroup(rowRef.event, t.noAccountNotice, state.colLengths.event, 'color-yellow');
      updateFlapGroup(rowRef.loc, 'CONFIG', state.colLengths.loc, 'color-yellow');
      updateFlapGroup(rowRef.status, 'AVIS', state.colLengths.status, 'color-yellow');
      rowRef.led.className = 'led-indicator yellow blink';
    } else if (r === 2) {
      updateFlapGroup(rowRef.time, '->', state.colLengths.time, 'color-yellow');
      updateFlapGroup(rowRef.event, t.noAccountSubnotice, state.colLengths.event, 'color-yellow');
      updateFlapGroup(rowRef.loc, 'DALT DRETA', state.colLengths.loc);
      updateFlapGroup(rowRef.status, 'CONFIG', state.colLengths.status);
      rowRef.led.className = 'led-indicator yellow';
    } else {
      updateFlapGroup(rowRef.time, ' ', state.colLengths.time);
      updateFlapGroup(rowRef.event, ' ', state.colLengths.event);
      updateFlapGroup(rowRef.loc, ' ', state.colLengths.loc);
      updateFlapGroup(rowRef.status, ' ', state.colLengths.status);
      rowRef.led.className = 'led-indicator';
    }
  }
}

function renderNoEventsState() {
  const t = I18N[state.lang];
  updateBoardHeaders();

  for (let r = 0; r < state.rowsCount; r++) {
    const rowRef = state.boardRows[r];
    if (!rowRef) continue;

    if (r === 1) {
      updateFlapGroup(rowRef.time, 'OK', state.colLengths.time, 'color-green');
      updateFlapGroup(rowRef.event, t.noEventsNotice, state.colLengths.event, 'color-yellow');
      updateFlapGroup(rowRef.loc, 'CALENDAR', state.colLengths.loc);
      updateFlapGroup(rowRef.status, 'A TEMPS', state.colLengths.status, 'color-green');
      rowRef.led.className = 'led-indicator green';
    } else {
      updateFlapGroup(rowRef.time, ' ', state.colLengths.time);
      updateFlapGroup(rowRef.event, ' ', state.colLengths.event);
      updateFlapGroup(rowRef.loc, ' ', state.colLengths.loc);
      updateFlapGroup(rowRef.status, ' ', state.colLengths.status);
      rowRef.led.className = 'led-indicator';
    }
  }
}

function updateBoardHeaders() {
  const t = I18N[state.lang] || I18N.ca;
  const custom = (state.customTitle || '').trim();
  document.getElementById('lblBoardTitle').textContent = custom ? custom.toUpperCase() : t.boardTitle;
  document.getElementById('colHeadTime').textContent = t.colTime;
  document.getElementById('colHeadEvent').textContent = t.colEvent;
  document.getElementById('colHeadLoc').textContent = t.colLoc;
  document.getElementById('colHeadStatus').textContent = t.colStatus;

  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');

  const hasActiveCalendars = state.calendars && state.calendars.some(c => c.enabled);
  statusDot.className = 'status-dot';
  if (state.demoMode) {
    statusDot.classList.add('demo');
    statusText.textContent = t.statusDemo;
  } else if (hasActiveCalendars) {
    statusDot.classList.add('connected');
    statusText.textContent = t.statusConnected;
  } else {
    statusDot.classList.add('disconnected');
    statusText.textContent = t.statusDisconnected;
  }
}

function computeEventStatus(ev, now) {
  const t = I18N[state.lang] || I18N.ca;

  const start = new Date(ev.start);
  const end = new Date(ev.end || ev.start);
  const hours = String(start.getHours()).padStart(2, '0');
  const minutes = String(start.getMinutes()).padStart(2, '0');
  const isMidnight = (hours === '00' && minutes === '00');
  const durationHours = (end - start) / 3600000;
  const isAllDay = ev.isAllDay || (isMidnight && (durationHours >= 20 || durationHours === 0));

  if (isAllDay) {
    return {
      timeStr: t.allDay || 'TOT EL DIA',
      statusText: t.allDay || 'TOT EL DIA',
      colorClass: 'color-green',
      ledClass: 'green'
    };
  }

  const diffStartMin = (start - now) / 60000;
  const diffEndMin = (end - now) / 60000;
  const timeStr = `${hours}:${minutes}`;

  // En curs (groc parpellejant)
  if (diffStartMin <= 0 && diffEndMin > 0) {
    return {
      timeStr,
      statusText: t.statusInProgress,
      colorClass: 'color-yellow',
      ledClass: 'yellow blink'
    };
  }

  // Aviat (< 15 minuts)
  if (diffStartMin > 0 && diffStartMin <= 15) {
    return {
      timeStr,
      statusText: t.statusSoon,
      colorClass: 'color-yellow',
      ledClass: 'yellow'
    };
  }

  // A temps (futura)
  if (diffStartMin > 15) {
    return {
      timeStr,
      statusText: t.statusOnTime,
      colorClass: 'color-green',
      ledClass: 'green'
    };
  }

  // Ja acabada
  return {
    timeStr,
    statusText: t.statusFinished,
    colorClass: 'color-dim',
    ledClass: ''
  };
}

// =========================================================================
// RELLOTGE DIGITAL DE L'ESTACIÓ
// =========================================================================
function startClock() {
  const clockTime = document.getElementById('clockTime');
  const clockDate = document.getElementById('clockDate');

  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockTime) clockTime.textContent = `${h}:${m}:${s}`;

    const langLocale = state.lang === 'ca' ? 'ca-ES' : state.lang === 'es' ? 'es-ES' : 'en-US';
    if (clockDate) {
      clockDate.textContent = now.toLocaleDateString(langLocale, {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
    }
  }

  update();
  setInterval(update, 1000);
}

// =========================================================================
// DADES DE PROVA (DEMO)
// =========================================================================
function generateDemoEvents() {
  const now = new Date();
  const formatTime = (offsetMin) => new Date(now.getTime() + offsetMin * 60000).toISOString();

  return [
    {
      title: "REUNIÓ EQUIP PROJECTE ALFA",
      location: "SALA 104 / MEET",
      calendarName: "FEINA",
      start: formatTime(-5),
      end: formatTime(45),
      isAllDay: false
    },
    {
      title: "SINCRONITZACIÓ DE DISSENY",
      location: "SALA BARCELONA",
      calendarName: "FEINA",
      start: formatTime(12),
      end: formatTime(60),
      isAllDay: false
    },
    {
      title: "METGE VISITA DENTAL",
      location: "CLINICA CENTRAL",
      calendarName: "PERSONAL",
      start: formatTime(65),
      end: formatTime(120),
      isAllDay: false
    },
    {
      title: "JORNADA D'INNOVACIÓ DIGITAL",
      location: "AUDITORI / TOT EL DIA",
      calendarName: "FEINA",
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString(),
      isAllDay: true
    },
    // Convocatòries futures (Previstes)
    {
      title: "REVISIÓ TRIMESTRAL OKR",
      location: "ONLINE TEAMS",
      calendarName: "FEINA",
      start: formatTime(24 * 60 + 60), // Demà
      end: formatTime(24 * 60 + 120),
      isAllDay: false
    },
    {
      title: "SOPAR ANIVERSARI FAMÍLIA",
      location: "RESTAURANT PORT",
      calendarName: "PERSONAL",
      start: formatTime(24 * 60 + 180), // Demà
      end: formatTime(24 * 60 + 240),
      isAllDay: false
    },
    {
      title: "DINAR DE COORDINACIÓ",
      location: "CAFETERIA CENTRAL",
      calendarName: "FEINA",
      start: formatTime(48 * 60 + 120), // Demà passat
      end: formatTime(48 * 60 + 180),
      isAllDay: false
    }
  ];
}

// =========================================================================
// PARSER I SINCRONITZACIÓ ICAL (.ICS)
// =========================================================================

function parseICSDate(str) {
  if (!str) return new Date().toISOString();
  // Treure el nom del camp (ex: DTSTART;TZID=...:20261115T183000)
  const clean = str.includes(':') ? str.split(':').slice(1).join(':').trim() : str.trim();

  // Format només data YYYYMMDD (tot el dia)
  if (clean.length === 8 && !clean.includes('T')) {
    const y = parseInt(clean.slice(0, 4), 10);
    const m = parseInt(clean.slice(4, 6), 10) - 1;
    const d = parseInt(clean.slice(6, 8), 10);
    return new Date(y, m, d).toISOString();
  }

  // Format amb hora YYYYMMDDTHHMMSS
  const tIndex = clean.indexOf('T');
  if (tIndex >= 8) {
    const y = parseInt(clean.slice(0, 4), 10);
    const m = parseInt(clean.slice(4, 6), 10) - 1;
    const d = parseInt(clean.slice(6, 8), 10);
    const h = parseInt(clean.slice(tIndex + 1, tIndex + 3) || 0, 10);
    const min = parseInt(clean.slice(tIndex + 3, tIndex + 5) || 0, 10);
    const s = parseInt(clean.slice(tIndex + 5, tIndex + 7) || 0, 10);

    if (clean.endsWith('Z')) {
      return new Date(Date.UTC(y, m, d, h, min, s)).toISOString();
    }
    return new Date(y, m, d, h, min, s).toISOString();
  }

  return new Date(clean).toISOString();
}

function parseICS(icsText) {
  const events = [];
  // Unfold lines segons RFC 5545
  const cleanIcs = (icsText || '').replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
  const lines = cleanIcs.split(/\r\n|\n|\r/);
  let cur = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line === 'BEGIN:VEVENT') {
      cur = { title: '(Sense títol)', location: '---', isAllDay: false };
    } else if (line === 'END:VEVENT') {
      if (cur && cur.start) {
        if (!cur.end) cur.end = cur.start;
        // Si comença a les 00:00 i dura 20h+ o 0h, o no té hora, marcar com a tot el dia
        const sDate = new Date(cur.start);
        const eDate = new Date(cur.end);
        if (sDate.getHours() === 0 && sDate.getMinutes() === 0) {
          const durH = (eDate - sDate) / 3600000;
          if (durH >= 20 || durH === 0) {
            cur.isAllDay = true;
          }
        }
        events.push(cur);
      }
      cur = null;
    } else if (cur) {
      if (line.startsWith('SUMMARY')) {
        const parts = line.split(':');
        cur.title = parts.slice(1).join(':').replace(/\\,/g, ',').replace(/\\n/g, ' ').replace(/\\\\/g, '\\').trim();
      } else if (line.startsWith('LOCATION')) {
        const parts = line.split(':');
        cur.location = parts.slice(1).join(':').replace(/\\,/g, ',').replace(/\\n/g, ' ').replace(/\\\\/g, '\\').trim();
      } else if (line.startsWith('DTSTART')) {
        cur.start = parseICSDate(line);
        // Correcta comprovació de tot el dia: VALUE=DATE o la part de data sense 'T'
        const colonIdx = line.indexOf(':');
        const valPart = colonIdx !== -1 ? line.slice(colonIdx + 1).trim() : line.trim();
        cur.isAllDay = line.includes('VALUE=DATE') || !valPart.includes('T');
      } else if (line.startsWith('DTEND')) {
        cur.end = parseICSDate(line);
      }
    }
  }

  // Filtrar per al dia d'avui en endavant (des de les 00:00 d'avui)
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const filtered = events
    .filter(e => {
      const eventTime = new Date(e.end || e.start).getTime();
      return !isNaN(eventTime) && eventTime >= startOfToday;
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  console.log(`[iCal] Parsejats: ${events.length} totals -> ${filtered.length} d'avui/futurs:`, filtered);
  return filtered;
}

// =========================================================================
// GESTIÓ MULTI-CALENDARI (ICAL / .ICS I POWER AUTOMATE JSON)
// =========================================================================

function saveCalendars() {
  localStorage.setItem("mv_calendars", JSON.stringify(state.calendars));
}

/**
 * Processador d'esdeveniments per a estructures JSON (Power Automate, Microsoft Graph, etc.)
 */
function parseJSONEvents(jsonText, calName) {
  let items = [];
  try {
    const clean = (typeof jsonText === 'string' ? jsonText : '').replace(/^\uFEFF/, '').trim();
    const parsed = typeof jsonText === 'object' ? jsonText : JSON.parse(clean);
    if (Array.isArray(parsed)) {
      items = parsed;
    } else if (parsed && Array.isArray(parsed.value)) {
      items = parsed.value;
    } else if (parsed && Array.isArray(parsed.events)) {
      items = parsed.events;
    }
  } catch (e) {
    console.error(`[JSON Calendar] Error parsejant dades de ${calName}:`, e);
    return [];
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const events = [];
  items.forEach(item => {
    if (!item) return;
    const title = (item.subject || item.title || item.summary || "(Sense títol)").trim();
    let location = (item.location || item.loc || "").trim();
    if (!location && (item.isOnlineMeeting || item.onlineMeetingUrl)) {
      location = "TEAMS";
    }
    if (!location) location = "---";

    let start = item.start;
    if (start && typeof start === 'object' && start.dateTime) start = start.dateTime;
    let end = item.end;
    if (end && typeof end === 'object' && end.dateTime) end = end.dateTime;

    if (!start) return;
    if (!end) end = start;

    let isAllDay = !!(item.allDay || item.isAllDay);
    const sDate = new Date(start);
    const eDate = new Date(end);
    if (sDate.getHours() === 0 && sDate.getMinutes() === 0) {
      const durH = (eDate - sDate) / 3600000;
      if (durH >= 20 || durH === 0) {
        isAllDay = true;
      }
    }

    const eventTime = eDate.getTime() || sDate.getTime();
    if (!isNaN(eventTime) && eventTime >= startOfToday) {
      events.push({
        title,
        location,
        start,
        end,
        isAllDay,
        calendarName: calName
      });
    }
  });

  return events;
}

async function fetchSingleCalendar(cal) {
  const url = (cal.url || '').trim();
  const calName = cal.name || 'Calendari';
  if (!url) return [];

  try {
    const endpoint = '/api/calendar?url=' + encodeURIComponent(url) + '&_t=' + Date.now();
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`[Calendar API] Error descarregant ${calName} (${url}): HTTP ${res.status}`);
      return [];
    }
    const rawText = await res.text();
    const clean = rawText.replace(/^\uFEFF/, '').trim();

    // Auto-detecció de format: JSON o iCal
    const isJson = (cal.type === 'json') || url.toLowerCase().includes('.json') || clean.startsWith('[') || clean.startsWith('{');

    if (isJson) {
      const evs = parseJSONEvents(clean, calName);
      console.log(`[JSON Calendar] Carregades ${evs.length} convocatòries de '${calName}'`);
      return evs;
    } else {
      const evs = parseICS(clean);
      return evs.map(e => ({
        ...e,
        calendarName: calName
      }));
    }
  } catch (err) {
    console.error(`[Calendar API] Error a ${calName}:`, err);
    return [];
  }
}

// Àlies per compatibilitat
const fetchSingleIcal = (url, name) => fetchSingleCalendar({ url, name });

async function fetchMultiCalendarEvents() {
  const activeCals = (state.calendars || []).filter(c => c.enabled && c.url);
  if (activeCals.length === 0) {
    state.events = [];
    renderBoard();
    return true;
  }

  try {
    const promises = activeCals.map(c => fetchSingleCalendar(c));
    const results = await Promise.all(promises);

    let all = [];
    results.forEach(list => {
      all = all.concat(list);
    });

    // Ordenar de forma unificada
    all.sort((a, b) => new Date(a.start) - new Date(b.start));

    state.events = all;
    renderBoard();
    return true;
  } catch (err) {
    console.error("Error sincronitzant calendaris:", err);
    return false;
  }
}

const fetchIcalEvents = fetchMultiCalendarEvents;

function renderCalendarsList() {
  const container = document.getElementById('calendarsListContainer');
  if (!container) return;

  container.innerHTML = '';
  if (!state.calendars || state.calendars.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.fontSize = '0.8rem';
    emptyMsg.style.color = '#64748b';
    emptyMsg.style.padding = '8px 4px';
    emptyMsg.textContent = state.lang === 'ca' ? "Cap calendari afegit encara." : state.lang === 'es' ? "Ningún calendario añadido aún." : "No calendars added yet.";
    container.appendChild(emptyMsg);
    return;
  }

  state.calendars.forEach((cal) => {
    const item = document.createElement('div');
    item.className = 'calendar-item';

    const left = document.createElement('div');
    left.className = 'cal-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'cal-checkbox';
    checkbox.checked = !!cal.enabled;
    checkbox.title = state.lang === 'ca' ? "Activar/Desactivar al panell" : "Activar/Desactivar en el panel";

    checkbox.addEventListener('change', async (e) => {
      cal.enabled = e.target.checked;
      saveCalendars();
      state.demoMode = false;
      localStorage.setItem("mv_demo", "false");
      const toggleDemo = document.getElementById('toggleDemoMode');
      if (toggleDemo) toggleDemo.checked = false;
      await fetchMultiCalendarEvents();
      renderBoard();
    });

    const info = document.createElement('div');
    info.className = 'cal-info';

    const nameEl = document.createElement('span');
    nameEl.className = 'cal-name';
    nameEl.textContent = cal.name || 'Calendari';

    const isJson = (cal.type === 'json') || (cal.url && cal.url.toLowerCase().includes('.json'));
    const badge = document.createElement('span');
    badge.className = isJson ? 'cal-badge json' : 'cal-badge ical';
    badge.textContent = isJson ? 'JSON' : 'iCal';
    nameEl.appendChild(badge);

    const urlEl = document.createElement('span');
    urlEl.className = 'cal-url-hint';
    urlEl.textContent = cal.url || '';

    info.appendChild(nameEl);
    info.appendChild(urlEl);

    left.appendChild(checkbox);
    left.appendChild(info);

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.className = 'btn-del-cal';
    btnDel.title = state.lang === 'ca' ? "Eliminar calendari" : "Eliminar calendario";
    btnDel.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/>
      </svg>
    `;

    btnDel.addEventListener('click', async () => {
      const confirmMsg = I18N[state.lang].btnDeleteCalConfirm || "Segur que vols eliminar aquest calendari?";
      if (confirm(confirmMsg)) {
        state.calendars = state.calendars.filter(c => c.id !== cal.id);
        saveCalendars();
        renderCalendarsList();
        await fetchMultiCalendarEvents();
        renderBoard();
      }
    });

    item.appendChild(left);
    item.appendChild(btnDel);
    container.appendChild(item);
  });
}

// =========================================================================
// CONFIGURACIÓ I ESDEVENIMENTS
// =========================================================================
function setupEventHandlers() {
  const modal = document.getElementById('configModal');
  const btnOpen = document.getElementById('btnOpenConfig');
  const btnClose = document.getElementById('btnCloseConfig');
  const btnApply = document.getElementById('btnApplyAndClose');
  const selectLang = document.getElementById('selectLanguage');
  const toggleDemo = document.getElementById('toggleDemoMode');
  const toggleSound = document.getElementById('toggleSound');

  renderCalendarsList();

  const btnAddCalendar = document.getElementById('btnAddCalendar');
  const inputNewCalName = document.getElementById('inputNewCalName');
  const inputNewCalUrl = document.getElementById('inputNewCalUrl');

  if (btnAddCalendar) {
    btnAddCalendar.addEventListener('click', async () => {
      const url = inputNewCalUrl.value.trim();
      let name = inputNewCalName.value.trim();

      if (!url) {
        inputNewCalUrl.focus();
        inputNewCalUrl.style.borderColor = '#ef4444';
        setTimeout(() => {
          inputNewCalUrl.style.borderColor = '';
        }, 1500);
        return;
      }

      if (!name) {
        name = (state.lang === 'ca' ? "Calendari " : "Calendario ") + (state.calendars.length + 1);
      }

      const isJson = url.toLowerCase().includes('.json');
      const newCal = {
        id: Date.now().toString(),
        name: name,
        url: url,
        type: isJson ? 'json' : 'ical',
        enabled: true
      };

      state.calendars.push(newCal);
      saveCalendars();
      state.demoMode = false;
      localStorage.setItem("mv_demo", "false");
      if (toggleDemo) toggleDemo.checked = false;

      inputNewCalName.value = '';
      inputNewCalUrl.value = '';
      renderCalendarsList();

      await fetchMultiCalendarEvents();
      renderBoard();
    });
  }

  selectLang.value = state.lang;
  toggleDemo.checked = state.demoMode;
  toggleSound.checked = state.soundEnabled;

  const inputBoardTitle = document.getElementById('inputBoardTitle');
  if (inputBoardTitle) {
    inputBoardTitle.value = state.customTitle || '';
    inputBoardTitle.addEventListener('input', (e) => {
      state.customTitle = e.target.value;
      localStorage.setItem("mv_custom_title", state.customTitle);
      updateBoardHeaders();
    });
  }

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      userGestureUnlockAudio();
      modal.classList.add('active');
    });
  }
  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (modal) modal.classList.remove('active');
  };
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnApply) btnApply.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(e);
      }
    });
  }

  selectLang.addEventListener('change', (e) => {
    state.lang = e.target.value;
    localStorage.setItem("mv_lang", state.lang);
    applyI18nLabels();
    renderBoard();
  });

  toggleDemo.addEventListener('change', (e) => {
    state.demoMode = e.target.checked;
    localStorage.setItem("mv_demo", state.demoMode);
    renderBoard();
  });

  // Gestió de Pantalla Completa (Fullscreen API)
  const btnToggleFullscreen = document.getElementById('btnToggleFullscreen');
  const iconFsEnter = document.getElementById('iconFullscreenEnter');
  const iconFsExit = document.getElementById('iconFullscreenExit');

  const updateFullscreenIcons = () => {
    const isFs = !!document.fullscreenElement;
    if (iconFsEnter) iconFsEnter.style.display = isFs ? 'none' : 'inline-block';
    if (iconFsExit) iconFsExit.style.display = isFs ? 'inline-block' : 'none';
  };

  if (btnToggleFullscreen) {
    btnToggleFullscreen.addEventListener('click', () => {
      userGestureUnlockAudio();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn("Fullscreen no permès:", err);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((err) => {
            console.warn("Error sortint de fullscreen:", err);
          });
        }
      }
    });
  }

  document.addEventListener('fullscreenchange', updateFullscreenIcons);
  updateFullscreenIcons();

  // Mode Finestra Neta (Sense barres de navegador per encaixar amb Win + Fletxes)
  const btnOpenAppWindow = document.getElementById('btnOpenAppWindow');
  if (btnOpenAppWindow) {
    const isCleanWindow = window.opener != null || 
                          window.matchMedia('(display-mode: standalone)').matches ||
                          window.name === 'MeetingViewerClean';
    if (isCleanWindow) {
      btnOpenAppWindow.style.display = 'none';
    } else {
      btnOpenAppWindow.addEventListener('click', () => {
        userGestureUnlockAudio();
        const w = Math.round(screen.availWidth * 0.5);
        const h = Math.round(screen.availHeight * 0.5);
        window.open(window.location.href, 'MeetingViewerClean', `popup=yes,width=${w},height=${h},left=0,top=0`);
      });
    }
  }

  const btnToggleSound = document.getElementById('btnToggleSound');
  const iconSoundOn = document.getElementById('iconSoundOn');
  const iconSoundOff = document.getElementById('iconSoundOff');
  const btnTestSound = document.getElementById('btnTestSound');

  const updateSoundIcons = () => {
    if (state.soundEnabled) {
      if (iconSoundOn) iconSoundOn.style.display = 'inline-block';
      if (iconSoundOff) iconSoundOff.style.display = 'none';
      if (toggleSound) toggleSound.checked = true;
    } else {
      if (iconSoundOn) iconSoundOn.style.display = 'none';
      if (iconSoundOff) iconSoundOff.style.display = 'inline-block';
      if (toggleSound) toggleSound.checked = false;
    }
  };
  updateSoundIcons();

  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      localStorage.setItem("mv_sound", state.soundEnabled);
      updateSoundIcons();
      if (state.soundEnabled) {
        userGestureUnlockAudio();
        playTestSoundBurst();
      }
    });
  }

  if (btnTestSound) {
    btnTestSound.addEventListener('click', () => {
      state.soundEnabled = true;
      localStorage.setItem("mv_sound", "true");
      updateSoundIcons();
      userGestureUnlockAudio();
      playTestSoundBurst();
    });
  }

  toggleSound.addEventListener('change', (e) => {
    state.soundEnabled = e.target.checked;
    localStorage.setItem("mv_sound", state.soundEnabled);
    updateSoundIcons();
    if (state.soundEnabled) {
      userGestureUnlockAudio();
      playTestSoundBurst();
    }
  });

  const selectRefresh = document.getElementById('selectRefreshInterval');
  if (selectRefresh) {
    selectRefresh.value = String(state.refreshIntervalSec);
    selectRefresh.addEventListener('change', (e) => {
      state.refreshIntervalSec = parseInt(e.target.value, 10);
      localStorage.setItem("mv_refresh_sec", state.refreshIntervalSec);
      startCalendarPolling();
    });
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildBoardStructure();
      renderBoard();
    }, 150);
  });

  setInterval(() => renderBoard(), 20000); // Actualitza estats visuals cada 20 segons
  startCalendarPolling();
}

function startCalendarPolling() {
  if (state.calendarTimer) {
    clearInterval(state.calendarTimer);
  }
  const ms = Math.max(15, state.refreshIntervalSec) * 1000;
  state.calendarTimer = setInterval(() => {
    const hasActiveCalendars = state.calendars && state.calendars.some(c => c.enabled);
    if (hasActiveCalendars && !state.demoMode) {
      fetchMultiCalendarEvents();
    }
  }, ms);
}

function applyI18nLabels() {
  const t = I18N[state.lang];
  document.getElementById('modalTitle').textContent = t.modalTitle;
  document.getElementById('lblLanguage').textContent = t.lblLanguage;
  
  const lblCustomTitle = document.getElementById('lblCustomTitle');
  if (lblCustomTitle) lblCustomTitle.textContent = t.lblCustomTitle;
  const hintCustomTitle = document.getElementById('hintCustomTitle');
  if (hintCustomTitle) hintCustomTitle.textContent = t.customTitleHelp;
  const inputBoardTitle = document.getElementById('inputBoardTitle');
  if (inputBoardTitle) inputBoardTitle.placeholder = t.customTitlePlaceholder;

  const lblCals = document.getElementById('lblCalendarsTitle');
  if (lblCals) lblCals.textContent = t.lblCalendarsTitle;
  const helpCals = document.getElementById('calendarsHelpText');
  if (helpCals) helpCals.textContent = t.calendarsHelpText;
  const inputNewCalUrl = document.getElementById('inputNewCalUrl');
  if (inputNewCalUrl && t.calPlaceholder) inputNewCalUrl.placeholder = t.calPlaceholder;

  document.getElementById('lblDemoMode').textContent = t.lblDemoMode;
  
  const lblRefresh = document.getElementById('lblRefreshInterval');
  if (lblRefresh) lblRefresh.textContent = t.lblRefreshInterval;
  const opt30 = document.getElementById('optRefresh30');
  if (opt30) opt30.textContent = t.optRefresh30;
  const opt60 = document.getElementById('optRefresh60');
  if (opt60) opt60.textContent = t.optRefresh60;
  const opt120 = document.getElementById('optRefresh120');
  if (opt120) opt120.textContent = t.optRefresh120;
  const opt300 = document.getElementById('optRefresh300');
  if (opt300) opt300.textContent = t.optRefresh300;

  document.getElementById('lblSound').textContent = t.lblSound;
  document.getElementById('btnApplyAndClose').textContent = t.btnApplyAndClose;

  updateBoardHeaders();
}

// =========================================================================
// INICI
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
  startClock();
  buildBoardStructure();
  setupEventHandlers();
  applyI18nLabels();

  setTimeout(() => {
    const hasActive = state.calendars && state.calendars.some(c => c.enabled);
    if (hasActive && !state.demoMode) {
      fetchMultiCalendarEvents();
    } else {
      renderBoard();
    }
  }, 100);
});
