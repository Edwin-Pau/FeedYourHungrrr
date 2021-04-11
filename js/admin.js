document.getElementById('logout_div').style.display = "none"
document.getElementById('register_div').style.display = "none"

if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
    console.log("Token detected!")
    document.getElementById('logout_div').style.display = "block"
    document.getElementById('login_div').style.display = "none"
} else {
    console.log("No token detected!")
    document.getElementById('btn_login').addEventListener('click', function (event) {
        const userName = document.getElementById("user_name").value
        const password = document.getElementById("password").value

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": userName.toString(),
            "password": password.toString()
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://feedyourhungrrr.herokuapp.com/api/v1/users/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                const resultObj = JSON.parse(result)

                if (resultObj.token) {
                    localStorage.setItem("token", resultObj.token)
                    window.location.href = "./restaurant_admin.html" 
                } else {
                    alert("Login unsuccessful! Please try again.")
                }
            })
            .catch(error => console.log('error', error));
    });
}

document.getElementById('btn_register2').addEventListener('click', function (event) {
    const userName = document.getElementById('register_name').value
    const password1 = document.getElementById('register_password1').value
    const password2 = document.getElementById('register_password2').value

    if (userName.length === 0) {
        alert("You must enter a user name!")
    }

    if (password1.length === 0) {
        alert("You must enter a password!")
    }

    if (password1 !== password2) {
        alert("The input passwords do not match!")
        return;
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": userName.toString(),
        "password": password1.toString()
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://feedyourhungrrr.herokuapp.com/api/v1/users/signup", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            const resultObj = JSON.parse(result)
            localStorage.setItem("token", resultObj.token)
        })
        .then(() => { window.location.href = "./restaurant_admin.html" })
        .catch(error => console.log('error', error));
});

document.getElementById('btn_register').addEventListener('click', function (event) {
    document.getElementById('login_div').style.display = "none"
    document.getElementById('register_div').style.display = "block"
});

document.getElementById('btn_logout').addEventListener('click', function (event) {
    localStorage.clear()
    window.location.href = "./home.html" 
});

document.getElementById('btn_admin_menu').addEventListener('click', function (event) {
    window.location.href = "./restaurant_admin.html" 
});
