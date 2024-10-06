const readline = require('readline');

const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2 
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1 
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1 
    },
    {
        question: "Does Ivory fall under Tembisa or Midrand?",
        options: ["Tembisa", "Midrand"],
        correctAnswer: 2 
    },
    {
        question: "Who are better drivers - men or women??",
        options: ["Men", "Women"],
        correctAnswer: 2 + "Do not feel bad,  New data suggests women are better drivers than men" 
    }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class QuizApp {
    constructor() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.timeRemaining = 10;
        this.timer = null;
    }

    start() {
        console.log("Welcome to the Quiz App!");
        this.askQuestion();
    }

    askQuestion() {
        if (this.currentQuestionIndex >= questions.length) {
            this.endQuiz();
            return;
        }

        const question = questions[this.currentQuestionIndex];
        console.log(`\nQuestion ${this.currentQuestionIndex + 1}: ${question.question}`);
        question.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });

        this.timeRemaining = 10;
        this.startTimer();

        rl.question('Your answer (enter the number): ', (answer) => {
            clearInterval(this.timer);
            this.processAnswer(parseInt(answer) - 1);
        });
    }

    startTimer() {
        console.log(`Time remaining: ${this.timeRemaining} seconds`);
        this.timer = setInterval(() => {
            this.timeRemaining--;
            console.log(`Time remaining: ${this.timeRemaining} seconds`);
            
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                console.log("\nTime's up!");
                this.processAnswer(null);
            }
        }, 1000);
    }

    processAnswer(answer) {
        const question = questions[this.currentQuestionIndex];
        
        if (answer === null) {
            console.log("Question timed out!");
        } else if (isNaN(answer) || answer < 0 || answer >= question.options.length) {
            console.log("Invalid input! No points awarded.");
        } else if (answer === question.correctAnswer) {
            console.log("Correct answer!");
            this.score++;
        } else {
            console.log(`Wrong answer! The correct answer was: ${question.options[question.correctAnswer]}`);
        }

        this.currentQuestionIndex++;
        setTimeout(() => this.askQuestion(), 1000);
    }

    endQuiz() {
        console.log("\n--- Quiz Completed! ---");
        console.log(`Final Score: ${this.score} out of ${questions.length}`);
        rl.close();
    }
}

const quiz = new QuizApp();
quiz.start();