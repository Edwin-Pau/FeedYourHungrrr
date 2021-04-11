let myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem("token"));
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://feedyourhungrrr.herokuapp.com/api/v1/restaurants/me", requestOptions)
    .then(response => response.text())
    .then(result => {
        let restaurantsArr = JSON.parse(result);
        console.log(restaurantsArr)

        displayRestaurants(restaurantsArr);
        document.getElementById('btn_save').setAttribute("disabled", "disabled");
    })
    .catch(error => console.log('error', error));


function displayRestaurants(choices) {
    if (choices.length !== 0) {
        let numOfRestaurants = choices.length;

        for (let i=0; i < numOfRestaurants; i++){
            const outDiv1 = document.createElement("div")
            outDiv1.setAttribute("class", "col")
            const outDiv2 = document.createElement("div")
            outDiv2.classList.add("card")
            outDiv2.classList.add("shadow-sm")
            const outDiv3 = document.createElement("div")
            outDiv3.setAttribute("class", "card-body")
            const ta1 = document.createElement("textarea")
            ta1.setAttribute("id", "restaurant_name_"+choices[i].RestaurantID)
            ta1.setAttribute("class", "card-text")
            ta1.innerHTML = choices[i].RestaurantName
            ta1.disabled = true
            ta1.style.height = "2em";
            ta1.style.width = "100%";

            const ta2 = document.createElement("textarea")
            ta2.setAttribute("id", "restaurant_desc_"+choices[i].RestaurantID)
            ta2.setAttribute("class", "card-text")
            ta2.innerHTML = choices[i].Description
            ta2.disabled = true
            ta2.style.width = "100%";

            const outDiv4 = document.createElement("div")
            outDiv4.classList.add("d-flex")
            outDiv4.classList.add("justify-content-between")
            outDiv4.classList.add("align-items-center")
            const outDiv5 = document.createElement("div")
            outDiv5.setAttribute("class", "btn-group")
            outDiv5.style.marginTop = "5px"

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

            const btn4 = document.createElement("button")
            btn4.setAttribute("type", "button")
            btn4.classList.add("btn")
            btn4.classList.add("btn-primary")
            btn4.innerHTML = "See Menu"

            //Edit
            btn1.addEventListener('click', function(event) {
                ta1.removeAttribute("disabled");
                ta2.removeAttribute("disabled");
                btn1.disabled = true
                btn2.removeAttribute("disabled");
            })
            //Save - PUT
            btn2.addEventListener('click', function(event) {
                const newRestaurantName = ta1.value
                const newRestaurantDesc = ta2.value

                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", localStorage.getItem("token"));

                let raw = JSON.stringify({
                    "id" : choices[i].RestaurantID,
                    "name": newRestaurantName,
                    "description": newRestaurantDesc
                });

                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://feedyourhungrrr.herokuapp.com/api/v1/restaurants", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        btn2.disabled = true
                        btn1.removeAttribute("disabled")
                        ta1.disabled = true
                        ta2.disabled = true
                    })
                    .catch(error => console.log('error', error));
            })
            //Delete -DELETE
            btn3.addEventListener('click', function(event) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", localStorage.getItem("token"));

                let raw = JSON.stringify({
                    "id": choices[i].RestaurantID
                })

                let requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://feedyourhungrrr.herokuapp.com/api/v1/restaurants", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(() => location.reload())
                    .catch(error => console.log('error', error));
            })
            //Go to menu
            btn4.addEventListener('click', function(event) {
                localStorage.setItem("restID", choices[i].RestaurantID)
                window.location.href = "./menu_admin.html";
            })

            document.getElementById("restaurantList").appendChild(outDiv1)
            outDiv1.appendChild(outDiv2)
            outDiv2.appendChild(outDiv3)
            outDiv3.appendChild(ta1)
            outDiv3.appendChild(ta2)
            outDiv3.appendChild(outDiv4)
            outDiv4.appendChild(outDiv5)
            outDiv5.appendChild(btn1)
            outDiv5.appendChild(btn2)
            outDiv5.appendChild(btn3)
            outDiv5.appendChild(btn4)
        }
    }

    let totalNumOfRestaurants = choices.length;

    //create
    document.getElementById('btn_create').addEventListener('click', function(event){
        totalNumOfRestaurants= totalNumOfRestaurants+1;
        const newRestaurant = buildNewRestaurant(totalNumOfRestaurants);
        document.getElementById("restaurantList").appendChild(newRestaurant);
        document.getElementById('btn_create').setAttribute("disabled", true);
        document.getElementById('btn_save').removeAttribute("disabled");
    });

    //save: post
    document.getElementById('btn_save').addEventListener('click', function(event){
        const newRestaurantName = document.getElementById("restaurant_name_"+totalNumOfRestaurants).value
        const newRestaurantDesc = document.getElementById("restaurant_desc_"+totalNumOfRestaurants).value

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem("token"));

        let raw = JSON.stringify({
            "name": newRestaurantName,
            "description": newRestaurantDesc
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://feedyourhungrrr.herokuapp.com/api/v1/restaurants", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(() => location.reload())
            .catch(error => console.log('error', error));
    });
}
///////////////////////////

const buildNewRestaurant = (numOfRestaurants) => {
    const outDiv1 = document.createElement("div")
    outDiv1.setAttribute("class", "col")
    const outDiv2 = document.createElement("div")
    outDiv2.classList.add("card")
    outDiv2.classList.add("shadow-sm")
    const outDiv3 = document.createElement("div")
    outDiv3.classList.add("card-body")
    outDiv3.classList.add("form-floating")
    const ta1 = document.createElement("input")
    ta1.setAttribute("id", "restaurant_name_"+numOfRestaurants)
    ta1.setAttribute("class", "form-control")
    ta1.placeholder = "restaurant name"
    ta1.style.height = "2em";
    const ta2 = document.createElement("textarea")
    ta2.setAttribute("id", "restaurant_desc_"+numOfRestaurants)
    ta2.setAttribute("class", "form-control")
    ta2.placeholder = "restaurant description"

    outDiv1.appendChild(outDiv2)
    outDiv2.appendChild(outDiv3)
    outDiv3.appendChild(ta1)
    outDiv3.appendChild(ta2)

    return outDiv1
}
