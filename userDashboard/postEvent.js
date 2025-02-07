import events from "./upcomingEvents.js"; // Importing the events array

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("eventsContainer");

    events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");

        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${event.image}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <a href="#" class="btn btn-primary">Learn More</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
});