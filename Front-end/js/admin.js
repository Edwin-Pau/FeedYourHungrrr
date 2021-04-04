function getData(){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://feedyourhungrrr.herokuapp.com/api/v1/restaurants", true)
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200){
                if (this.responseText){
                    resolve(this.responseText);
                } else {
                    reject(new Error("Request is failed"));
                }
            }
        }
    });
}
function getStats(){
    return new Promise((resolve, reject) => {
        let xhttp3 = new XMLHttpRequest();
        xhttp3.open("GET", "https://feedyourhungrrr.herokuapp.com/api/v1/stats", true)
        xhttp3.send();
        xhttp3.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200){
                if (this.responseText){
                    resolve(this.responseText);
                } else {
                    reject(new Error("Request is failed"));
                }
            }
        }
    });
}

getData().then(function(data) {
    // Load info
    getStats().then(function(data) {
        // Load info
        console.log("stat data");
        console.log(data);
        let statsArr = JSON.parse(data);
        document.getElementById("num_get_admin").innerHTML = statsArr[0].StatUsage;
        document.getElementById("num_post_admin").innerHTML = statsArr[1].StatUsage;

    }).catch(function(err) {
        console.error(err);
    });
    //console.log(data);
    console.log(typeof(data));
    let restaurantsArr = JSON.parse(data);
    console.log(restaurantsArr)

    displayRestaurants(restaurantsArr);
    document.getElementById('btn_save').setAttribute("disabled", true);
}).catch(function(err) {
    console.error(err);
});


function displayRestaurants(choices) {
    if (choices.length !== 0) {
        numOfRestaurants = choices.length;

        for (let i=0; i < numOfRestaurants; i++){
            const outDiv1 = document.createElement("div")
            outDiv1.setAttribute("classs", "col")
            const outDiv2 = document.createElement("div")
            outDiv2.classList.add("card")
            outDiv2.classList.add("shadow-sm")
            const outDiv3 = document.createElement("div")
            outDiv3.setAttribute("classs", "card-body")
            const p1 = document.createElement("p")
            p1.setAttribute("id", choices[i].RestaurantID)
            p1.setAttribute("classs", "card-text")
            p1.innerHTML = choices[i].RestaurantName

            const outDiv4 = document.createElement("div")
            outDiv4.classList.add("d-flex")
            outDiv4.classList.add("justify-content-between")
            outDiv4.classList.add("align-items-center")
            const outDiv5 = document.createElement("div")
            outDiv5.setAttribute("classs", "btn-group")

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
            const btn3 = document.createElement("button")
            btn3.setAttribute("type", "button")
            btn3.classList.add("btn")
            btn3.classList.add("btn-danger")
            btn3.innerHTML = "Delete"

            document.getElementById("restaurantList").appendChild(outDiv1)
            outDiv1.appendChild(outDiv2)
            outDiv2.appendChild(outDiv3)
            outDiv3.appendChild(p1)
            outDiv3.appendChild(outDiv4)
            outDiv4.appendChild(outDiv5)
            outDiv5.appendChild(btn1)
            outDiv5.appendChild(btn2)
            outDiv5.appendChild(btn3)
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
        const newRestaurantName = document.getElementById(totalNumOfRestaurants).value
        // const newRestaurant = {}
        // newRestaurant.restaurantID = totalNumOfRestaurants;
        // newRestaurant.name = newRestaurantName;
        // console.log(newRestaurant);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": newRestaurantName
        });

        var requestOptions = {
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
        // let xhttp2 = new XMLHttpRequest();
        // let params = "data="+JSON.stringify(newRestaurant);
        // xhttp2.open("POST", "https://feedyourhungrrr.herokuapp.com/api/v1/restaurants", true);
        // xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhttp2.send(params);
        //
        // xhttp2.onreadystatechange = function() {
        //     if (xhttp2.readyState === 4 && xhttp2.status === 201) {
        //         console.log("post request result: " + xhttp2.responseText)
        //         location.reload();
        //     }
        // }

    });
}
///////////////////////////

const buildNewRestaurant = (numOfRestaurants) => {
    const outDiv1 = document.createElement("div")
    outDiv1.setAttribute("classs", "col")
    const outDiv2 = document.createElement("div")
    outDiv2.classList.add("card")
    outDiv2.classList.add("shadow-sm")
    const outDiv3 = document.createElement("div")
    outDiv3.classList.add("card-body")
    outDiv3.classList.add("form-floating")
    const ta1 = document.createElement("textarea")
    ta1.setAttribute("id", numOfRestaurants)
    ta1.setAttribute("classs", "form-control")
    ta1.setAttribute("placeholder", "restaurant name")

    outDiv1.appendChild(outDiv2)
    outDiv2.appendChild(outDiv3)
    outDiv3.appendChild(ta1)

    return outDiv1
}
