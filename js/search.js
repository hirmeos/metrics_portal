document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("publisherSearch");
    const publisherList = document.getElementById("publisherList");
    const publishers = publisherList.getElementsByTagName("li");
  
    searchInput.addEventListener("input", function () {
      const filter = searchInput.value.toLowerCase();
      for (let i = 0; i < publishers.length; i++) {
        const text = publishers[i].textContent || publishers[i].innerText;
        publishers[i].style.display = text.toLowerCase().includes(filter) ? "" : "none";
      }
    });
  });