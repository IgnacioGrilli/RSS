document.addEventListener('DOMContentLoaded', () => {
    const currentDateElem = document.getElementById('current-date');
    const hourListElem = document.getElementById('hour-list');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');

    let currentDate = new Date();
    const today = new Date();

    // Actualiza la fecha mostrada
    const updateDate = () => {
        currentDateElem.textContent = currentDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        checkIfEditable();
    };

    // Genera la lista de horas con áreas de texto
    const generateHourList = () => {
        hourListElem.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const hour = `${i.toString().padStart(2, '0')}:00`;

            // Crear elementos
            const listItem = document.createElement('li');
            const hourElem = document.createElement('span');
            hourElem.className = 'hour';
            hourElem.textContent = hour;

            const textareaContainer = document.createElement('div');
            textareaContainer.className = 'textarea-container';

            const textarea = document.createElement('textarea');
            textarea.dataset.hour = hour; // Asociar la hora con el textarea

            // Agregar al DOM
            textareaContainer.appendChild(textarea);
            listItem.appendChild(hourElem);
            listItem.appendChild(textareaContainer);
            hourListElem.appendChild(listItem);
        }
        checkIfEditable();
    };

    // Verifica si el día mostrado es el actual y habilita/deshabilita las entradas
    const checkIfEditable = () => {
        const isToday = currentDate.toDateString() === today.toDateString(); // Comparar día actual con el mostrado
        const textareas = hourListElem.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            textarea.disabled = !isToday; // Deshabilitar si no es el día actual
        });
    };

    // Cambia el día actual
    const changeDay = (offset) => {
        currentDate.setDate(currentDate.getDate() + offset);
        updateDate();
    };

    // Listeners
    prevDayBtn.addEventListener('click', () => changeDay(-1));
    nextDayBtn.addEventListener('click', () => changeDay(1));

    // Inicialización
    updateDate();
    generateHourList();
});
