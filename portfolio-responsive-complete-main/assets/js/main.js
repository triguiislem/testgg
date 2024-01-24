/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
const questionElement = document.querySelector(".question");
const answerButtons = document.querySelectorAll(".answer");
const scoreElement = document.querySelector(".score");
const questionNumberElement = document.querySelector(".question-number");
const totalQuestionsElement = document.querySelector(".total-questions");
const resultMessageContainer = document.querySelector(".result-message");
const resultMessageElement = document.querySelector(".message");
const restartButton = document.querySelector(".restart-button");
const feedbackElement = document.querySelector(".feedback");
const progressBar = document.querySelector(".progress");

const quizData = [
    {
        question: "What programming language is commonly used for artificial intelligence and neural networks?",
        answers: ["Python", "Java", "C++", "Ruby"],
        correct: 0,
    },
    {
        question: "In AI, what does the acronym 'NLP' stand for?",
        answers: ["Natural Logic Programming", "Neural Language Processing", "Natural Language Processing", "Networked Learning Process"],
        correct: 2,
    },
    {
        question: "Which language is primarily used for natural language processing (NLP)?",
        answers: ["Java", "C#", "Python", "Swift"],
        correct: 2,
    },
    {
        question: "What is a popular Python library for machine learning?",
        answers: ["TensorFlow", "SciKit-Learn", "PyTorch", "Pandas"],
        correct: 0,
    },
    {
        question: "What role does R play in data analysis and statistical learning?",
        answers: ["Web development", "AI", "Image processing", "Statistics"],
        correct: 3,
    },
    {
        question: "The main advantage of deep learning is:",
        answers: ["Requires less data", "Less complex", "Automatically extracts features", "Works better with unstructured data"],
        correct: 2,
    },
    {
        question: "The main difference between supervised and unsupervised learning is:",
        answers: ["Supervised = labels, unsupervised = no labels", "Supervised works better with unstructured data", "Unsupervised = labels, supervised = no labels", "No significant difference"],
        correct: 0,
    },
    {
        question: "Which language is commonly associated with AI applications in the Internet of Things (IoT)?",
        answers: ["Python", "JavaScript", "C", "Swift"],
        correct: 1,
    },
    {
        question: "The primary function of TensorFlow in AI is for:",
        answers: ["Graphical interfaces", "Mobile development", "Machine learning algorithms", "Dedicated operating system"],
        correct: 2,
    },
    {
        question: "Which language is commonly used for developing chatbots and conversational agents?",
        answers: ["Python", "Java", "JavaScript", "PHP"],
        correct: 0,
    },
    // Add more questions and answers
];


let currentQuestion = 0;
let score = 0; // Score du joueur
const baseScore = 10; // Score de base pour chaque question

function updateScore(newScore) {
    score = newScore;
    scoreElement.textContent = score;
}

function updateProgressBar() {
    const percentage = (currentQuestion / (quizData.length - 1)) * 100;
    progressBar.style.width = `${percentage}%`;

    // Modifie la couleur de la barre de progression en vert lorsque le quiz est terminé
    if (currentQuestion === quizData.length - 1) {
        progressBar.style.backgroundColor = "green";
    }
}

function showQuestion(questionIndex) {
    const currentQuestionData = quizData[questionIndex];
    questionElement.textContent = currentQuestionData.question;
    currentQuestionData.answers.forEach((answer, index) => {
        answerButtons[index].textContent = answer;
    });
    questionNumberElement.textContent = questionIndex + 1;
    totalQuestionsElement.textContent = quizData.length;
    updateProgressBar();
}

function showResultMessage(message) {
    resultMessageElement.textContent = message;
    resultMessageContainer.style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    updateScore(0);
    progressBar.style.backgroundColor = "";
    resultMessageContainer.style.display = "none";
    showQuestions();
    showQuestion(currentQuestion);
    updateProgressBar();
}

function showFeedbackMessage(isCorrect) {
   
    
    // Ajoute la classe pour l'animation de montée et le fondu
    feedbackElement.classList.add("show-feedback");
    
    setTimeout(() => {
        feedbackElement.classList.remove("show-feedback");
        feedbackElement.style.display = "none";
    }, 1500); // Affiche le message pendant 1,5 seconde puis le masque
}

function showQuestions(){
    answerButtons.forEach(button => {
        button.style.display = "block";
    });
}

function clearQuizContainer() {
    questionElement.textContent = "";
    answerButtons.forEach(button => {
        button.textContent = "";
        button.style.display = "none";
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestionData = quizData[currentQuestion];
    if (selectedAnswer === currentQuestionData.correct) {
        const questionScore = baseScore;
        updateScore(score + questionScore); // Mise à jour du score
        showFeedbackMessage(true);
    } else {
        showFeedbackMessage(false);
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgressBar();
        } else {
            showResultMessage(`Bravo ! Tu as terminé le quiz avec un score de ${score}`);
            clearQuizContainer();
        }
        return;
    }

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgressBar();
    } else {
        showResultMessage(`Bravo ! Tu as terminé le quiz avec un score de ${score}`);
        clearQuizContainer();
    }
}

restartButton.addEventListener("click", restartQuiz);

showQuestion(currentQuestion);

answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        checkAnswer(index);
    });
});
