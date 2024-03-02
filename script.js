const questions = [
    {
        question:  "What is the capital of France?",
        answers:  [
            {text : 'Paris', correct: true},
            {text : 'Delhi', correct: false},
            {text : 'New York', correct: false},
            {text : 'Munich', correct: false},
        ]
    },

    {
        question: "Who was the first president of the United States?",
        answers:   [
            {text : 'Carry Minati', correct: false},
            {text : 'George Washington', correct: true},
            {text : 'Virat Kohli', correct: false},
            {text : 'Cristiano Ronaldo', correct: false},
        ]
    },

    {
        question: "Which planet in our solar system has a red appearance?",
        answers:   [
            {text : 'Earth', correct: false},
            {text : 'Venus', correct: false},
            {text : 'Mars', correct: true},
            {text : 'Jupiter', correct: false}
        ]
    } ,

    {
        question: "Which is the highest mountain peak ?",
        answers:   [
            {text : 'Mount Vinson', correct: false},
            {text : 'Dhaulagiri', correct: false},
            {text : 'Kailash', correct: false},
            {text : 'Mount Everest', correct: true}
        ] 
    },
]

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let  currentQuestionIndex = 0;
let score = 0 ; 

function startquiz(){
    currentQuestionIndex = 0;
    score = 0 ; 
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct ;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){    
    const selectedBtn = e.target ; 
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextBtn.style.display = "inline-block";
    prevBtn.style.display = "inline-block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You got ${score} out  of ${questions.length}`;
    nextBtn.innerHTML = "Play again"
    
    nextBtn.style.display = "block";
    nextBtn.style.textAlign = "center";
}
function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion ();
    }
    else{
        showScore();
    }
}
nextBtn.addEventListener( "click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startquiz();
    }
}
)
startquiz();