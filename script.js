const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

const questions=[
    {
        question: "Isbot talab etmaydigan xossa?",
        answers:[
            {text: "ta'rif", correct: false},
            {text: "aksioma", correct: true},
            {text: "teorema", correct: false},
            {text: "matematik atama", correct: false},
        ]
    },
    {
        question: "Uchburchakning uchidan chiqqan medianasi, bissektrisasi va balandligi bitta nuqta joylashsa bunday uchburchak qanday ataladi?",
        answers: [
            {text: "teng tomonli", correct: false},
            {text: "ixtiyoriy", correct: false},
            {text: "teng yonli", correct: true},
            {text: "to'gri burchakli", correct: false},
        ]
    },
    {
        question: "Matematika faniga asos solgan bobokalonimizdan biri?",
        answers: [
            {text: "Navoiy", correct: false},
            {text: "Bobur", correct: false},
            {text: "Al-Fargoniy", correct: false},
            {text: "Al-Xorazmiy", correct: true},
        ]
    },
    {
        question: "Geometriya necha turga bo'linadi?",
        answers: [
            {text: "2", correct: true},
            {text: "3", correct: false},
            {text: "4", correct: false},
            {text: "5", correct: false},
        ]
    },
   
];


let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". " +currentQuestion
    .question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Sizning natijangiz ${questions.length} dan ${score}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}   

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})
