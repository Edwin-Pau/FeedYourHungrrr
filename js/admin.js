//login
document.getElementById('btn_login').addEventListener('click', function(event){
    const userName = document.getElementById("user_name").value
    const password = document.getElementById("password").value
    console.log(userName)
    console.log(password)

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": userName,
        "password": password
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
            localStorage.setItem("token", resultObj.token)
        })
        .then(()=> {window.location.href = "./restaurant_admin.html"})
        .catch(error => console.log('error', error));
});

//register
document.getElementById('btn_register').addEventListener('click', function(event){
    document.getElementById('btn_register').disabled = true
    document.getElementById('containerDiv').style.visibility = "visible"
    document.getElementById('login_div').style.visibility = "hidden"
});

document.getElementById('btn_register2').addEventListener('click', function(event){

    const userName = document.getElementById('register_name').value
    const password1 = document.getElementById('register_password1').value
    const password2 = document.getElementById('register_password2').value

    if (password1 !== password2){
        alert("The input passwords do not match!")
        return;
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": userName,
        "password": password1
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://feedyourhungrrr.herokuapp.com/api/v1/users/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log("signup succeed"))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // fetch("https://feedyourhungrrr.herokuapp.com/api/v1/users/signup", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .then(() => document.getElementById('btn_register').removeAttribute("disabled"))
    //     .then(() => document.getElementById('containerDiv').style.display = "none")
    //     .catch(error => console.log(error));
});

if (localStorage.getItem('token')) {
    document.getElementById('logout_div').style.visibility = "visible";
    document.getElementById('login_div').style.visibility = "hidden";
}
