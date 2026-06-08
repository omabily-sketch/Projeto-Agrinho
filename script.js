// Banco de dados dinâmico de perguntas sobre Sustentabilidade e Agro
const quizData = [
    {
        question: "Qual tecnologia ajuda o produtor rural a economizar água monitorando o solo?",
        options: ["Sensores de Irrigação", "Combustíveis fósseis", "Agrotóxicos em excesso", "Arado manual"],
        answer: 0
    },
    {
        question: "Como os drones auxiliam na preservação do meio ambiente?",
        options: ["Transportando pessoas", "Identificando focos exatos de pragas para evitar desperdício de defensivos", "Aumentando o consumo de energia", "Eles não ajudam a preservar"],
        answer: 1
    },
    {
        question: "O que caracteriza a relação sustentável entre o Campo e a Cidade?",
        options: ["Produção consciente na roça e consumo sem desperdício na cidade", "Abandono total do uso de tecnologias no campo", "Uso intensivo de recursos naturais sem reposição", "Isolamento total entre os dois setores"],
        answer: 0
    }
];

// Variáveis de Controle de Estado
let currentQuestionIndex = 0;
let score = 0;

// Elementos da DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const questionContainer = document.getElementById("question-container");
const scoreText = document.getElementById("score-text");
const btnRestart = document.getElementById("btn-restart");

// Inicializador do Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    loadQuestion();
}

// Carrega a pergunta atual na tela
function loadQuestion() {
    clearOptions();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// Limpa botões da pergunta anterior
function clearOptions() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Trata a seleção da alternativa do usuário
function selectOption(selectedIndex, clickedButton) {
    const correctIndex = quizData[currentQuestionIndex].answer;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Desativa múltiplos cliques após responder
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct"); // Mostra a certa
    }

    // Aguarda 2 segundos para trocar de pergunta ou finalizar
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Apresenta o resultado final
function showResults() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

// Escuta cliques no botão de reiniciar
btnRestart.addEventListener("click", startQuiz);

// Inicia automaticamente quando a página carregar
window.onload = startQuiz;
