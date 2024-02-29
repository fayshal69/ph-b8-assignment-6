const btnContainer = document.getElementById('btn-container');
const errorElement = document.getElementById('error-element');
const cardContainer = document.getElementById('card-container');
let defaultId = 1000, isSortByView = false;

const fetchCatagories = async() => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const catagoriesList = data.data;
    addCatagoriesBtn(catagoriesList);
}

//adding all categories btn
const addCatagoriesBtn = (catagoriesList) => {
    let btnList = '';
    catagoriesList.forEach((item) => {
        btnList += `<button class="btn category-btn btn-ghost bg-slate-700 text-white text-lg" 
        onclick="displayVideoByCategory(${item.category_id}); colorBtn(this)">${item.category}</button>`;
    });
    btnContainer.innerHTML = `${btnList}`;
}

//display video by category ,clicked on btn
const displayVideoByCategory = async(id, isSortByView) => {
    defaultId = id;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();

    
    const cards = data.data;
    
    if(isSortByView) {
        cards.sort((a, b) => {
            const totalViewFirst = a.others?.views;
            const totalViewSecond = b.others?.views;
            const totalViewFirstNumber = parseFloat(totalViewFirst.replace('k', '')) || 0;
            const totalViewSecondNumber = parseFloat(totalViewSecond.replace('k', '')) || 0;

            return totalViewSecondNumber - totalViewFirstNumber;
        })
    }

    displayVideoCard(cards, isSortByView);
}

const colorBtn = (clickedBtn) => {
    
    const allbtn = document.querySelectorAll('.category-btn');
    for(const btn of allbtn) {
        btn.classList.add('bg-slate-700');
        btn.classList.remove('bg-red-500');
    }

    clickedBtn.classList.remove('bg-slate-700');
    clickedBtn.classList.add('bg-red-500');
}


//show the video cards
const displayVideoCard = (cards, isSortByView) => { 
    //clear the card container
    cardContainer.innerHTML = '';

    if(cards.length === 0) {
        errorElement.classList.remove('hidden');
    }
    else {
        errorElement.classList.add('hidden');

        cards.forEach((card) => { //console.log(card);

            let img = '';
            if(card.authors[0].verified) {
                img += `<img class="w-6 h-6" src="./images/verify.png" alt=""></img>`;
            }
            
            const newCard = document.createElement('div');
            newCard.classList = `card w-full bg-base-100 shadow-xl`;

            newCard.innerHTML = `
            <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${card.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
            </figure>
            <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${card.authors[0].profile_picture}" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="card-title">${card.title}</h2>
                            <div class="flex mt-3">
                                <p class="mr-10">${card.authors[0].profile_name}</p>
                                ${img}
                            </div>
                            <p class="mt-3">${card.others.views} Views</p>
                        </div>
                    </div>
            </div>
            `;
            cardContainer.appendChild(newCard);
        })

    }
}

const sortByViewBtn = () => {
    displayVideoByCategory(defaultId, true)
}

fetchCatagories();

displayVideoByCategory(defaultId, false);