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
    //document.getElementById('containerDiv').style.display = "initial"
    document.getElementById('containerDiv').style.visibility = "visible"

    // const outDiv1 = document.createElement("div")
    // outDiv1.setAttribute("id", "containerDiv")
    //
    // const outDiv2 = document.createElement("div")
    // const title = document.createElement("h4")
    // title.innerHTML = "Create New Account"
    //
    // const form1 = document.createElement("form")
    // const outDiv3 = document.createElement("div")
    // outDiv3.setAttribute("class", "form-group")
    // const label1 = document.createElement("label")
    // label1.innerHTML = "Enter Your User Name"
    // const input1 = document.createElement("input")
    // input1.setAttribute("type", "text")
    // input1.setAttribute("class", "form-control")
    // input1.setAttribute("placeholder", "User Name")
    // input1.setAttribute("id", "register_name")
    //
    // const outDiv4 = document.createElement("div")
    // const label2 = document.createElement("label")
    // label2.innerHTML = "Enter Your Password"
    // const input2 = document.createElement("input")
    // input2.setAttribute("type", "password")
    // input2.setAttribute("class", "form-control")
    // input2.setAttribute("placeholder", "Password")
    // input2.setAttribute("id", "register_password1")
    //
    // const outDiv5 = document.createElement("div")
    // const label3 = document.createElement("label")
    // label3.innerHTML = "Enter Your Password One More"
    // const input3 = document.createElement("input")
    // input3.setAttribute("type", "password")
    // input3.setAttribute("class", "form-control")
    // input3.setAttribute("placeholder", "Password")
    // input3.setAttribute("id", "register_password2")
    //
    // const reg_btn = document.createElement("button")
    // reg_btn.setAttribute("id", "btn_register2")
    // reg_btn.classList.add("btn")
    // reg_btn.classList.add("btn-black")
    // reg_btn.innerHTML = "Register"
    //
    // document.getElementById("login_div").appendChild(outDiv1)
    // outDiv1.appendChild(outDiv2)
    // outDiv2.appendChild(title)
    //
    // outDiv1.appendChild(form1)
    // form1.appendChild(outDiv3)
    // outDiv3.append(label1)
    // outDiv3.append(input1)
    // form1.appendChild(outDiv4)
    // outDiv4.append(label2)
    // outDiv4.append(input2)
    // form1.appendChild(outDiv5)
    // outDiv5.append(label3)
    // outDiv5.append(input3)
    // form1.appendChild(reg_btn)
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