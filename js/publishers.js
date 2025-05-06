document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = `https://metrics-api.operas-eu.org/publishers`;
    const publisherListContainer = document.getElementById('publisherList');
    const publisherCountElement = document.getElementById('publisherCount');
    const searchInput = document.getElementById('publisherSearch');
    const searchTitle = document.getElementById('SearchTitle');
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    const lastMonthLastDay = `${lastDay}/${lastMonth.getMonth() + 1}/${lastMonth.getFullYear()}`;

    // Create a separate list container for the publishers (not including search)
    const publishersDataList = document.createElement('ul');
    publishersDataList.id = 'publishersDataList';
    
    // Hide search input initially
    if (searchInput) {
        searchInput.style.display = 'none';
    }

    // Show loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = 'Loading publishers...';
    publisherListContainer.appendChild(loader);

    // Add delay before fetching
    setTimeout(() => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Remove loader
                loader.remove();

                if (data.status === "ok" && Array.isArray(data.data)) {
                    // Clear any existing list items
                    publishersDataList.innerHTML = '';

                    const uniquePublishers = new Set();
                    data.data.forEach(publisher => {
                        uniquePublishers.add(publisher.publisher_name);
                    });

                    Array.from(uniquePublishers)
                        .sort()
                        .forEach(publisherName => {
                            const li = document.createElement('li');
                            li.textContent = publisherName;
                            publishersDataList.appendChild(li);
                        });

                    // Add the publishers list to the container
                    publisherListContainer.appendChild(publishersDataList);

                    if (publisherCountElement) {
                        publisherCountElement.innerHTML = `This is a list of the ${uniquePublishers.size} publishers who have at least one book with metrics in the OPERAS Metrics database, up to ${lastMonthLastDay}. Note that a publisher may be included in this list because they are participating in OPERAS Metrics via a third-party platform (e.g., OAPEN), so they may not be participating in OPERAS Metrics for all of their books:`;
                    }

                    // Show search input after data is loaded
                    if (searchInput) {
                        searchInput.style.display = '';
                        searchTitle.innerHTML = "Use the search field below to narrow down your search:"
                        searchInput.addEventListener('input', function () {
                            const searchText = this.value.toLowerCase();
                            const items = publishersDataList.getElementsByTagName('li');
                            for (let item of items) {
                                item.style.display = item.textContent.toLowerCase().includes(searchText) ? "" : "none";
                            }
                        });
                    }
                } else {
                    publisherListContainer.innerHTML = "Invalid data format received from server";
                    console.error("Invalid response format", data);
                }
            })
            .catch(error => {
                loader.remove();
                publisherListContainer.innerHTML = "Error fetching publishers. Please try again later.";
                console.error("Error fetching publishers:", error);
            });
    }, 1000);


});