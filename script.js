const diasElement = document.getElementById('dias');
const horasElement = document.getElementById('horas');
const minutosElement = document.getElementById('minutos');
const segundosElement = document.getElementById('segundos');

const dataFutura = new Date('December 31, 9999 23:59:59').getTime();

function atualizarTemporizador() {
    const dataAtual = new Date().getTime();
    const diferenca = dataFutura - dataAtual;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    diasElement.textContent = dias;
    horasElement.textContent = horas.toString().padStart(2, '0');
    minutosElement.textContent = minutos.toString().padStart(2, '0');
    segundosElement.textContent = segundos.toString().padStart(2, '0');
}

setInterval(atualizarTemporizador, 1000);
atualizarTemporizador();
