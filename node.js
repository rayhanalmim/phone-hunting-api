const loadData = async(searchText = '13' , showAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayData(phones , showAll);
}

const displayData = (phones , showAll) => {

    const dataContainer = document.getElementById('data-container');
    dataContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-button-container');
    if(phones.length>6 && !showAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    if(!showAll){
        phones = phones.slice(0,6)
    }

    for(let phone of phones){

        const cardDiv = document.createElement('div');
        cardDiv.classList = 'card w-96 bg-base-100 pt-4 shadow-xl';
        cardDiv.innerHTML = `
        <figure><img src=${phone.image} /></figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions justify-end">
                        <button onclick="my_modal_1.showModal() , showDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
                    </div>
                </div>
        `
        dataContainer.appendChild(cardDiv);
    }
    const loodingField = document.getElementById('looding-field');
    loodingField.classList.add('hidden');
}

const searchPhone = (showAll) => {
    const loodingField = document.getElementById('looding-field');
    loodingField.classList.remove('hidden');
    const searchValue = document.getElementById('search-text');
    const searchText = searchValue.value;
    loadData(searchText , showAll);
}

const showAll = () => {
    searchPhone(true);
}

// -------------showDetails--------------------

const loadDetails = async (productId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${productId}`);
    const details = await res.json();
    const detailsData = details.data;

    console.log(detailsData);
    
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class="flex bg-gray-300 rounded my-3 justify-center items-center p-4">
    <img class="rounded-lg" src="${detailsData.image}" alt="">
    </div>
    <h3 class="text-2xl font-bold">${detailsData.name}</h3>
    <h3 class="text-lg"><span class="font-semibold">stroage:</span> ${detailsData.mainFeatures?.storage}</h3>
    <h3 class="text-lg"><span class="font-semibold">Display size:</span> ${detailsData.mainFeatures?.displaySize}</h3>
    <h3 class="text-lg"><span class="font-semibold">Chipset:</span> ${detailsData.mainFeatures?.chipSet}</h3>
    <h3 class="text-lg"><span class="font-semibold">GPS:</span> ${detailsData.others?.GPS || 'No GPS Avalable'}</h3>
    <div class="flex justify-end items-center">
        <button class="btn btn-warning">CLOSE</button>
    </div>
    `
}

const showDetails = (id) => {
    loadDetails(id);
}

loadData();

