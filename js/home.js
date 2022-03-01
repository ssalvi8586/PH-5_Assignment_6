document.getElementById("searchBtn").addEventListener('click', () => {
    const searchText = document.getElementById("searchInput").value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => console.log(data.data[0]));
})