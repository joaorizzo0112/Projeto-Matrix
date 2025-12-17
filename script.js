const state = {
    fps: 30,
    color: "#00ff00",
    charset: "0123456789ABCDEF",
    size: 15,
    isRainbow: false,

    classic: () => { state.charset = "0123456789ABCDEF"; state.color = "#00ff00"; state.isRainbow = false; },
    japanese: () => { state.charset = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォ코소토노호모요ョ로ヲゴゾドボポヴッン"; state.isRainbow = false; },
    binary: () => { state.charset = "01"; state.isRainbow = false; }
};

const gui = new dat.GUI({ autoPlace: false });
document.getElementById('gui-hook').appendChild(gui.domElement);

const f1 = gui.addFolder('STYLE');
f1.addColor(state, "color").name("HEX COLOR");
f1.add(state, "isRainbow").name("RAINBOW");
f1.open();

const f2 = gui.addFolder('CORE');
f2.add(state, "fps", 1, 60).step(1).name("SPEED");
const sizeCtrl = f2.add(state, "size", 8, 40).step(1).name("SIZE");
f2.add(state, "charset").name("CHARSET");
f2.open();

const f3 = gui.addFolder('PRESETS');
f3.add(state, 'classic').name('HACKER');
f3.add(state, 'japanese').name('MATRIX');
f3.add(state, 'binary').name('BINARY');
f3.open();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let w, h, p;

const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    p = Array(Math.ceil(w / state.size)).fill(0);
};

window.addEventListener("resize", resize);
sizeCtrl.onChange(() => resize());
resize();

const panel = document.getElementById('side-panel');
panel.addEventListener('click', (e) => {
    if(e.target === panel || e.target.closest('.sidebar-header')) {
        panel.classList.toggle('active');
    }
});

const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);
    ctx.shadowBlur = 0;

    p.forEach((y, index) => {
        const text = state.charset[Math.floor(Math.random() * state.charset.length)];
        const x = index * state.size;
        const charColor = state.isRainbow ? `hsl(${(y + x) % 360}, 100%, 50%)` : state.color;
        
        ctx.fillStyle = charColor;
        ctx.font = `${state.size}px monospace`;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) p[index] = 0;
        else p[index] = y + state.size;
    });
    setTimeout(() => requestAnimationFrame(draw), 1000 / state.fps);
};

draw();