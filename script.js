let clickEnabled = true;
let typingInterval; // Mover aquí para poder limpiarlo globalmente

document.getElementById('heart').addEventListener('click', function (event) {
    if (!clickEnabled) return;

    clickEnabled = false;

    for (let i = 0; i < 5; i++) {
        createPetal(event.clientX, event.clientY);
    }

    // Mostrar el mensaje de cumpleaños
    showBirthdayMessage();

    setTimeout(() => {
        clickEnabled = true;
    }, 20000); // Habilitar el clic después de 3 segundos
});

function createPetal(x, y) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    document.body.appendChild(petal);

    const petalSize = Math.random() * 20 + 10;
    petal.style.width = `${petalSize}px`;
    petal.style.height = `${petalSize}px`;
    petal.style.background = getRandomColor();

    const speed = Math.random() * 2 + 1;
    const angle = Math.random() * 360;
    const radians = (angle * Math.PI) / 180;

    const animationDuration = Math.random() * 3 + 2;
    petal.style.animation = `fall ${animationDuration}s linear`;

    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;

    const deltaX = speed * Math.cos(radians);
    const deltaY = speed * Math.sin(radians);

    const interval = 10; // Intervalo de actualización de posición en milisegundos

    const fall = setInterval(() => {
        x += deltaX;
        y += deltaY;
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;

        if (y > window.innerHeight) {
            clearInterval(fall);
            setTimeout(() => {
                petal.remove();
            }, 2000); // Eliminar después de 2 segundos
        }
    }, interval);
}

function getRandomColor() {
    const colors = ['#ff69b4', '#00ff00']; // Rosado y verde
    return colors[Math.floor(Math.random() * colors.length)];
}

/* Mensaje de feliz cumpleaños con efecto de escritura */
function showBirthdayMessage() {
    const message = "¡Hola, bella Karen! Espero que estés teniendo un maravilloso día te quería decir que feliz cumpleaños número 18. Aunque a ti no te gusta, te quería decir que, tú sigues siendo más hermosa y atractiva que nunca., mi promesa para ti es que siempre estaré aquí para recordarte cuán especial puedes llegar a ser para alguien. ¡Feliz cumpleaños te quiero mucho y te aprecio ♥️ espero seguirte conociendo más y compartir contigo 🌹 att: 🪤 ";

    const messageContainer = document.getElementById("messageContainer");
    const messageElement = document.getElementById("birthdayMessage");
    
    messageContainer.style.display = "block";  // Mostrar el contenedor del mensaje
    messageElement.textContent = ""; // Limpiar cualquier mensaje previo antes de comenzar

    let i = 0;
    const typingSpeed = 50; // Velocidad de escritura en milisegundos

    function type() {
        if (i < message.length) {
            messageElement.textContent += message.charAt(i);
            i++;
            typingInterval = setTimeout(type, typingSpeed);
        } else {
            // Después de terminar de escribir, mantener el mensaje visible
            clearTimeout(typingInterval); // Limpiar el intervalo cuando termine la escritura
        }
    }

    clearTimeout(typingInterval); // Evitar superposición si se hace clic varias veces
    typingInterval = setTimeout(type, typingSpeed); // Inicia el efecto de escritura
}
