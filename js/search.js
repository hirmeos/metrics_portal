document.addEventListener("DOMContentLoaded", function () {
    // API endpoint
    const apiUrl = `https://metrics-api.operas-eu.org/publishers`;

    // Get the publisher list element
    const publisherList = document.getElementById('publisherList');

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok" && Array.isArray(data.data)) {
                // Remove only existing <li> elements, keeping search input
                const listItems = publisherList.querySelectorAll('li');
                listItems.forEach(item => item.remove());

                // Create a Set to store unique publisher names
                const uniquePublishers = new Set();

                // Add each publisher name to the Set
                data.data.forEach(publisher => {
                    uniquePublishers.add(publisher.publisher_name);
                });

                // Convert Set to Array, sort alphabetically, and create list items
                Array.from(uniquePublishers)
                    .sort()
                    .forEach(publisherName => {
                        const li = document.createElement('li');
                        li.textContent = publisherName;
                        publisherList.appendChild(li);
                    });

                // Update count with unique publisher count
                const publisherCountElement = document.getElementById('publisherCount');
                publisherCountElement.innerHTML = `There are currently ${uniquePublishers.size} publishers with book metrics recorded in the OPERAS Metrics database:`;
            } else {
                console.error("Invalid response format", data);
            }
        })
        .catch(error => {
            console.error("Error fetching publishers:", error);
        });

    // Search filter functionality
    document.getElementById('publisherSearch').addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const items = publisherList.getElementsByTagName('li');
        for (let item of items) {
            if (item.textContent.toLowerCase().includes(searchText)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    });
});
