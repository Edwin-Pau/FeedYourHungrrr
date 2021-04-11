let myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem("token"));
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

            const h5 = document.createElement("textarea")
            h5.classList.add("card-title")
            h5.setAttribute("id", "menu_name_"+choices[i].ItemID)
            h5.setAttribute("class", "card-title")
            h5.innerHTML = choices[i].ItemName
            h5.style.height = "2em";
            h5.style.width = "100%";
            h5.disabled = true
            const ul = document.createElement("ul")
            ul.classList.add("list-group")
            ul.classList.add("list-group-flush")

            const li1 = document.createElement("textarea")
            li1.classList.add("list-group-item")
            li1.setAttribute("id", "menu_price_"+choices[i].ItemID)
            li1.setAttribute("class", "list-group-item")
            li1.innerHTML = choices[i].ItemPrice
            li1.style.height = "2em";
            li1.style.width = "100%";
            li1.disabled = true
            const outDiv4 = document.createElement("div")
            outDiv4.classList.add("card-body")
            outDiv4.classList.add("btn-group")

            const btn1 = document.createElement("button")
            btn1.setAttribute("type", "button")
            btn1.classList.add("btn")
            btn1.classList.add("btn-primary")
            btn1.innerHTML = "Edit"
            const btn2 = document.createElement("button")
            btn2.setAttribute("type", "button")
            btn2.classList.add("btn")
            btn2.classList.add("btn-warning")
            btn2.innerHTML = "Save"
            btn2.disabled = true
            const btn3 = document.createElement("button")
            btn3.setAttribute("type", "button")
            btn3.classList.add("btn")
            btn3.classList.add("btn-danger")
            btn3.innerHTML = "Delete"

            document.getElementById("menuList").appendChild(outDiv1)
            outDiv1.appendChild(outDiv2)

            outDiv2.appendChild(outDiv3)
            outDiv3.appendChild(h5)

            outDiv2.appendChild(ul)
            ul.appendChild(li1)

            outDiv2.appendChild(outDiv4)
            outDiv4.appendChild(btn1)
            outDiv4.appendChild(btn2)
            outDiv4.appendChild(btn3)

            //Edit
            btn1.addEventListener('click', function(event) {
                h5.removeAttribute("disabled");
                li1.removeAttribute("disabled");
                btn1.disabled = true
                btn2.removeAttribute("disabled");
            })
            //Save - PUT
            btn2.addEventListener('click', function(event) {
                const newMenuName = h5.value
                const newMenuPrice = li1.value

                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", localStorage.getItem("token"));

                let raw = JSON.stringify({
                    "itemName": newMenuName,
                    "itemPrice": Number(newMenuPrice),
                    "itemID": choices[i].ItemID
                });
                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://feedyourhungrrr.herokuapp.com/api/v1/items", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        btn2.disabled = true
                        btn1.removeAttribute("disabled")
                        h5.disabled = true
                        li1.disabled = true
                    })
                    .catch(error => console.log('error', error));
            })
            //Delete -DELETE
            btn3.addEventListener('click', function(event) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", localStorage.getItem("token"));

                let raw = JSON.stringify({
                    "itemID": choices[i].ItemID
                })

                let requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://feedyourhungrrr.herokuapp.com/api/v1/items", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(() => location.reload())
                    .catch(error => console.log('error', error));
            })
        }
    }

    let totalNumOfMenu = choices.length;

    //create
    document.getElementById('btn_create').addEventListener('click', function(event){
        totalNumOfMenu= totalNumOfMenu+1;
        const newMenu = buildNewMenu(totalNumOfMenu);
        document.getElementById("menuList").appendChild(newMenu);
        document.getElementById('btn_create').setAttribute("disabled", true);
        document.getElementById('btn_save').removeAttribute("disabled");
    });

    //save: post
    document.getElementById('btn_save').addEventListener('click', function(event){
        const newMenuName = document.getElementById("menu_name_"+totalNumOfMenu).value
        const newMenuPrice = document.getElementById("menu_price_"+totalNumOfMenu).value

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem("token"));

        let raw = JSON.stringify({
            "itemName": newMenuName,
            "itemPrice": Number(newMenuPrice),
            "restaurantID": Number(localStorage.getItem("restID"))
        });
        console.log(raw)
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://feedyourhungrrr.herokuapp.com/api/v1/items", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(() => location.reload())
            .catch(error => console.log('error', error));

    });
}
///////////////////////////

const buildNewMenu = (numOfMenu) => {
    const outDiv1 = document.createElement("div")
    outDiv1.setAttribute("class", "col")
    const outDiv2 = document.createElement("div")
    outDiv2.classList.add("card")
    const outDiv3 = document.createElement("div")
    outDiv3.classList.add("card-body")

    const ta1 = document.createElement("textarea")
    ta1.classList.add("card-title")
    ta1.setAttribute("id", "menu_name_"+numOfMenu)
    ta1.setAttribute("placeholder", "menu name")
    ta1.style.height = "2em";
    ta1.style.width = "100%";

    const ul = document.createElement("ul")
    ul.classList.add("list-group")
    ul.classList.add("list-group-flush")

    const ta3 = document.createElement("textarea")
    ta3.classList.add("list-group-item")
    ta3.setAttribute("id", "menu_price_"+numOfMenu)
    ta3.setAttribute("placeholder", "menu price")
    ta3.style.height = "2em";
    ta3.style.width = "100%";

    outDiv1.appendChild(outDiv2)

    outDiv2.appendChild(outDiv3)
    outDiv3.appendChild(ta1)
    // outDiv3.appendChild(ta2)

    outDiv2.appendChild(ul)
    ul.appendChild(ta3)
    // ul.appendChild(ta4)

    return outDiv1
}
