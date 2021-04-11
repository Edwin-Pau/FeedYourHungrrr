function getStats(){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://feedyourhungrrr.herokuapp.com/api/v1/stats", true)
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

getStats().then(function(data) {
    console.log("stat data");
    console.log(data);
    let statsArr = JSON.parse(data);
    document.getElementById("num_get_rest").innerHTML = statsArr[0].StatUsage;
    document.getElementById("num_get_rest2").innerHTML = statsArr[1].StatUsage;
    document.getElementById("num_post_rest").innerHTML = statsArr[2].StatUsage;
    document.getElementById("num_put_rest").innerHTML = statsArr[3].StatUsage;
    document.getElementById("num_delete_rest").innerHTML = statsArr[4].StatUsage;
    document.getElementById("num_get_menu").innerHTML = statsArr[5].StatUsage;
    document.getElementById("num_post_menu").innerHTML = statsArr[6].StatUsage;
    document.getElementById("num_put_menu").innerHTML = statsArr[7].StatUsage;
    document.getElementById("num_delete_menu").innerHTML = statsArr[8].StatUsage;
    document.getElementById("num_post_signup").innerHTML = statsArr[9].StatUsage;
    document.getElementById("num_post_login").innerHTML = statsArr[10].StatUsage;

}).catch(function(err) {
    console.error(err);
});
