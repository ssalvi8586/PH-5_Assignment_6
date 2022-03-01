// event listener for search button 
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


// search result show function
const searchResult = (data) => {

    if (data.data.length !== 0) {
        data.data.slice(0, 20).forEach(element => {
            const phoneName = element.phone_name;
            const brand = element.brand;
            const image = element.image;
            const id = element.slug;
            // console.log(id);
            const div = document.createElement("div");
            div.classList.add("col-lg-4", "col-md-6", "col-12");

            div.innerHTML = `<div class="card h-100">
                <div class="d-flex justify-content-center">
                    <img src="${image}" class="card-img-top img-fluid w-50" alt="phone_img">
                </div>
                
                <div class="card-header h-100 border-0 bg-white mt-2">
                    <h5 class="card-title">${phoneName}</h5>
                </div>
                <div class="card-body pt-0">
                    <p class="card-text ">Brand: ${brand}</p>   
                </div>
                <div class="card-footer border-0 bg-white">
                    <a href="#" onclick="handleDetailsShow('${id}')" class="btn btn-primary" id="detailsBtn">Details</a>
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

// event listener for details
const handleDetailsShow = async id => {
    document.getElementById("results").style.display = "none";

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data);

    // fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    //         .then(response => response.json())
    //         .then(data => searchResult(data));
}

// details data show
const showDetails = data => {
    console.log(data)
}