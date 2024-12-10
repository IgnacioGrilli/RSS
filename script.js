document.addEventListener('DOMContentLoaded', () => {
    const currentDateElem = document.getElementById('current-date');
    const hourListElem = document.getElementById('hour-list');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');

    let currentDate = new Date();
    const today = new Date();

    const updateDate = () => {
        currentDateElem.textContent = currentDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        checkIfEditable();
    };

    const generateHourList = () => {
        hourListElem.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const hour = `${i.toString().padStart(2, '0')}:00`;

            const listItem = document.createElement('li');
            const hourElem = document.createElement('span');
            hourElem.className = 'hour';
            hourElem.textContent = hour;

            const textareaContainer = document.createElement('div');
            textareaContainer.className = 'textarea-container';

            const textarea = document.createElement('textarea');
            textarea.dataset.hour = hour;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.className = 'save-button';
            saveButton.addEventListener('click', () => saveData(hour, textarea.value));

            textareaContainer.appendChild(textarea);
            textareaContainer.appendChild(saveButton);
            listItem.appendChild(hourElem);
            listItem.appendChild(textareaContainer);
            hourListElem.appendChild(listItem);
        }
        checkIfEditable();
    };

    const saveData = (hour, text) => {
        if (!text.trim()) {
            alert('Por favor, ingrese un texto antes de guardar.');
            return;
        }

        const data = {
            date: currentDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
            hora: hour,
            text: text
        };

        fetch('https://backendrss.onrender.com/save-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                alert('Datos guardados correctamente.');
                console.log(result);
            })
            .catch((error) => {
                console.error('Error al guardar los datos:', error);
                alert('Ocurrió un error al guardar los datos.');
            });
    };

    const checkIfEditable = () => {
        const isToday = currentDate.toDateString() === today.toDateString();
        const textareas = hourListElem.querySelectorAll('textarea');
        const buttons = hourListElem.querySelectorAll('.save-button');
        textareas.forEach((textarea) => {
            textarea.disabled = !isToday;
        });
        buttons.forEach((button) => {
            button.disabled = !isToday;
        });
    };

    const changeDay = (offset) => {
        currentDate.setDate(currentDate.getDate() + offset);
        updateDate();
    };

    prevDayBtn.addEventListener('click', () => changeDay(-1));
    nextDayBtn.addEventListener('click', () => changeDay(1));

    updateDate();
    generateHourList();
});
