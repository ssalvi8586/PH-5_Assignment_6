// event listener for search button 
document.getElementById("searchBtn").addEventListener('click', () => {

    document.getElementById("errMsg").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("details").style.display = "none";
    document.getElementById("result-container").innerHTML = "";
    document.getElementById("details-container").innerHTML = "";

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

            const parentContainer = document.getElementById("result-container");
            parentContainer.appendChild(div);
        });

        document.getElementById("spinner").style.display = "none";
        document.getElementById("results").style.display = "block";

        if (data.data.length > 20) {
            const parentContainer = document.getElementById("result-container");
            const seeAllBtn = document.createElement("button");
            seeAllBtn.classList.add("btn", "btn-success", "col-12");
            seeAllBtn.innerText = "See All";
            parentContainer.appendChild(seeAllBtn);
            seeAllBtn.addEventListener('click', () => {
                seeAllBtn.style.display = "none";

                data.data.slice(20).forEach(element => {
                    const phoneName = element.phone_name;
                    const brand = element.brand;
                    const image = element.image;
                    const id = element.slug;
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

                    const parentContainer = document.getElementById("result-container");
                    parentContainer.appendChild(div);
                });
            });

        }

    } else {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("errMsg").style.display = "block";
        document.getElementById("results").style.display = "none";
    }
}

// event listener for details
const handleDetailsShow = async id => {
    document.getElementById("details").style.display = "block";

    // document.getElementById("results").style.display = "none";

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data);
}

// details data show
const showDetails = data => {
    const element = data.data;
    const phoneName = element.name;
    const brand = element.brand;
    const image = element.image;
    const releaseDate = (element.releaseDate === "") ? "Not found" : element.releaseDate;
    const mainFeatures = element.mainFeatures;
    const storage = mainFeatures.storage;
    const displaySize = mainFeatures.displaySize;
    const chipSet = mainFeatures.chipSet;
    const memory = mainFeatures.memory;
    const sensors = mainFeatures.sensors.toString();
    const others = element.others;
    const id = element.slug;

    // functions to check for more features
    const getMoreFeatures = (others) => {
        if (others !== undefined && Object.keys(others).length !== 0) {
            let element = ``;
            for (const key in others) {
                element = element + `<div class="card-text"><span class="fw-bold">${key}:</span> ${others[key]}</div>`;
            }
            return element;
        } else {
            return "No more results";
        }
    }


    //detail view create 
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "col-12");

    div.innerHTML = `<div class="card h-100">
                <div class="d-flex justify-content-center">
                    <img src="${image}" class="card-img-top img-fluid w-50" alt="phone_img">
                </div>
                
                <div class="card-header border-0 bg-white mt-2">
                    <h5 class="card-title">${phoneName}</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="card-text"><span class="fw-bold">Brand:</span> ${brand}</div>
                    <div class="card-text"><span class="fw-bold">Release Date:</span> ${releaseDate}</div>
                    <h6 class="text-center mt-2 fw-bolder">Features</h6> 
                    <h6 class="fw-bolder"><small>Main Features:</small></h6> 
                    <div class="card-text"><span class="fw-bold">Storage:</span> ${storage}</div>   
                    <div class="card-text"><span class="fw-bold">Display Size:</span> ${displaySize}</div>   
                    <div class="card-text"><span class="fw-bold">Chipset:</span> ${chipSet}</div>   
                    <div class="card-text"><span class="fw-bold">Memory:</span> ${memory}</div>
                    <div class="card-text"><span class="fw-bold">Sensors:</span> ${sensors}</div>
                    <h6 class="fw-bolder mt-2"><small>Others Features:</small></h6>
                    ${getMoreFeatures(others)}
                </div>
            </div>`;
    const parentContainer = document.getElementById("details-container");
    parentContainer.appendChild(div);

}