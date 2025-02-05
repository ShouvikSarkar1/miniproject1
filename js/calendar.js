let events = [];

// Get input fields and reminder list
let eventDateInput = document.getElementById("eventDate");
let eventTitleInput = document.getElementById("eventTitle");
let eventDescriptionInput = document.getElementById("eventDescription");
let reminderList = document.getElementById("reminderList");

// Unique event ID counter
let eventIdCounter = 1;

// Date-related variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

// Generate year options for dropdown
function generateYearRange(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += `<option value='${year}'>${year}</option>`;
    }
    return years;
}

document.getElementById("year").innerHTML = generateYearRange(1970, 2050);
let calendar = document.getElementById("calendar");

let months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Generate table headers for weekdays
let dataHead = "<tr>";
days.forEach(day => {
    dataHead += `<th data-days='${day}'>${day}</th>`;
});
dataHead += "</tr>";
document.getElementById("thead-month").innerHTML = dataHead;

let monthAndYear = document.getElementById("monthAndYear");

// 📅 Display Calendar
function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    monthAndYear.innerHTML = `${months[month]} ${year}`;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.textContent = "";
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.className = "date-picker";
                cell.innerHTML = `<span>${date}</span>`;

                // Highlight today's date
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("selected");
                }

                // Check if there are events on this date
                if (hasEventOnDate(date, month, year)) {
                    cell.classList.add("event-marker");
                    cell.appendChild(createEventTooltip(date, month, year));
                }

                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }

    displayReminders();
}

// 📌 Add Event
function addEvent() {
    let date = eventDateInput.value;
    let title = eventTitleInput.value.trim();
    let description = eventDescriptionInput.value.trim();

    if (!date || !title) {
        alert("Event must have a date and title!");
        return;
    }

    let eventExists = events.some(event => event.date === date && event.title === title);
    if (eventExists) {
        alert("Event already exists on this date!");
        return;
    }

    let eventId = eventIdCounter++;
    events.push({ id: eventId, date, title, description });

    eventDateInput.value = "";
    eventTitleInput.value = "";
    eventDescriptionInput.value = "";

    showCalendar(currentMonth, currentYear);
    displayReminders();
}

// 🗑️ Delete Event
function deleteEvent(eventId) {
    events = events.filter(event => event.id !== eventId);
    showCalendar(currentMonth, currentYear);
    displayReminders();
}

// 🔔 Display Reminders
function displayReminders() {
    reminderList.innerHTML = "";
    events.forEach(event => {
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${event.title}</strong> - ${event.description} on ${eventDate.toLocaleDateString()}`;

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-event";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteEvent(event.id);

            listItem.appendChild(deleteButton);
            reminderList.appendChild(listItem);
        }
    });
}

// 🏷️ Create Tooltip for Events
function createEventTooltip(date, month, year) {
    let tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    getEventsOnDate(date, month, year).forEach(event => {
        let eventText = `<strong>${event.title}</strong> - ${event.description} on ${new Date(event.date).toLocaleDateString()}`;
        let eventElement = document.createElement("p");
        eventElement.innerHTML = eventText;
        tooltip.appendChild(eventElement);
    });
    return tooltip;
}

// 📌 Get Events on a Specific Date
function getEventsOnDate(date, month, year) {
    return events.filter(event => {
        let eventDate = new Date(event.date);
        return eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
}

// 📆 Check if a Date Has an Event
function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}

// 📆 Get Days in Month
function daysInMonth(month, year) {
    return 32 - new Date(year, month, 32).getDate();
}

// 🔄 Calendar Navigation
function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

// Initialize Calendar
showCalendar(currentMonth, currentYear);