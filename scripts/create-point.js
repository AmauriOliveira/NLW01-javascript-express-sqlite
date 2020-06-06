function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
        .then(result => result.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city");
    const stateInput = document.querySelector("input[name=state");

    const ufSelectedCode = event.target.value;

    stateInput.value = event.target.options[event.target.selectedIndex].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelectedCode}/municipios`

    citySelect.innerHTML = "<option value=''>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then(result => result.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })

}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

//new
const itemsToCollect = document.querySelectorAll(".itens-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const colllectedItems = document.querySelector("input[nome=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    const alreadySelect = selectedItems.findIndex(item => item === itemId);

    if (alreadySelect !== -1) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item !== itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    colllectedItems.value = selectedItems;
}



