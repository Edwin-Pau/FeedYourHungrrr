function getData(){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://lucaswgong.com/COMP4537/individual/API/v1/questions", true)
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200){
                if (this.responseText){
                    resolve(this.responseText);
                } else {
                    reject(new Error("Request is failed"));
                }
            }
        }
    });
}