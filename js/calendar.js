document.getElementById("addToCalendar").addEventListener("click", function () {
    const url = "https://calendar.google.com/calendar/u/0/r?cid=fe095da67a3af839f254a080709fddee966fd2e1d8fe06052e1b6b0909328326@group.calendar.google.com";

    const width = 1000;
    const height = 800;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(url, "AddToCalendar", `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`);
});

document.getElementById("searchButton").addEventListener("click", function () {
    let query = document.getElementById("searchInput").value;
    alert("Searching for: " + query); // Replace with actual search functionality
});