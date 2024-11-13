// script.js

let questions = [];
let currentQuestionIndex = 0;
let stepOrder = [];
let sum = 0;
let count = 0;
let isOdd = false;

async function loadQuestions() {
    try {
        const response = await fetch("questions.json");
        questions = await response.json();
        loadQuestion();
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const stepsContainer = document.getElementById("steps-container");
    questionText.textContent = questions[currentQuestionIndex].question;

    stepsContainer.innerHTML = "";
    resetWorkspace();

    questions[currentQuestionIndex].steps.forEach(step => {
        const stepElement = document.createElement("div");
        stepElement.className = "step";
        stepElement.draggable = true;
        stepElement.id = step.action;
        stepElement.setAttribute("data-action", step.action);
        stepElement.ondragstart = drag;
        stepElement.textContent = step.label;
        stepsContainer.appendChild(stepElement);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const stepId = event.dataTransfer.getData("text");
    const stepElement = document.getElementById(stepId);
    const action = stepElement.getAttribute("data-action");
    const resultDiv = document.getElementById("result");
    const data = questions[currentQuestionIndex].data;

    let resultText;

    switch (action) {
        case "sort":
            data.sort((a, b) => a - b);
            resultText = `Sorted data: ${data.join(", ")}`;
            stepOrder.push("sort");
            break;
        case "count":
            count = data.length;
            resultText = `Count of numbers: ${count}`;
            stepOrder.push("count");
            break;
        case "checkEvenOdd":
            isOdd = count % 2 !== 0;
            resultText = `The count is ${isOdd ? "odd" : "even"}.`;
            stepOrder.push("checkEvenOdd");
            break;
        case "selectMiddle":
            if (isOdd) {
                const mid = Math.floor(count / 2);
                resultText = `Median (middle element): ${data[mid]}`;
            } else {
                const mid1 = data[Math.floor(count / 2) - 1];
                const mid2 = data[Math.floor(count / 2)];
                resultText = `Median (average of middle two): ${(mid1 + mid2) / 2}`;
            }
            stepOrder.push("selectMiddle");
            break;
        case "findMode":
            const mode = findMode(data);
            resultText = `Mode of numbers: ${mode}`;
            stepOrder.push("findMode");
            break;
        default:
            resultText = "Invalid action";
    }

    const resultElement = document.createElement("div");
    resultElement.className = "step-result";
    resultElement.textContent = resultText;
    resultDiv.appendChild(resultElement);

    checkCompletion();
}

function checkCompletion() {
    const correctOrder = questions[currentQuestionIndex].correctSteps;
    const resultDiv = document.getElementById("result");

    if (stepOrder.length === correctOrder.length) {
        if (JSON.stringify(stepOrder) === JSON.stringify(correctOrder)) {
            displayFeedback("Correct! Moving to next question...", true);
            setTimeout(loadNextQuestion, 2000);
        } else {
            displayFeedback("Incorrect! Try again.", false);
            resetWorkspace();
        }
    }
}

function displayFeedback(message, isSuccess) {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = isSuccess ? "feedback success" : "feedback error";
    feedbackDiv.textContent = message;

    document.body.appendChild(feedbackDiv);

    setTimeout(() => {
        feedbackDiv.style.opacity = "0";
        setTimeout(() => feedbackDiv.remove(), 1000);
    }, 2000);
}

function loadNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        displayFeedback("All questions completed!", true);
    }
}

function resetWorkspace() {
    document.getElementById("result").innerHTML = "";
    sum = 0;
    count = 0;
    stepOrder = [];
    isOdd = false;
}

function findMode(data) {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];

    data.forEach((num) => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });

    for (let num in frequency) {
        if (frequency[num] === maxFreq) {
            modes.push(num);
        }
    }

    return modes.join(", ");
}

// Initialize the quiz on page load
loadQuestions();
