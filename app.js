const btnContainer = document.getElementById('btn-container');

const fetchCatagories = async() => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const catagoriesList = data.data;
    addCatagoriesBtn(catagoriesList);
}

const addCatagoriesBtn = (catagoriesList) => {
    let btnList = '';
    catagoriesList.forEach((item) => { console.log(item);
        btnList += `<button class="btn  btn-ghost bg-slate-700 text-white text-lg">${item.category}</button>`;
    });
    btnContainer.innerHTML = `${btnList}`;
}

fetchCatagories();