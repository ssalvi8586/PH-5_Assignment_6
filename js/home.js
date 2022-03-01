document.getElementById("searchBtn").addEventListener('click', () => {

    document.getElementById("errMsg").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("result-container").innerHTML = "";

    const searchText = document.getElementById("searchInput").value;

    if (searchText != "") {

        document.getElementById("instruction").style.display = "none";
        document.getElementById("spinner").style.display = "block";

        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => searchResult(data));

    } else {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("instruction").style.display = "block";
        // document.getElementById("errmsg").style.display = "none";
    }
})

const searchResult = (data) => {

    if (data.data.length !== 0) {
        data.data.slice(0, 20).forEach(element => {
            const phoneName = element.phone_name;
            const brand = element.brand;
            const image = element.image;
            const div = document.createElement("div");
            div.classList.add("col-lg-4", "col-md-6", "col-12");

            div.innerHTML = `<div class="card h-100">
                <img src="${image}" class="card-img-top img-fluid" alt="phone_img">
                <div class="card-header h-100 border-0 bg-white mt-2">
                    <h5 class="card-title">${phoneName}</h5>
                </div>
                <div class="card-body pt-0">
                    <p class="card-text ">Brand: ${brand}</p>   
                </div>
                <div class="card-footer border-0 bg-white">
                    <a href="# " class="btn btn-primary">Details</a>
                </div>
            </div>`;
            // console.log(phoneName);
            const parentContainer = document.getElementById("result-container");
            parentContainer.appendChild(div);
        });
    } else {
        document.getElementById("errMsg").style.display = "block";
    }



    document.getElementById("spinner").style.display = "none";
    document.getElementById("results").style.display = "block";
}