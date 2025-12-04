const input = document.getElementById("troll-input");

/* ---------------------- 1. Le champ fuit la souris ---------------------- */

input.addEventListener("mouseover", () => {
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 200 - 100;
    input.style.transform = `translate(${x}px, ${y}px)`;
});

/* ---------------------- 2. Effacement aléatoire ------------------------ */

input.addEventListener("input", () => {
    if (Math.random() < 0.25) { // 25% de chance
        input.value = input.value.slice(0, -1);
    }
});

/* ---------------------- 3. Blocage aléatoire des voyelles -------------- */

let blockVowels = false;

setInterval(() => {
    blockVowels = true;
    setTimeout(() => blockVowels = false, 3000);
}, 8000);

input.addEventListener("keydown", (e) => {
    if (blockVowels && /[aeiouy]/i.test(e.key)) {
        e.preventDefault();
    }
});

/* ---------------------- 4. Punition si on tape trop vite ---------------- */

let lastType = 0;

input.addEventListener("keydown", () => {
    const now = Date.now();
    if (now - lastType < 80) { // <80 ms = trop rapide
        input.style.filter = "blur(3px)";
        setTimeout(() => input.style.filter = "blur(0)", 300);
    }
    lastType = now;
});

/* ---------------------- 5. Le champ se vide si on clique ailleurs ------- */

document.addEventListener("click", (e) => {
    if (e.target !== input) {
        input.value = "";
    }
});

/* ---------------------- 6. Validation stricte au blur ------------------- */

input.addEventListener("blur", () => {
    const pattern = /^[0-9]{5} [A-Z]+ [0-9]+ (RUE|AVENUE|BOULEVARD|IMPASSE) [A-Z ]+$/;

    if (!pattern.test(input.value.trim())) {
        alert("Format incorrect. C’est pourtant simple.");
    }
});
