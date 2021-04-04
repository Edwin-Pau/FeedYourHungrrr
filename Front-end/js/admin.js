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

getData().then(function(data) {
    // Load info
    let splitData = data.split("///");
    let questionsArr = JSON.parse(splitData[0]);
    let choicesArr = JSON.parse(splitData[1]);
    //



    //Construct questions
    questions = [];
    for (let i=0; i < questionsArr["rows1"].length; i++){
        question = {};
        question.questionNumber = questionsArr["rows1"][i].id;
        question.question = questionsArr["rows1"][i].question;
        question.correctAnswer = questionsArr["rows1"][i].answer;
        question.answers = []
        for(let j=0; j < choicesArr["rows2"].length; j++){
            var el = choicesArr["rows2"][j];
            if(questionsArr["rows1"][i].id == el.id_question){
                question.answers.push(el.description);
            }
        }
        // console.log(question);
        questions.push(question);
    }

    displayQuestions(questions);
    document.getElementById('btn_save').setAttribute("disabled", true);
}).catch(function(err) {
    console.error(err);
});

function displayQuestions(qs) {

}