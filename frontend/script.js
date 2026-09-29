document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const loadEventsBtn = document.getElementById('load-events-btn');
    const eventsContainer = document.getElementById('events-container');
    const eventsError = document.getElementById('events-error');
    const registrationForm = document.getElementById('registration-form');
    const registrationMessage = document.getElementById('registration-message');

    // Base API URL
    const API_URL = 'http://127.0.0.1:8000';

    // Load Events Functionality
    loadEventsBtn.addEventListener('click', async () => {
        // Clear previous content
        eventsContainer.innerHTML = 'Loading...';
        eventsError.textContent = '';

        try {
            // Fetch events from FastAPI backend
            const response = await fetch(`${API_URL}/api/events`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const events = await response.json();
            
            // Clear the "Loading..." text
            eventsContainer.innerHTML = '';
            
            // Generate HTML for each event
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Speaker:</strong> ${event.speaker}</p>
                    <p>${event.description}</p>
                `;
                eventsContainer.appendChild(eventCard);
            });
            
        } catch (error) {
            console.error('Error fetching events:', error);
            eventsContainer.innerHTML = '';
            eventsError.textContent = 'Failed to load events. Is the backend running?';
        }
    });

    // Registration Form Functionality
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page reload
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        registrationMessage.style.color = 'black';
        registrationMessage.textContent = 'Submitting...';
        
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            registrationMessage.style.color = 'green';
            registrationMessage.textContent = data.message;
            registrationForm.reset();
            
        } catch (error) {
            console.error('Error during registration:', error);
            registrationMessage.style.color = 'red';
            registrationMessage.textContent = 'Registration failed. Is the backend running?';
        }
    });
});
