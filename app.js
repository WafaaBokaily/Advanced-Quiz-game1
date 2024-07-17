currentIndex = 0;
score = 0;
timeLeft = 50;
questions = [];


let Questions = {
    easy: [
        {
            question: "What is the capital of France?",
            options: ["Berlin",  "Madrid","Paris","Rome" ],
            correct: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: "4"
        },
        {
            question: "What is the capital of France?",
            options: ["Berlin",  "Madrid","Paris","Rome" ],
            correct: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: "4"
        }
    ],
    medium: [
        {
            question: "What is the capital of Germany?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: "Berlin"
        },
        {
            question: "What is 5 + 7?",
            options: ["10", "11", "12", "13"],
            correct: "12"
        },
        {
            question: "What is the capital of France?",
            options: ["Berlin",  "Madrid","Paris","Rome" ],
            correct: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: "4"
        }
    ],
    hard: [
        {
            question: "What is the capital of Spain?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: "Madrid"
        },
        {
            question: "What is 8 + 9?",
            options: ["15", "16", "17", "18"],
            correct: "17"
        },
        {
            question: "What is the capital of France?",
            options: ["Berlin",  "Madrid","Paris","Rome" ],
            correct: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: "4"
        }
    ]
};

function start(difficulty) {//based on the difficulty , we'll choose the questions 
    questions =Questions[difficulty];
    nb =questions.length;
    document.getElementById('RemainingQuestion').innerHTML=nb;
    document.getElementById('start').style.display = 'none';
    
    document.getElementById('quiz').style.display = 'block';
    //when we select what we need , the div quiz will appear and the div with id=start will be hidden
    startTimer(); 
    Question();
}

function restart() {//back to first step
    currentIndex = 0;
    score = 0;
    timeLeft = 50;
    document.getElementById('timeLeft').innerText = timeLeft;
    document.getElementById('result').style.display = 'none';
    document.getElementById('start').style.display = 'block';
}


function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function Question() {
    const question = questions[currentIndex];
    document.getElementById('question').innerText = question.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {//change the questions and status dynamically
        option.innerText = question.options[index];
        option.style.backgroundColor = '#007BFF';//to remake buttons blue instead of green an red
        option.disabled = false; //to ensure rhat we can click
        option.style.display = 'block'; 
    });
    document.getElementById('next').style.display = 'none';
}









function select(button) {
    const question = questions[currentIndex];//access to the question to compare
    if (button.innerText === question.correct) {
        button.style.backgroundColor = 'green';
        score++;
    } else {
        button.style.backgroundColor = 'red';
        const correctOption = Array.from(document.querySelectorAll('.option')).find(option => option.innerText === question.correct);//to detect the correct answer
        correctOption.style.backgroundColor = 'green';
    }
    document.querySelectorAll('.option').forEach(option => option.disabled = true);//by this step ,options will be inactive even if we click (so we can just go to next )
    document.getElementById('next').style.display = 'block';//when they answer , they can see the next button to sollve other question
}


function next() {
    currentIndex++;
    nb--;
    document.getElementById('RemainingQuestion').innerHTML=nb;
    if (currentIndex < questions.length) {
        Question();
    } else {

       endQuiz();//without this , even if you finish , you need to wait the timer !!
    }
}

 function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';//so we can click the btn restart
    if(score<(questions.length)/2){
         document.getElementById('score').innerText = "Sorry, You Lost. 😔 You scored "+score+" out of " +questions.length;
    }
    else{
        document.getElementById('score').innerText = "Good Job! 😊 You scored "+score+" out of " +questions.length;
    }
   
}



