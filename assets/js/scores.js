function printHighScores(){
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];

    highScores.sort(function(a, b) {
        return b.score - a.score;
    })

    highScores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = `${score.initials} = ${score.score}`

        let ol = document.getElementById("highscores");
        ol.appendChild(li);
        
    })
}

function clearHighScores(){
    localStorage.removeItem("highscores");
    window.location.reload();

}

// Methods of this section (to try out)
//(my method) document.getElementById("clear").addEventListener("click", clearHighScores);

// method 2
// let clearButton = document.addEventListener("click", clearHighScores);
// clearButton.addEventListener("clear", clearHighScores);

//method 3
document.getElementById("clear").onClick = clearHighScores;

printHighScores();

