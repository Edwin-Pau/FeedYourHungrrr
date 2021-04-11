let myHeaders = new Headers();
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://feedyourhungrrr.herokuapp.com/api/v1/restaurants", requestOptions)
    .then(response => response.text())
    .then(result => {
        let restaurantsArr = JSON.parse(result);
        console.log(restaurantsArr)

        displayRestaurants(restaurantsArr);
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
            const h5 = document.createElement("h5")
            h5.setAttribute("id", "restaurant_name_"+choices[i].RestaurantID)
            h5.setAttribute("class", "card-text")
            h5.innerHTML = choices[i].RestaurantName
            h5.disabled = true

            const p1 = document.createElement("p")
            p1.classList.add("card-text")
            p1.setAttribute("id", "restaurant_desc_"+choices[i].RestaurantID)
            p1.setAttribute("class", "card-text")
            p1.innerHTML = choices[i].Description

            const btn4 = document.createElement("button")
            btn4.setAttribute("type", "button")
            btn4.classList.add("btn")
            btn4.classList.add("btn-primary")
            btn4.innerHTML = "See Menu"

            //Go to menu
            btn4.addEventListener('click', function(event) {
                localStorage.setItem("restID", choices[i].RestaurantID)
                window.location.href = "./menu.html";
            })

            document.getElementById("restaurantList").appendChild(outDiv1)
            outDiv1.appendChild(outDiv2)
            outDiv2.appendChild(outDiv3)
            outDiv3.appendChild(h5)
            outDiv3.appendChild(p1)
            outDiv3.appendChild(btn4)
        }
    }
}