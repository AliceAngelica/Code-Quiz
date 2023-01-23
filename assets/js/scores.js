//Function that prints highscores
function printHighScores(){
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];

    highScores.sort(function(a, b) {
        return b.score - a.score;
    })

    highScores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`;

        let ol = document.getElementById("highscores");
        ol.appendChild(li);
        
    })
};
//Function to clear the highscores
function clearHighScores(){
    localStorage.removeItem("highscores");
    window.location.reload();

}

// Methods 1
//document.getElementById("clear").addEventListener("click", clearHighScores);

// method 2
//let clearButton = document.addEventListener("click", clearHighScores);
//clearButton.addEventListener("clear", clearHighScores);

// document.getElementById("clear").onClick = clearHighScores;

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearHighScores);

printHighScores();

