document.addEventListener('DOMContentLoaded', () => {
    const currentDateElem = document.getElementById('current-date');
    const hourListElem = document.getElementById('hour-list');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');

    let currentDate = new Date();

    const updateDate = () => {
        currentDateElem.textContent = currentDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const generateHourList = () => {
        hourListElem.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const hour = `${i.toString().padStart(2, '0')}:00`;
            const listItem = document.createElement('li');
            listItem.textContent = hour;
            hourListElem.appendChild(listItem);
        }
    };

    const changeDay = (offset) => {
        currentDate.setDate(currentDate.getDate() + offset);
        updateDate();
    };

    prevDayBtn.addEventListener('click', () => changeDay(-1));
    nextDayBtn.addEventListener('click', () => changeDay(1));

    // Inicialización
    updateDate();
    generateHourList();
});
