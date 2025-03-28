fetch('../JSON/Hi_User_Tablet.json')
    .then(res => res.json())
    .then(data => {
        // Cargar nombre y avatar
        document.querySelector('.user-info p strong').textContent = data.user.name;
        document.querySelector('.user-info img').src = data.user.profileImage;

        // Última visita
        const lastCard = document.querySelectorAll('.info-card')[0];
        lastCard.querySelector('h3').textContent = "Last time visited: " + data.lastVisited.title;
        lastCard.querySelector('.img-placeholder').style.backgroundImage = `url(${data.lastVisited.image})`;
        lastCard.querySelector('.btn').textContent = data.lastVisited.button;

        // Más popular
        const popularCard = document.querySelectorAll('.info-card')[1];
        popularCard.querySelector('h3').textContent = "Most popular today: " + data.mostPopular.title;
        popularCard.querySelector('.img-placeholder').style.backgroundImage = `url(${data.mostPopular.image})`;
        popularCard.querySelector('.btn').textContent = data.mostPopular.button;

        // Ubicación
        document.querySelector('.location-box p').innerHTML = `📍 Your current location:<br><strong>${data.location}</strong>`;

        // Quick info
        const quickContainer = document.querySelector('.quick-info');
        quickContainer.innerHTML = ''; // limpiar primero
        data.quickInfo.forEach(info => {
            const div = document.createElement('div');
            div.className = 'quick-card';
            div.innerHTML = `<h4>${info.title}</h4><p>${info.text}</p>`;
            quickContainer.appendChild(div);
        });
    })
    .catch(err => console.error('Error loading Hi_User_Tablet.json:', err));
