const questions = [
{
    question: "Which language is used for web page structure?",
    options: ["Python","HTML","Java","C++"],
    answer: "HTML"
},
{
    question: "Which symbol is used for comments in Python?",
    options: ["//","#","/* */","--"],
    answer: "#"
},
{
    question: "Which company developed Java?",
    options: ["Google","Microsoft","Sun Microsystems","Apple"],
    answer: "Sun Microsystems"
},
{
    question: "Which keyword defines a function in Python?",
    options: ["func","function","def","define"],
    answer: "def"
},
{
    question: "Which language runs inside browsers?",
    options: ["JavaScript","C","Python","Java"],
    answer: "JavaScript"
}
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let username = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

function startQuiz(){
    username = document.getElementById("username").value;

    if(username.trim() === ""){
        alert("Enter your name");
        return;
    }

    document.getElementById("start-screen")
            .classList.add("hidden");

    document.getElementById("quiz-container")
            .classList.remove("hidden");

    loadQuestion();
}

function loadQuestion(){

    let q = questions[currentQuestion];

    questionEl.innerText =
    `${currentQuestion+1}. ${q.question}`;

    optionsEl.innerHTML = "";

    q.options.forEach(option => {

        let btn = document.createElement("button");

        btn.innerText = option;

        btn.classList.add("option");

        btn.onclick = () => {
            selectedAnswer = option;
        };

        optionsEl.appendChild(btn);
    });
}

nextBtn.addEventListener("click", () => {

    if(selectedAnswer === ""){
        alert("Select an answer");
        return;
    }

    if(selectedAnswer ===
       questions[currentQuestion].answer){
        score++;
    }

    selectedAnswer = "";

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    }
    else{
        finishQuiz();
    }
});

function finishQuiz(){

    document.getElementById("quiz-container")
            .classList.add("hidden");

    let resultDiv =
    document.getElementById("result");

    resultDiv.classList.remove("hidden");

    resultDiv.innerHTML =
    `<h2>${username}, Your Score: ${score}/${questions.length}</h2>`;

    saveScore();
    loadLeaderboard();
}

function saveScore(){

    let scores =
    JSON.parse(localStorage.getItem("scores"))
    || [];

    scores.push({
        name: username,
        score: score
    });

    scores.sort((a,b) => b.score - a.score);

    localStorage.setItem(
        "scores",
        JSON.stringify(scores)
    );
}

function loadLeaderboard(){

    let scores =
    JSON.parse(localStorage.getItem("scores"))
    || [];

    let list =
    document.getElementById("leaderboard-list");

    list.innerHTML = "";

    scores.slice(0,10).forEach(player => {

        let li = document.createElement("li");

        li.innerText =
        `${player.name} - ${player.score}`;

        list.appendChild(li);
    });
}

loadLeaderboard();