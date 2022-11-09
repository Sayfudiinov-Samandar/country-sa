const elTemplate=document.querySelector(".template").content
const elResult =document.querySelector(".hero-info__box");
const elForm =document.querySelector(".hero-box__form");
const elCountrName=document.querySelector("#current");

const fragment =new DocumentFragment()




function filetCountry(array) {
    elResult.innerHTML=""
    array.forEach(cnt => {
        let language=Object.values(cnt.languages)
        let courensy=Object.keys(cnt.currencies)

        console.log(cnt);

        let cloneTemplate=elTemplate.cloneNode(true);
        cloneTemplate.querySelector(".item-box__flag").src=cnt.flags.svg
        cloneTemplate.querySelector(".item-box__region").textContent=cnt.region
        cloneTemplate.querySelector(".item-box__lagugae").textContent=language.join(", ")
        cloneTemplate.querySelector(".item-box__border").textContent=courensy.join(", ")
        cloneTemplate.querySelector(".item-box__subregion").textContent=cnt.subregion
        fragment.appendChild(cloneTemplate)

    });
    elResult.appendChild(fragment)

}


async function GetCountries(naMe="Uzbekistan") {
    try {
        const res =await fetch(`https://restcountries.com/v3.1/name/${naMe}`)
        const data =await res.json()
        filetCountry(data)
    } catch (error) {
        console.log(error);
    }
}
globe.addEventListener("click", (evt)=>{
    GetCountries(elCountrName.textContent.trim())
})

