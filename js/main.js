const elTemplate = document.querySelector(".template").content
const elResult = document.querySelector(".hero-info__box");
const elForm = document.querySelector(".hero-box__form");
const elCountrName = document.querySelector("#current");
const elCountrPopulation = document.querySelector(".hero-box__population");
const elGrbCountry=document.querySelector(".hero-box__grb")
const elBorderCountry=document.querySelector(".hero-box__borders")
const elmapCountry=document.querySelector(".hero-box__map")




const fragment = new DocumentFragment()


function filetCountry(array) {
    elResult.innerHTML = ""
    // array.forEach(cnt => {
    let language = Object.values(array.languages)
    let courensy = Object.keys(array.currencies)
    let border=array.borders?.join(", ")
    console.log(array);
    elGrbCountry.src = array.flags.svg
    elCountrPopulation.textContent=array.population
    elmapCountry.href=array.maps.googleMaps

    let cloneTemplate = elTemplate.cloneNode(true);
    elBorderCountry.textContent=border
    cloneTemplate.querySelector(".item-box__flag").src = array.coatOfArms.svg
    cloneTemplate.querySelector(".item-box__region").textContent = array.region
    cloneTemplate.querySelector(".item-box__lagugae").textContent = language.join(", ")
    cloneTemplate.querySelector(".item-box__border").textContent = courensy.join(", ")
    cloneTemplate.querySelector(".item-box__subregion").textContent = array.subregion
    fragment.appendChild(cloneTemplate)

    // });
    elResult.appendChild(fragment)

}



async function GetCountries(naMe="Uzbekistan") {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${naMe}`)
        const data = await res.json()
        
        filetCountry(data[0])
    
    } catch (error) {
        console.log(error);
    }
}
globe.addEventListener("click", (evt) => {
    if (elCountrName.textContent=="Antarctica" || elCountrName.textContent=="antarctica") {
        window.location.reload()
        alert("Antarctica is not a country")
    }
    if (elCountrName.textContent=="United States"){
        GetCountries("usa")
    }else{
        GetCountries(elCountrName.textContent.trim())
    }
})

elSiteForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    elCountrName.textContent=elForminput.value
    GetCountries(elForminput.value)
    
    elForminput.value=""
})
console.log(elBorderCountry.textContent);


GetCountries()


