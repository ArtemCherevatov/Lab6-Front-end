document.getElementById('downloadBtn').addEventListener('click', fetchUserData);

function fetchUserData() {
    const statusMessage = document.getElementById('statusMessage');
    const usersContainer = document.getElementById('usersContainer');

    // Очищення попереднього статусу (якщо потрібно зробити індикатор завантаження)
    statusMessage.textContent = 'Завантаження...';
    statusMessage.style.color = '#555';

    // Звернення до API за допомогою fetch та Promise
    fetch('https://randomuser.me/api')
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка мережі');
            }
            return response.json();
        })
        .then(data => {
            statusMessage.textContent = 'success!';
            statusMessage.style.color = '#28a745';
            
            const user = data.results[0];
            renderUserCard(user, usersContainer);
        })
        .catch(error => {
            statusMessage.textContent = 'Помилка завантаження';
            statusMessage.style.color = 'red';
            console.error('Error fetching data:', error);
        });
}

function renderUserCard(user, container) {
    // Зчитування полів згідно з 13 варіантом (1, 8, 9, 6, 5)
    const pictureUrl = user.picture.large; // 1
    const phone = user.phone;              // 8
    const latitude = user.location.coordinates.latitude;   // 9
    const longitude = user.location.coordinates.longitude; // 9
    const postcode = user.location.postcode; // 6
    const country = user.location.country;   // 5

    // Створення DOM-елементів картки
    const card = document.createElement('div');
    card.className = 'user-card';

    card.innerHTML = `
        <img src="${pictureUrl}" alt="User Picture">
        <div class="user-info">
            <p><strong>Phone:</strong> <br>${phone}</p>
            <p><strong>Coordinates:</strong> <br>Lat: ${latitude}, Lon: ${longitude}</p>
            <p><strong>Postcode:</strong> <br>${postcode}</p>
            <p><strong>Country:</strong> <br>${country}</p>
        </div>
    `;

    // Додавання картки на сторінку
    container.appendChild(card);
}