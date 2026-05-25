import { atualizarTempo } from "./inicialscr.js";

atualizarTempo();

const relogioInterval = setInterval(() => {
    atualizarTempo();
}, 1000);

export { relogioInterval };