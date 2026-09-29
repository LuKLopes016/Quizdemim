const perguntaElemento = document.getElementById("pergunta");
const botoesResposta = document.getElementById("botoes-resposta");
const proximoBtn = document.getElementById("proximo-btn");
const resultadoContainer = document.getElementById("resultado-container");
const resultadoTexto = document.getElementById("resultado-texto");
const reiniciarBtn = document.getElementById("reiniciar-btn");
const perguntaContainer = document.getElementById("pergunta-container");

let perguntaAtualIndex = 0;
let pontuacao = 0;

const perguntas = [
    {
        pergunta: "Qual minha cor favorita?",
        respostas: [
            { texto: "vermelho", correto: false },
            { texto: "azul", correto: true },
            { texto: "verde", correto: false },
            { texto: "amarelo", correto: false }
        ]
    },
    {
        pergunta: "Qual bairro eu moro?",
        respostas: [
            { texto: "Novo Osasco", correto: true },
            { texto: "Menck", correto: false },
            { texto: "Ayrosa", correto: false },
            { texto: "Jd D'Abril", correto: false }
        ]
    },
    {
        pergunta: "Quantos anos tenho?",
        respostas: [
            { texto: "19", correto: true },
            { texto: "18", correto: false },
            { texto: "21", correto: false },
            { texto: "20", correto: false }
        ]
    },
    {
        pergunta: "data de aniversário?",
        respostas: [
            { texto: "10/03", correto: false },
            { texto: "12/03", correto: false },
            { texto: "13/03", correto: true },
            { texto: "15/03", correto: false }
        ]
    },
    {
        pergunta: "amo viajar de?",
        respostas: [
            { texto: "carro", correto: false},
            { texto: "avião", correto: false },
            { texto: "caminhão", correto: false },
            { texto: "onibus", correto: true }
        ]
    },
    {
        pergunta: "qual curso eu faço?",
        respostas: [
            { texto: "Redes de Computadores", correto: true },
            { texto: "Sistemas Biomédicos", correto: false },
            { texto: "Desenvolvimento de Softwares Multiplataforma", correto: false },
            { texto: "Gestão Financeira", correto: false }
        ]
    },
    {
        pergunta: "meu doce favorito?",
        respostas: [
            { texto: "Chocolate", correto: false },
            { texto: "Brigadeiro", correto: true },
            { texto: "Pudim", correto: false },
            { texto: "Brigadeirão", correto: false }
        ]
    },
    {
        pergunta: "quantos kg eu tenho",
        respostas: [
            { texto: "52kg", correto: false },
            { texto: "53kg", correto: true },
            { texto: "54kg", correto: false },
            { texto: "55kg", correto: false }
        ]
    },    
    
];

function iniciarQuiz() {
    perguntaAtualIndex = 0;
    pontuacao = 0;
    resultadoContainer.classList.add("hide");
    perguntaContainer.classList.remove("hide");
    proximoBtn.classList.add("hide");
    mostrarProximaPergunta();
}

function mostrarProximaPergunta() {
    reiniciarEstado();
    if (perguntaAtualIndex < perguntas.length) {
        mostrarPergunta(perguntas[perguntaAtualIndex]);
    } else {
        mostrarResultado();
    }
}

function mostrarPergunta(pergunta) {
    perguntaElemento.innerText = pergunta.pergunta;
    pergunta.respostas.forEach(resposta => {
        const button = document.createElement("button");
        button.innerText = resposta.texto;
        button.classList.add("btn");
        if (resposta.correto) {
            button.dataset.correto = resposta.correto;
        }
        button.addEventListener("click", selecionarResposta);
        botoesResposta.appendChild(button);
    });
}

function reiniciarEstado() {
    proximoBtn.classList.add("hide");
    while (botoesResposta.firstChild) {
        botoesResposta.removeChild(botoesResposta.firstChild);
    }
}

function selecionarResposta(e) {
    const botaoSelecionado = e.target;
    const correto = botaoSelecionado.dataset.correto === "true";

    if (correto) {
        botaoSelecionado.classList.add("correto");
        pontuacao++;
    } else {
        botaoSelecionado.classList.add("errado");
    }

    Array.from(botoesResposta.children).forEach(button => {
        if (button.dataset.correto === "true") {
            button.classList.add("correto");
        }
        button.disabled = true;
    });

    if (perguntas.length > perguntaAtualIndex + 1) {
        proximoBtn.classList.remove("hide");
    } else {
        setTimeout(mostrarResultado, 1000);
    }
}

function mostrarResultado() {
    perguntaContainer.classList.add("hide");
    proximoBtn.classList.add("hide");
    resultadoContainer.classList.remove("hide");
    resultadoTexto.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

proximoBtn.addEventListener("click", () => {
    perguntaAtualIndex++;
    mostrarProximaPergunta();
});

reiniciarBtn.addEventListener("click", iniciarQuiz);

iniciarQuiz();
