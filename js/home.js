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
        const image = element.image;
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "col-12");
        const parentContainer = document.getElementById('result-container');
        div.innerHTML = `<div class="card">
            <img src="${image}" class="card-img-top img-fluid" alt="... ">
            <div class="card-body ">
                <h5 class="card-title ">${phoneNamme}</h5>
                <p class="card-text ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="# " class="btn btn-primary ">Go somewhere</a>
            </div>
        </div>`
        parentContainer.appendChild(div);
    });
}