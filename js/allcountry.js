const elChangeThemeBtn = document.querySelector(".heder-text");
const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".hero-input");
const elResult = document.querySelector(".hero-list");
const elAllTemplate = document.querySelector(".all-template").content;
const elAllTemplateModal = document.querySelector(".all-template-modal").content;

const elOption = document.querySelector("option");
const elSelect = document.querySelector(".select");
const elModalResult = document.querySelector(".modal-result");


const fragment = new DocumentFragment();
const fragmentModal = new DocumentFragment();



elSelect.addEventListener("change", (evt) => {
    if (elSelect.value == "Filter by Region") {
        defalutCountry()

    } else {
        countryReg(elSelect.value)

    }
})



elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    if (elFormInput.value == "All" || elFormInput.value == "all") {
        defalutCountry()
    } else {
        GetCountries(elFormInput.value.trim())
    }
})

elChangeThemeBtn.addEventListener("click", function () {
    document.body.classList.toggle("theme-dark");
});


function modalArray(array, info) {
    let aCountry = array.find(item => {
        return item.name.common == info
    })
    console.log(array);
    const cloneFragment = elAllTemplateModal.cloneNode(true);
    elModalResult.innerHTML = ""
    cloneFragment.querySelector(".flag-img").src = aCountry.flags.svg
    cloneFragment.querySelector(".hero-list-box-title").textContent = aCountry.name.common
    cloneFragment.querySelector(".modal-curr").textContent = Object.keys(aCountry.currencies)
    cloneFragment.querySelector(".text-region").textContent = aCountry.region
    cloneFragment.querySelector(".modal-map").href = aCountry.maps.googleMaps

    cloneFragment.querySelector(".text-subreg").textContent = aCountry.subregion

    cloneFragment.querySelector(".text-leng").textContent = Object.values(aCountry.languages)

    cloneFragment.querySelector(".text-cap").textContent = aCountry.borders?.join(", ")

    fragmentModal.appendChild(cloneFragment)

    elModalResult.appendChild(fragmentModal)
}

function makeList(array) {
    elResult.innerHTML = ""
    array.forEach(item => {
        const cloneFragment = elAllTemplate.cloneNode(true);
        cloneFragment.querySelector(".flag-img").src = item.flags.svg
        cloneFragment.querySelector(".hero-list-box-title").textContent = item.name.common
        cloneFragment.querySelector(".hero-list-box-text").textContent = item.population
        cloneFragment.querySelector(".text-region").textContent = item.region
        cloneFragment.querySelector(".text-cap").textContent = item.capital
        cloneFragment.querySelector(".btn-more").dataset.forModal = item.name.common

        cloneFragment.querySelector(".btn-more").addEventListener("click", (evt) => {
            if (evt.target.dataset.forModal) {
                modalArray(array, evt.target.dataset.forModal)
            }
        })
        fragment.appendChild(cloneFragment)
    });
    elResult.appendChild(fragment)
}


async function GetCountries(naMe) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${naMe}`)
        const data = await res.json()
        makeList(data)

    } catch (error) {
        console.log(error);
    }
}

async function countryReg(reg) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${reg}`)
        const data = await res.json()
        makeList(data)

    } catch (error) {
        console.log(error);
    }
}

async function defalutCountry() {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await res.json()
        makeList(data)
    } catch (error) {
        console.log(error);
    }
}

defalutCountry()