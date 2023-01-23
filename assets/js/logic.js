//Quiz Variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;

//HTML elements;
let questionsElement = document.getElementById("questions");
let timerElement = document.getElementById("time");
let choicesElement = document.getElementById("choices")
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackElement = document.getElementById("feedback");

// Sound variables for right and wrong answers
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

// If answer is wrong 15 seconds are deducted, the word "wrong" appears and a sound is activated. 
//If correct a sign saying "correct" will appear, and sound will chime.
function questionClick(){
    if(this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

    if(time < 0) {
        time = 0;
    }

    timerElement.textContent = time;
    sfxWrong.play();
    feedBackElement.textContent = "Wrong!";
    } else {
    sfxRight.play();
    feedBackElement.textContent = "Correct!";
    }

    //Feedback
    feedBackElement.setAttribute("class", "feedback");

    setTimeout(function(){
        feedBackElement.setAttribute("class", "feedback hide")
    }, 1000);

    //A loop to run the questions
    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }
}

//The choices section for each question in the quiz.
function getQuestion(){
    let currentQuestion = questions[currentQuestionIndex];

    let titleElement = document.getElementById("question-title");

    titleElement.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, index){
        let choiceButton = document.createElement("button");

        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = `${index + 1}. ${choice}`;

        choiceButton.addEventListener("click", questionClick);

        choicesElement.append(choiceButton);
    });
}
// Quiz end, end screen
function quizEnd(){
    clearInterval(timerID);

    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    questionsElement.setAttribute("class", "hide");
}
//Timer clock function, If time gets to 0 the quiz will end
function clockTick(){
    time--;
    timerElement.textContent = time;

    if(time <= 0){
        quizEnd();
    }

}
//Code for start of quiz, the timer will start and questions will appear
function startQuiz(){
let startScreenElement = document.getElementById("start-screen");
startScreenElement.setAttribute("class", "hide");

questionsElement.removeAttribute("class");

timerID = setInterval(clockTick, 1000);

timerElement.textContent = time;

getQuestion();
}

//Scores saved to highscore section
function saveHighScore(){
    let initials = initialElement.value.trim();
    console.log(initials);

    if(initials !== ""){
        let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore =  {
            score: time,
            initials: initials,
        }   

        highScores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScores));

        window.location.href = "highscores.html";
    } 
}

function checkForEnter(event){
    if(event.key === "Enter") {
        saveHighScore();
    }

}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);