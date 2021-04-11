let myHeaders = new Headers();
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
let restID = localStorage.getItem("restID")
fetch("https://feedyourhungrrr.herokuapp.com/api/v1/items?id="+restID, requestOptions)
    .then(response => response.text())
    .then(result => {
        let menuArr = JSON.parse(result);
        console.log(menuArr)

        displayMenu(menuArr);
        document.getElementById('btn_save').setAttribute("disabled", "disabled");
    })
    .catch(error => console.log('error', error));


function displayMenu(choices) {
    if (choices.length !== 0) {
        let numOfMenu = choices.length;

        for (let i=0; i < numOfMenu; i++){
            const outDiv1 = document.createElement("div")
            outDiv1.setAttribute("class", "col")
            const outDiv2 = document.createElement("div")
            outDiv2.classList.add("card")
            const outDiv3 = document.createElement("div")
            outDiv3.classList.add("card-body")

            const h5 = document.createElement("h5")
            h5.classList.add("card-title")
            h5.setAttribute("id", "menu_name_"+choices[i].ItemID)
            h5.setAttribute("class", "card-title")
            h5.innerHTML = choices[i].ItemName

            const ul = document.createElement("ul")
            ul.classList.add("list-group")
            ul.classList.add("list-group-flush")

            const li1 = document.createElement("li")
            li1.classList.add("list-group-item")
            li1.setAttribute("id", "menu_price_"+choices[i].ItemID)
            li1.setAttribute("class", "list-group-item")
            li1.innerHTML = "$" +choices[i].ItemPrice

            document.getElementById("menuList").appendChild(outDiv1)
            outDiv1.appendChild(outDiv2)

            outDiv2.appendChild(outDiv3)
            outDiv3.appendChild(h5)

            outDiv2.appendChild(ul)
            ul.appendChild(li1)

        }
    }

}
