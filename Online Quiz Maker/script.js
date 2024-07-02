let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
let currentQuizIndex = -1;

function addQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    questionBlock.innerHTML = `
        <input type="text" class="question" placeholder="Enter your question">
        <input type="text" class="answer" placeholder="Enter the correct answer">
    `;
    questionContainer.appendChild(questionBlock);
}

function finishQuiz() {
    const quizName = document.getElementById('quiz-name').value;
    const questionElements = document.querySelectorAll('.question');
    const answerElements = document.querySelectorAll('.answer');

    if (!quizName) {
        alert('Please enter a quiz name.');
        return;
    }

    const questions = [];
    questionElements.forEach((questionElement, index) => {
        const questionText = questionElement.value;
        const correctAnswer = answerElements[index].value;
        if (questionText && correctAnswer) {
            questions.push({ questionText, correctAnswer });
        }
    });

    if (questions.length === 0) {
        alert('Please add at least one question.');
        return;
    }

    quizzes.push({ name: quizName, questions });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz saved successfully!');
}

function loadQuizzes() {
    const quizList = document.getElementById('quiz-list');
    quizList.innerHTML = '<option value="">Select a quiz</option>';
    quizzes.forEach((quiz, index) => {
        const quizOption = document.createElement('option');
        quizOption.value = index;
        quizOption.textContent = quiz.name;
        quizList.appendChild(quizOption);
    });
}

function startQuiz() {
    currentQuizIndex = document.getElementById('quiz-list').value;
    if (currentQuizIndex === "") return;

    const quiz = quizzes[currentQuizIndex];
    document.getElementById('quiz-taker').style.display = 'none';
    document.getElementById('quiz-display').style.display = 'block';
    document.getElementById('quiz-title').innerText = quiz.name;
    const quizQuestionsDiv = document.getElementById('quiz-questions');
    quizQuestionsDiv.innerHTML = '';
    quiz.questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${q.questionText}</p>
            <input type="text" id="answer${index}" placeholder="Enter your answer">
            <p id="correct${index}" style="display: none;">Correct Answer: ${q.correctAnswer}</p>
        `;
        quizQuestionsDiv.appendChild(questionElement);
    });
}

function submitQuiz() {
    const quiz = quizzes[currentQuizIndex];
    let score = 0;
    quiz.questions.forEach((q, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value;
        if (userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()) {
            score++;
        }
        document.getElementById(`correct${index}`).style.display = 'block';
    });
    document.getElementById('quiz-results').style.display = 'block';
    document.getElementById('score').innerText = `You scored ${score} out of ${quiz.questions.length}`;
}

if (document.getElementById('quiz-list')) {
    loadQuizzes();
}
