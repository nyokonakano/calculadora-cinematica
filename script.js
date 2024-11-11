function showTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    document.getElementById('mru-form').style.display = tab === 'mru' ? 'block' : 'none';
    document.getElementById('mruv-form').style.display = tab === 'mruv' ? 'block' : 'none';
}

function calcularMRU() {
    const velocidad = parseFloat(document.getElementById('mru-velocidad').value);
    const tiempo = parseFloat(document.getElementById('mru-tiempo').value);
    const distancia = parseFloat(document.getElementById('mru-distancia').value);
    const resultDiv = document.getElementById('mru-result');

    resultDiv.style.display = 'block';

    // Verificar qué valores se proporcionaron y calcular el faltante
    if (!isNaN(velocidad) && !isNaN(tiempo) && isNaN(distancia)) {
        const d = velocidad * tiempo;
        resultDiv.innerHTML = `Distancia = ${d.toFixed(2)} m`;
    } else if (!isNaN(distancia) && !isNaN(tiempo) && isNaN(velocidad)) {
        const v = distancia / tiempo;
        resultDiv.innerHTML = `Velocidad = ${v.toFixed(2)} m/s`;
    } else if (!isNaN(distancia) && !isNaN(velocidad) && isNaN(tiempo)) {
        const t = distancia / velocidad;
        resultDiv.innerHTML = `Tiempo = ${t.toFixed(2)} s`;
    } else {
        resultDiv.innerHTML = 'Por favor, ingresa exactamente dos valores para calcular el tercero.';
    }
}

function calcularMRUV() {
    const v0 = parseFloat(document.getElementById('mruv-v0').value);
    const vf = parseFloat(document.getElementById('mruv-vf').value);
    const a = parseFloat(document.getElementById('mruv-aceleracion').value);
    const t = parseFloat(document.getElementById('mruv-tiempo').value);
    const d = parseFloat(document.getElementById('mruv-distancia').value);
    const resultDiv = document.getElementById('mruv-result');

    resultDiv.style.display = 'block';
    let resultado = '';

    try {
        // Diferentes casos según los valores proporcionados
        if (!isNaN(v0) && !isNaN(a) && !isNaN(t)) {
            // Calcular velocidad final y distancia
            const vfinal = v0 + a * t;
            const dist = v0 * t + 0.5 * a * t * t;
            resultado = `Velocidad final = ${vfinal.toFixed(2)} m/s<br>Distancia = ${dist.toFixed(2)} m`;
        } else if (!isNaN(v0) && !isNaN(vf) && !isNaN(a)) {
            // Calcular tiempo y distancia usando v² = v₀² + 2ad
            const dist = (vf * vf - v0 * v0) / (2 * a);
            const tiempo = (vf - v0) / a;
            resultado = `Tiempo = ${tiempo.toFixed(2)} s<br>Distancia = ${dist.toFixed(2)} m`;
        } else if (!isNaN(v0) && !isNaN(vf) && !isNaN(t)) {
            // Calcular aceleración y distancia
            const acel = (vf - v0) / t;
            const dist = (v0 + vf) * t / 2;
            resultado = `Aceleración = ${acel.toFixed(2)} m/s²<br>Distancia = ${dist.toFixed(2)} m`;
        } else if (!isNaN(v0) && !isNaN(vf) && !isNaN(d)) {
            // Calcular aceleración y tiempo
            const acel = (vf * vf - v0 * v0) / (2 * d);
            const tiempo = 2 * d / (v0 + vf);
            resultado = `Aceleración = ${acel.toFixed(2)} m/s²<br>Tiempo = ${tiempo.toFixed(2)} s`;
        } else {
            resultado = 'Por favor, ingresa al menos tres valores para realizar los cálculos.';
        }
    } catch (error) {
        resultado = 'Error en los cálculos. Verifica los valores ingresados.';
    }

    resultDiv.innerHTML = resultado;
}