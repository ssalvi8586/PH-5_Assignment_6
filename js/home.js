document.getElementById("searchBtn").addEventListener('click', () => {

    const searchText = document.getElementById("searchInput").value;

    if (searchText != "") {

        document.getElementById("instruction").style.display = "none";

        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => searchResult(data));
    } else {
        document.getElementById("instruction").style.display = "block";

    }
})

const searchResult = (data) => {
    data.data.forEach(element => {
        const phoneNamme = element.phone_name;
        const brand = element.brand;
        console.log(brand);
    });
}