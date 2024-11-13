// script.js

// const questions = [
//     {
//         question: "Calculate the mean of the following data: 12, 43, 56, 12, 67, 89",
//         data: [12, 43, 56, 12, 67, 89],
//         correctSteps: ["sum", "count", "calculateMean"],
//         steps: [
  //              {action:"sort ",label: "Arrange the data in an order"},
//             { action: "sum", label: "Step 1: Sum all numbers" },
//             { action: "count", label: "Step 2: Count the numbers" },
//             { action: "calculateMean", label: "Step 3: Divide the sum by the count" }
//         ]
//     },
//     {
//         question: "Calculate the median of the following data: 10, 12, 15, 18, 20",
//         data: [10, 12, 15, 18, 20],
//         correctSteps: ["sort", "count",],
//         steps: [
//             { action: "sort", label: "Step 1: Sort the numbers" },
//             { action: "findMedian", label: "Step 2: Find the median" }
//         ]
//     },
//     {
//         question: "Calculate the mode of the following data: 5, 8, 9, 8, 5, 9, 5",
//         data: [5, 8, 9, 8, 5, 9, 5],
//         correctSteps: ["findMode"],
//         steps: [
//             { action: "findMode", label: "Step 1: Find the mode" }
//         ]
//     }
// ];
const questions=[
    {
        "question": "Calculate the mean of the following data: 12, 43, 56, 12, 67, 89",
        "data": [12, 43, 56, 12, 67, 89],
        "correctSteps": ["sum", "count", "calculateMean"],
        "steps": [
             {"action":"sort","label":"Arrange the data in an order"},
            { "action": "calculateMean", "label": " Divide the sum by the count" },
            { "action": "sum", "label": " Sum all numbers" },
            { "action": "count", "label": "Count the numbers" }
        ]
    },
    
        {
            "question": "Calculate the median of the following data: 12, 43, 56, 12, 67, 89",
            "data": [12, 43, 56, 12, 67, 89],
            "correctSteps": ["sort", "count", "checkEvenOdd", "selectAppropriateMiddle"],
            "steps": [
                { "action": "sort", "label": "Step 1: Sort the data" },
                { "action": "count", "label": "Step 2: Count the numbers" },
                { "action": "checkEvenOdd", "label": "Step 3: Check if count is even or odd" },
                { "action": "selectMiddle", "label": "If odd: Select the middle element" },
                { "action": "averageMiddleTwo", "label": "If even: Average the middle two elements" }
            ]
        },
    
    
    // {
    //     "question": "Calculate the median of the following data: 10, 12, 15, 18, 20",
    //     "data": [10, 12, 15, 18, 20],
    //     "correctSteps": ["sort", "count", "checkEvenOdd", "selectMiddle"],
    //     "steps": [
    //         { "action": "sort", "label": "Step 1: Sort the data" },
    //         { "action": "count", "label": "Step 2: Count the numbers" },
    //         { "action": "checkEvenOdd", "label": "Step 3: Check if count is even or odd" },
    //         { "action": "selectMiddle", "label": "Step 4: If odd, select middle; if even, average middle two" }
    //     ]
    // },
    // {
    //     "question": "Calculate the mode of the following data: 5, 8, 9, 8, 5, 9, 5",
    //     "data": [5, 8, 9, 8, 5, 9, 5],
    //     "correctSteps": ["findMode"],
    //     "steps": [
    //         { "action": "findMode", "label": "Step 1: Find the mode" }
    //     ]
    // }
    {
        "question": "Calculate the mode of the following data: 5, 8, 9, 8, 5, 9, 5",
        "data": [5, 8, 9, 8, 5, 9, 5],
        "correctSteps": ["countFrequency", "findMaxFrequency", "determineMode"],
        "steps": [
            { "action": "countFrequency", "label": "Step 1: Count occurrences of each number" },
            { "action": "findMaxFrequency", "label": "Step 2: Find the maximum occurrence" },
            { "action": "determineMode", "label": "Step 3: Identify the number(s) with maximum occurrence" }
        ]
    }
]

//let questions = [];  // Array to store questions after fetching
let currentQuestionIndex = 0;
let stepOrder = [];
let sum = 0;
let count = 0;

// async function loadQuestions() {
//     try {
//         // Fetch questions from the JSON file
//         const response = await fetch("questions.json");
//         questions = await response.json();
//         loadQuestion();  // Load the first question once the data is available
//     } catch (error) {
//         console.error("Error loading questions:", error);
//     }
// }

// function loadQuestion() {
//     if (!questions || questions.length === 0) {
//         console.error("No questions available.");
//         return;
//     }

//     const questionText = document.getElementById("question-text");
//     const stepsContainer = document.getElementById("steps-container");
//     questionText.textContent = questions[currentQuestionIndex].question;

//     // Clear previous steps and reset values
//     stepsContainer.innerHTML = "";
//     resetWorkspace();

//     // Add steps dynamically for the current question
//     questions[currentQuestionIndex].steps.forEach(step => {
//         const stepElement = document.createElement("div");
//         stepElement.className = "step";
//         stepElement.draggable = true;
//         stepElement.id = step.action;
//         stepElement.setAttribute("data-action", step.action);
//         stepElement.ondragstart = drag;
//         stepElement.textContent = step.label;
//         stepsContainer.appendChild(stepElement);
//    });
// }



function loadQuestion() {
    // Load the current question
    const questionText = document.getElementById("question-text");
    const stepsContainer = document.getElementById("steps-container");
    questionText.textContent = questions[currentQuestionIndex].question;

    // Clear previous steps and reset values
    stepsContainer.innerHTML = "";
    resetWorkspace();

    // Add steps dynamically for the current question
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
    let isCorrect = false;

    switch (action) {
        case "sum":
            sum = data.reduce((a, b) => a + b, 0);
            resultText = `Sum of numbers: ${sum}`;
            isCorrect = stepOrder.length === 0;
            stepOrder.push("sum");
            break;
        case "count":
            count = data.length;
            resultText = `Count of numbers: ${count}`;
            isCorrect = stepOrder.length === 1;
            stepOrder.push("count");
            break;
        case "calculateMean":
            if (count === 0) {
                resultText = "Please calculate the count first.";
            } else {
                const mean = sum / count;
                resultText = `Mean of numbers: ${mean.toFixed(2)}`;
                isCorrect = stepOrder.length === 2;
                stepOrder.push("calculateMean");
            }
            break;
        case "sort":
            data.sort((a, b) => a - b);
            resultText = `Sorted data: ${data.join(", ")}`;
            isCorrect = stepOrder.length === 0;
            stepOrder.push("sort");
            break;
        // case "findMedian":
        //     const mid = Math.floor(data.length / 2);
        //     const median = data.length % 2 !== 0 ? data[mid] : (data[mid - 1] + data[mid]) / 2;
        //     resultText = `Median of numbers: ${median}`;
        //     stepOrder.push("findMedian");
        //     break;
        case "checkEvenOdd":
            isOdd = count % 2 !== 0;
            resultText = `The count is ${isOdd ? "odd" : "even"}.`;
            isCorrect = stepOrder.length === 1;
            stepOrder.push("checkEvenOdd");
            
            if (isOdd) {
                showConditionalSteps(["selectMiddle"]);
            } else {
                showConditionalSteps(["averageMiddleTwo"]);
            }
            break;
        case "selectMiddle":
            if (isOdd) {
                const mid = Math.floor(count / 2);
                resultText = `Median (middle element): ${data[mid]}`;
                isCorrect = stepOrder.length === 3;
                stepOrder.push("selectMiddle");
            } else {
                resultText = "Incorrect! Try again with the correct option for an even count.";
            }
            break;
        case "averageMiddleTwo":
            if (!isOdd) {
                const mid1 = data[Math.floor(count / 2) - 1];
                const mid2 = data[Math.floor(count / 2)];
                resultText = `Median (average of middle two): ${(mid1 + mid2) / 2}`;
                isCorrect = stepOrder.length === 3;
                stepOrder.push("averageMiddleTwo");
            } else {
                resultText = "Incorrect! Try again with the correct option for an odd count.";
            }
            break;
        

        // case "selectMiddle":
        //     if (isOdd) {
        //         const mid = Math.floor(count / 2);
        //         resultText = `Median (middle element): ${data[mid]}`;
        //     } else {
        //         const mid1 = data[Math.floor(count / 2) - 1];
        //         const mid2 = data[Math.floor(count / 2)];
        //         resultText = `Median (average of middle two): ${(mid1 + mid2) / 2}`;
        //     }
        //     isCorrect = stepOrder.length === 2;
        //     stepOrder.push("selectMiddle");
        //     break;
        case "findMode":
            const mode = findMode(data);
            resultText = `Mode of numbers: ${mode}`;
            stepOrder.push("findMode");
            break;
            case "countFrequency":
                frequency = {};
                data.forEach(num => {
                    frequency[num] = (frequency[num] || 0) + 1;
                });
                resultText = `Frequencies: ${JSON.stringify(frequency)}`;
                isCorrect = stepOrder.length === 0;
                stepOrder.push("countFrequency");
                break;
            case "findMaxFrequency":
                let maxFreq = Math.max(...Object.values(frequency));
                resultText = `Maximum frequency: ${maxFreq}`;
                isCorrect = stepOrder.length === 1;
                stepOrder.push("findMaxFrequency");
                break;
            case "determineMode":
                const modes = Object.keys(frequency).filter(
                    num => frequency[num] === Math.max(...Object.values(frequency))
                );
                resultText = `Mode(s): ${modes.join(", ")}`;
                isCorrect = stepOrder.length === 2;
                stepOrder.push("determineMode");
                break;
           
    
        default:
            resultText = "Invalid action";
    }
    if (isCorrect) {
        stepElement.classList.add("step-correct");
    } else {
        stepElement.classList.add("step-incorrect");
    }

    // Display the result next to the dragged step in the workspace
    const resultElement = document.createElement("div");
    resultElement.className = "step-result";
    resultElement.textContent = resultText;
    resultDiv.appendChild(resultElement);

    // Check if all steps are completed in the correct order
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
function showConditionalSteps(stepsToShow) {
    const stepsContainer = document.getElementById("steps-container");
    stepsContainer.innerHTML = ""; // Clear previous steps

    stepsToShow.forEach(stepAction => {
        const stepData = questions[currentQuestionIndex].steps.find(step => step.action === stepAction);
        const stepElement = document.createElement("div");
        stepElement.className = "step";
        stepElement.draggable = true;
        stepElement.id = stepData.action;
        stepElement.setAttribute("data-action", stepData.action);
        stepElement.ondragstart = drag;
        stepElement.textContent = stepData.label;
        stepsContainer.appendChild(stepElement);
    });
}

// Initialize first question on load
loadQuestion();
