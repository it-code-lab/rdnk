// var the = {
//     hosturl: '/readernook'
// };

// const API_URL = the.hosturl + '/php/process.php'; // Change to your actual API URL

// Global variables
let seenQuestions = []; // Track answered question IDs

let dbFetchedQuestions = []; // Holds currently available questions
let dbFetchedQuestionIndex = 0;

let testTimer;

let age, duration, selectedTypes = [];
let totalTime, quiz_timerInterval;

let questions = [];
let currentIndex = 0;

let globalScore = 0;

//let dynamicCategories = ["addition", "subtraction", "multiplication"]; // SM-Do not use dynamic categories for simplicity
let dynamicCategories = [];
let testDuration;
//let testQuestions = [];


setTimeout(() => {
    $(".printBtnDivCls").hide();
    $(".curvedBox").hide();
    $(".printBtnDivCls").hide();
    $(".commentMsg").hide();
    $("#sndmsgdivid").hide();
    $("#tutorialListDivId").hide();
    $("#tutorialEditDivId").hide();
}, 100);

// Pre-defined logical reasoning questions
const logicalQuestionsPool = [
    {
        question: "What comes next in the sequence? 2, 4, 8, 16, ___",
        options: ["18", "32", "20", "24"],
        answer: "32",
        category: "math",
        subcategory: "logical reasoning",
    },
    {
        question: "Find the missing number: 1, 3, 6, 10, __, 21",
        options: ["13", "14", "15", "16"],
        category: "math",
        subcategory: "logical reasoning",
        answer: "15"
    },
    {
        question: "If the pattern is AB, BC, CD, DE, what comes next?",
        options: ["EF", "FG", "HI", "AC"],
        category: "math",
        subcategory: "logical reasoning",
        answer: "EF"
    },
    {
        question: "Odd One Out: Apple, Banana, Carrot, Grape",
        options: ["Apple", "Banana", "Carrot", "Grape"],
        category: "math",
        subcategory: "logical reasoning",
        answer: "Carrot"
    },
    {
        question: "Odd One Out: Dog, Cat, Horse, Sparrow",
        options: ["Dog", "Cat", "Horse", "Sparrow"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "Sparrow"
    },
    {
        question: "Odd One Out: Sun, Moon, Star, Clock",
        options: ["Sun", "Moon", "Star", "Clock"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "Clock"
    },
    {
        question: "Odd One Out: Square, Triangle, Rectangle, Circle",
        options: ["Square", "Triangle", "Rectangle", "Circle"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "Circle"
    },
    {
        question: "What comes next? 3, 9, 27, 81, ___",
        options: ["108", "243", "162", "324"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "243"
    },
    {
        question: "A train travels 60 km in 1 hour. How far will it travel in 3 hours?",
        options: ["180 km", "120 km", "200 km", "150 km"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "180 km"
    },
    {
        question: "If 3 pencils cost $1.50, how much do 6 pencils cost?",
        options: ["$3.00", "$2.50", "$3.50", "$4.00"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "$3.00"
    },
    {
        question: "A clock shows 3:15. What is the angle between the hands?",
        options: ["7.5°", "22.5°", "45°", "90°"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "7.5°"
    },
    {
        question: "If a pizza is cut into 8 slices and 3 are eaten, how many are left?",
        options: ["3", "5", "6", "4"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "5"
    },
    {
        question: "If 4x = 12, what is x?",
        options: ["2", "3", "4", "6"],
        subcategory: "logical reasoning",
        category: "math",
        answer: "3"
    }
];

// function startQuiz(event) {
//     event.preventDefault();
//     // Handle setup form submission
//     let age = parseInt(document.getElementById("age").value);
//     let duration = parseInt(document.getElementById("duration").value);
//     totalTime = duration * 60; // seconds

//     // Get selected question types
//     const checkboxes = document.querySelectorAll('input[name="qType"]:checked');
//     checkboxes.forEach(cb => selectedTypes.push(cb.value));

//     // Hide setup, show test quizScreen
//     document.getElementById("setupquizScreen").classList.add("quizHidden");
//     document.getElementById("testquizScreen").classList.remove("quizHidden");

//     let name = document.getElementById("userName").value;


//     sessionStorage.setItem("qz_name", name);
//     sessionStorage.setItem("qz_age", age);
//     sessionStorage.setItem("qz_duration", duration);

//     // Start quiz-timer and load first question
//     startquiz_timer();
//     loadQuestion(currentIndex);

// }

//Add Event Listener for Start Quiz button click
function setup_startQuiz() {
    // Handle setup form submission
    document.getElementById("setupForm").addEventListener("submit", function (e) {
        e.preventDefault();
        // Handle setup form submission
        let age = parseInt(document.getElementById("age").value);
        let duration = parseInt(document.getElementById("duration").value);
        totalTime = duration * 60; // seconds

        // Get selected question types
        const checkboxes = document.querySelectorAll('input[name="qType"]:checked');
        checkboxes.forEach(cb => selectedTypes.push(cb.value));



        let name = document.getElementById("userName").value;

        let subcategories = Array.from(document.querySelectorAll('input[name="subcategories"]:checked'))
            .map(cb => cb.value);

        if (subcategories.length === 0) {
            let x = document.getElementById("toastsnackbar");
            x.innerHTML = "Please select atleast one subcategory";
            x.classList.add("show");

            setTimeout(function () {
                x.classList.remove("show");
            }, 3000);            
            return;
        }

        // Hide setup, show test quizScreen
        document.getElementById("setupquizScreen").classList.add("quizHidden");
        document.getElementById("testquizScreen").classList.remove("quizHidden");

        let category = document.getElementById("category").value;

        sessionStorage.setItem("qz_name", name);
        sessionStorage.setItem("qz_age", age);
        sessionStorage.setItem("qz_category", category);
        sessionStorage.setItem("qz_duration", duration);
        sessionStorage.setItem("qz_subcategory", JSON.stringify(subcategories));

        // Start quiz-timer and load first question
        startquiz_timer();
        //loadQuestion(currentIndex);

        //Fetch questions from the database on the first load. Next fetch from the DB will be done when those questions have been presented to the user
        // This will be load dbFetchedQuestions array

        //fetchQuestions();
        fetchMoreQuestions();

        //Load the first question from the dbFetchedQuestions array
        //loadQuestion(0);
    });
}
// quiz-timer functions
function startquiz_timer() {
    updatequiz_timerDisplay();
    quiz_timerInterval = setInterval(() => {
        totalTime--;
        updatequiz_timerDisplay();
        if (totalTime <= 0) {
            clearInterval(quiz_timerInterval);
            finishTest();
        }
    }, 1000);
}

setTimeout(() => {
    setup_startQuiz();
}, 1000);

function updatequiz_timerDisplay() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    document.getElementById("quiz-timerDisplay").textContent = `Time Remaining: ${minutes}m ${seconds}s`;
}

function gotoPrevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion(currentIndex);
    }
}

function gotoNextQuestion_old() {
    if (currentIndex === questions.length - 1) {
        questions.push(generateQuestion());
    }
    currentIndex++;
    loadQuestion(currentIndex);
}

function gotoNextQuestion() {
    currentIndex++;
    if (dbFetchedQuestionIndex < dbFetchedQuestions.length) {
        loadQuestion(currentIndex);
    } else {
        fetchMoreQuestions();
    }
}


// Function to show next question or fetch more if needed
function nextQuestion_Not_in_use() {
    if (dbFetchedQuestionIndex < dbFetchedQuestions.length - 1) {
        dbFetchedQuestionIndex++;
        displayQuestion(dbFetchedQuestions[dbFetchedQuestionIndex]);
    } else {
        currentIndex++;
        fetchMoreQuestions(); // Get new questions if test time is remaining
    }
}

// Fetch more questions when needed
function fetchMoreQuestions() {

    let age = sessionStorage.getItem("qz_age");
    let category_name = sessionStorage.getItem("qz_category");
    let subcategories = sessionStorage.getItem("qz_subcategory");
    let testDuration = sessionStorage.getItem("qz_duration");


    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "getQuestions",
            age: age,
            category_name: category_name,
            test_duration: testDuration,
            subcategories: subcategories,
            seen_questions: JSON.stringify(seenQuestions) // Send seen questions
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                dbFetchedQuestions = data;
                dbFetchedQuestionIndex = 0;
                loadQuestion(currentIndex);
                //displayQuestion(dbFetchedQuestions[dbFetchedQuestionIndex]);
            } else {
                finishTest(); // No more questions available
            }
        });
}
//document.getElementById("submitBtn").addEventListener("click", finishTest);

function finishTest() {

    let name = sessionStorage.getItem("qz_name");
    let age = sessionStorage.getItem("qz_age");
    let category = sessionStorage.getItem("qz_category");
    let duration = sessionStorage.getItem("qz_duration");
    //let score = calculateScore(); // Function to calculate total score
    let totalQuestions = questions.length;
    let correctAnswers = calculateCorrectAnswers(); // Function to count correct answers
    let wrongAnswers = totalQuestions - correctAnswers;
    let categoryScores = calculateCategoryScores(); // Function to count per-category scores
    let subcategories = getSortedSubcategories();
    if (localStorage.getItem("userLoggedIn") == "y") {
        showquiz_results();
        submitTestResults(name, age, globalScore, category, duration, totalQuestions, correctAnswers, wrongAnswers, categoryScores, subcategories);

    } else {
        document.getElementById("certificatequizContainer").style.display = "none";
        showquiz_results();
        document.getElementById("signupdiv").style.display = "block";
    }

}

// Load a question (with quiz-navigation support and answer persistence)
function loadQuestion(index) {
    const quizContainer = document.getElementById("questionquizContainer");
    quizContainer.innerHTML = "";



    //const q = questions[index] || generateQuestion();
    // Save question in case it was newly generated

    let q = questions[index]

    // If question at this index is not already loaded, load it from DB array
    if (!q) {
        q = dbFetchedQuestions[dbFetchedQuestionIndex]
        dbFetchedQuestionIndex++;
        questions[index] = q;
    }

    const qElem = document.createElement("div");
    qElem.innerHTML = `<h2>Question ${index + 1}</h2><p>${q.question}</p>`;

    const quiz_optionsList = document.createElement("ul");
    quiz_optionsList.className = "quiz_options";
    q.options.forEach(option => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "option";
        radio.value = option;
        // Pre-select if already answered
        if (q.selectedAnswer === option) {
            radio.checked = true;
        }
        radio.addEventListener("change", () => {
            q.selectedAnswer = radio.value;
        });
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + option));
        li.appendChild(label);
        quiz_optionsList.appendChild(li);
    });

    // Mark question as seen
    if (!seenQuestions.includes(q.id)) {
        seenQuestions.push(q.id);
    }

    qElem.appendChild(quiz_optionsList);
    quizContainer.appendChild(qElem);
}

// Function to generate a new question based on selected types
function generateQuestion() {
    // Randomly pick one of the selected types
    const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
    if (type === "logical") {
        // Pick a random logical reasoning question from the pool
        const poolIndex = Math.floor(Math.random() * logicalQuestionsPool.length);
        // Clone the object to avoid reference issues
        return Object.assign({}, logicalQuestionsPool[poolIndex]);
    } else {
        // For arithmetic types: addition, subtraction, multiplication
        // Determine max number based on age
        let maxNumber;
        if (age >= 5 && age <= 7) {
            maxNumber = 70;
        } else if (age >= 8 && age <= 10) {
            maxNumber = 900;
        } else {
            maxNumber = 100; // default/fallback
        }
        const num1 = Math.floor(Math.random() * maxNumber) + 1;
        const num2 = Math.floor(Math.random() * maxNumber) + 1;
        let category;
        let subcategory
        let questionText = "";
        let quiz_correctAnswer;
        if (type === "addition") {
            questionText = `${num1} + ${num2} = ?`;
            quiz_correctAnswer = (num1 + num2).toString();
            subcategory = "addition";
            category = "math";
        } else if (type === "subtraction") {
            // Ensure non-negative quiz-result
            const a = Math.max(num1, num2);
            const b = Math.min(num1, num2);
            questionText = `${a} - ${b} = ?`;
            quiz_correctAnswer = (a - b).toString();
            subcategory = "subtraction";
            category = "math";
        } else if (type === "multiplication") {
            questionText = `${num1} × ${num2} = ?`;
            quiz_correctAnswer = (num1 * num2).toString();
            subcategory = "multiplication";
            category = "math";
        }
        // Generate multiple choices (quiz-correct answer + 3 distractors)
        const quiz_options = generatequiz_options(quiz_correctAnswer);
        return {
            question: questionText,
            options: quiz_options,
            answer: quiz_correctAnswer,
            category: category,
            subcategory: subcategory
        };
    }
}

// Function to generate quiz_options (random order, ensuring one quiz-correct answer)
function generatequiz_options(quiz_correctAnswer) {
    const opts = new Set();
    opts.add(quiz_correctAnswer);
    while (opts.size < 4) {
        // Generate a random variation: add or subtract a small random value
        const variation = Math.floor(Math.random() * 10) + 1;
        const addOrSubtract = Math.random() < 0.5 ? -1 : 1;
        const distractor = (parseInt(quiz_correctAnswer) + addOrSubtract * variation).toString();
        // Avoid duplicate answers
        opts.add(distractor);
    }
    // Shuffle the quiz_options array
    return shuffleArray(Array.from(opts));
}

// Utility: Shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Finish the test: stop quiz-timer and show quiz-results
function finishTest_DND() {
    clearInterval(quiz_timerInterval);
    document.getElementById("testquizScreen").classList.add("quizHidden");
    document.getElementById("quiz-resultsquizScreen").classList.remove("quizHidden");
    showquiz_results();
}

// Calculate score and show each question's outcome
function showquiz_results() {

    let score = 0;
    clearInterval(quiz_timerInterval);
    document.getElementById("testquizScreen").classList.add("quizHidden");
    document.getElementById("quiz-resultsquizScreen").classList.remove("quizHidden");

    const quiz_resultsDiv = document.getElementById("quiz-resultsList");
    quiz_resultsDiv.innerHTML = "";
    questions.forEach((q, index) => {
        const qDiv = document.createElement("div");
        qDiv.className = "quiz-result";
        const userAnswer = q.selectedAnswer ? q.selectedAnswer : "No answer";
        const isquiz_correct = userAnswer === q.correct_answer;
        if (isquiz_correct) score++;
        qDiv.classList.add(isquiz_correct ? "quiz-correct" : "quiz-incorrect");
        qDiv.innerHTML = `<strong>Question ${index + 1}:</strong> ${q.question}<br>
      <strong>Your answer:</strong> ${userAnswer}<br>
      <strong>correct answer:</strong> ${q.correct_answer}`;
        quiz_resultsDiv.appendChild(qDiv);
    });
    globalScore = score;
    document.getElementById("scoreDisplay").innerHTML = `<h5>Your Score: ${score} / ${questions.length}</h5>`;
}

// Function to share certificate via social media
function shareCertificate(name, age, score, rank, percentile, duration, category) {
    const shareText = `🎉 Hurray!! 🎉\n
  I scored ${score} in my Math Practice Test (Age Group: ${age}).
  in ${duration} minutes rapid test.
  Can you beat my score? Try now!`;

    const encodedText = encodeURIComponent(shareText);
    const url = encodeURIComponent("https://readernook.com/topics/quiz-master/home"); // Update with actual site URL

    const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitterShare = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
    const whatsappShare = `https://api.whatsapp.com/send?text=${encodedText}`;
    const emailShare = `mailto:?subject=My Math Practice Score!&body=${encodedText}`;

    document.getElementById("shareLinks").innerHTML = `
      <a href="${facebookShare}" target="_blank">Share on Facebook</a> |
      <a href="${twitterShare}" target="_blank">Share on Twitter</a> |
      <a href="${whatsappShare}" target="_blank">Share on WhatsApp</a> |
      <a href="${emailShare}" target="_blank">Email Certificate</a>
  `;
}

// Function to fetch and display certificate with sharing quiz_options
function fetchCertificate(name, age, score, rank, percentile, category, duration, categoryScores) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "generateCertificate",
            name: name,
            age: age,
            score: score,
            rank: rank,
            percentile: percentile,
            category: category,
            duration: duration,
            categoryScores: JSON.stringify(categoryScores)
        })
    }).then(response => response.json())
        .then(data => {
            const decodedCertificate = atob(data.certificate); // Decode base64 to HTML string
            document.getElementById("certificatequizContainer").innerHTML = `
          <div id="certificateContent">${decodedCertificate}</div>
          <button onclick="downloadCertificate()">Download</button>
          <button onclick="captureCertificate('${name}', '${age}', '${score}', '${rank}', '${percentile}', '${duration}', '${category}')">Share</button>
          <div id="shareLinks"></div>
      `;
        });
}


function fetchMyCertificate(certificatecd, name, age, score, rank, percentile, duration, category) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "getCertificate",
            certificatecd: certificatecd
        })
    }).then(response => response.json())
        .then(data => {
            const decodedCertificate = atob(data.certificate); // Decode base64 to HTML string
            document.getElementById("certificatequizContainer").innerHTML = `
          <div id="certificateContent">${decodedCertificate}</div>
          <button onclick="copyCertificate()">Copy</button>
          <button onclick="downloadCertificate()">Download</button>
          <button onclick="captureCertificate('${certificatecd}','${name}', '${age}', '${score}', '${rank}', '${percentile}', '${duration}', '${category}')">Share</button>
          <div id="shareLinks"></div>
      `;
        });
}

function copyCertificate() {
    const certificateDiv = document.getElementById("certificateContent");

    if (!certificateDiv) {
        console.error("Error: Certificate content not found!");
        return;
    }

    html2canvas(certificateDiv, { scale: 2 }).then(canvas => {
        canvas.toBlob(blob => {
            if (navigator.clipboard && navigator.clipboard.write) {
                const item = new ClipboardItem({ "image/png": blob });

                navigator.clipboard.write([item]).then(() => {
                    let x = document.getElementById("toastsnackbar");
                    x.innerHTML = "Certificate copied to clipboard";
                    x.classList.add("show");

                    setTimeout(function () {
                        x.classList.remove("show");
                    }, 3000);
                }).catch(err => {
                    let x = document.getElementById("toastsnackbar");
                    x.innerHTML = "Failed to copy";
                    x.classList.add("show");

                    setTimeout(function () {
                        x.classList.remove("show");
                    }, 3000);
                });
            } else {
                alert("❌ Clipboard API not supported.");
            }
        }, "image/png");
    });

}

// 🖼️ Capture Certificate as Image for Sharing
function captureCertificate(certificatecd, name, age, score, rank, percentile, duration, category) {
    const certificateDiv = document.getElementById("certificateContent");

    if (!certificateDiv) {
        console.error("Error: Certificate content not found!");
        return;
    }

    // ✅ URLs
    const testUrl = "https://readernook.com/topics/quiz-master/home"; // Test-taking URL
    const certificateShareUrl = `https://readernook.com/certificate/${certificatecd}`; // Certificate view URL

    // ✅ Share message with clickable links
    const shareText = `🎉 I scored ${score} in my Math Practice Test (Age Group: ${age})! 🏆

📜 **View my certificate:** ${certificateShareUrl}  
📝 **Take the test here:** ${testUrl}`;

    // ✅ URL Encoding for sharing
    const encodedText = encodeURIComponent(shareText);
    const encodedCertificateUrl = encodeURIComponent(certificateShareUrl);
    const encodedTestUrl = encodeURIComponent(testUrl);

    // ✅ Social Media Share Links (with Clickable URLs)
    const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedCertificateUrl}&quote=${encodedText}`;
    const twitterShare = `https://twitter.com/intent/tweet?text=${encodedText}`;
    const whatsappShare = `https://api.whatsapp.com/send?text=${encodedText}`;
    const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedCertificateUrl}&title=Math+Practice+Test&summary=${encodedText}`;
    const emailShare = `mailto:?subject=My Math Practice Score!&body=${encodedText}`;

    // ✅ Display Share Links
    document.getElementById("shareLinks").innerHTML = `
        <a href="${facebookShare}" target="_blank">📘 Share on Facebook</a> |
        <a href="${twitterShare}" target="_blank">🐦 Share on Twitter</a> |
        <a href="${whatsappShare}" target="_blank">📱 Share on WhatsApp</a> |
        <a href="${linkedinShare}" target="_blank">💼 Share on LinkedIn</a> |
        <a href="${emailShare}" target="_blank">📧 Email Certificate</a>
    `;
}

// ✅ Function to Copy URL to Clipboard



// Function to download the certificate as an image
function downloadCertificate() {
    const htmlString = document.getElementById("certificateContent").innerHTML;
    const blob = new Blob([htmlString], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "certificate.html";
    link.click();
}


// 🏆 Allow Certificate Download
function downloadCertificate_XX() {
    const iframe = document.getElementById("certificateContent");
    const data = iframe.getAttribute("src");
    const link = document.createElement("a");
    link.href = data;
    link.download = "certificate.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function calculateCorrectAnswers() {
    let correctCount = 0;
    questions.forEach(q => {
        if (q.selectedAnswer === q.correct_answer) {
            correctCount++;
        }
    });
    return correctCount;
}

function calculateScore() {
    let totalScore = 0;
    let pointsPerQuestion = 1; // Assuming total score is out of 100

    questions.forEach(q => {
        if (q.selectedAnswer === q.correct_answer) {
            totalScore += pointsPerQuestion;
        }
    });

    return Math.round(totalScore); // Returning rounded score for cleaner display
}


function calculateCategoryScores() {
    let categoryScores = {};

    // Initialize category scores
    questions.forEach(q => {
        if (!categoryScores[q.subcategory_name]) {
            categoryScores[q.subcategory_name] = 0;
        }
    });

    // Count correct answers per category
    questions.forEach(q => {
        if (q.selectedAnswer === q.correct_answer) {
            categoryScores[q.subcategory_name] += 1;
        }
    });

    return categoryScores;
}

function getSortedSubcategories() {
    // Extract unique subcategories
    let subcategories = [...new Set(questions.map(q => q.subcategory_name))];

    // Sort alphabetically
    subcategories.sort();

    // Return as a comma-separated string
    return subcategories.join(", ");
}


// Function to show loading animation
function showLoading(message = "Loading...") {
    document.getElementById("quiz_loadingIndicator").innerHTML = `<div class="loading">${message}</div>`;
}

// Function to hide loading animation
function hideLoading() {
    document.getElementById("quiz_loadingIndicator").innerHTML = "";
}

// Function to submit test results with animation
function submitTestResults(name, age, score, category, duration, totalQuestions, correctAnswers, wrongAnswers, categoryScores, subcategories) {
    showLoading("Submitting your test...");
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "submitTest",
            name: name,
            age: age,
            score: score,
            category: category,
            duration: duration,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            categoryScores: JSON.stringify(categoryScores),
            subcategories: subcategories
        })
    })
        .then(response => {
            //console.log("Response Status:", response.status);
            //console.log("Response Headers:", response.headers.get("content-type"));

            return response.text(); // Read response as text first
        })
        .then(text => {
            //console.log("Raw Response:", text); // Log the response content

            try {
                const data = JSON.parse(text); // Try parsing manually
                hideLoading();
                if (data.success) {
                    //fetchPercentile(name, category, duration, age, score, categoryScores);
                    fetchMyCertificate(data.certificate, name, age, score, data.rank, data.percentile, duration, category);
                    //showquiz_results();
                } else {
                    console.error("Error saving test results.");
                }
            } catch (error) {
                console.error("JSON Parsing Error:", error);
                console.error("Server Response:", text);
            }
        })
        .catch(error => {
            hideLoading();
            console.error("Fetch Error:", error);
        });


    // fetch(API_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     body: new URLSearchParams({
    //         usrfunction: "submitTest",
    //         name: name,
    //         age: age,
    //         score: score,
    //         totalQuestions: totalQuestions,
    //         correctAnswers: correctAnswers,
    //         wrongAnswers: wrongAnswers,
    //         categoryScores: JSON.stringify(categoryScores)
    //     })
    // }).then(response => response.json())
    // .then(data => {
    //     hideLoading();
    //     if (data.success) {
    //         fetchPercentile(name, age, score);
    //     } else {
    //         console.error("Error saving test results.");
    //     }
    // });
}

// Function to fetch leaderboard with animation
function fetchLeaderboard() {
    showLoading("Fetching leaderboard...");

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usrfunction: "getLeaderboard" })
    }).then(response => response.json())
        .then(data => {
            hideLoading();
            let leaderboardHTML = "<h3>Leaderboard</h3><ul>";
            data.forEach(player => {
                leaderboardHTML += `<li>${player.name} (Age ${player.age}) - Score: ${player.score}</li>`;
            });
            leaderboardHTML += "</ul>";
            document.getElementById("leaderboardContainer").innerHTML = leaderboardHTML;
        });
}

// Function to fetch percentile and rank
function fetchPercentile(name, category, duration, age, score, categoryScores) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "getPercentile",
            category: category,
            duration: duration,
            age: age,
            score: score
        })
    }).then(response => response.json())
        .then(data => {
            document.getElementById("rankDisplay").innerText = `Rank: ${data.rank}`;
            document.getElementById("percentileDisplay").innerText = `Percentile: ${data.percentile}%`;
            fetchCertificate(name, age, score, data.rank, data.percentile, category, duration, categoryScores);
        });
}

// Function to update daily streaks
function updateDailyStreak(name) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "trackDailyStreak",
            name: name
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data.message);
        });
}

// Function to fetch achievements
function fetchAchievements(name) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "getAchievements",
            name: name
        })
    }).then(response => response.json())
        .then(data => {
            let achievementsHTML = "<h3>Achievements</h3><ul>";
            data.achievements.forEach(ach => {
                achievementsHTML += `<li>${ach}</li>`;
            });
            achievementsHTML += "</ul>";
            document.getElementById("achievementsContainer").innerHTML = achievementsHTML;
        });
}

// Function to fetch certificate and display
function fetchCertificate_XX(name, age, score, rank, percentile, category, duration, categoryScores) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "generateCertificate",
            name: name,
            age: age,
            score: score,
            rank: rank,
            percentile: percentile,
            category: category,
            duration: duration,
            categoryScores: JSON.stringify(categoryScores)
        })
    }).then(response => response.json())
        .then(data => {
            document.getElementById("certificateContainer").innerHTML =
                `<iframe src="data:text/html;base64,${data.certificate}" width="100%" height="400px"></iframe>
            <button onclick="downloadCertificate('${data.certificate}')">Download</button>`;
        });
}

//***************Get Qs from the daatabase**************//

function fetchCategories() {
    let age = document.getElementById("age").value;
    if (!age) return;

    if (age < 5) return;

    if (age > 200) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usrfunction: "getCategories", age: age })
    })
        .then(response => response.text()) // 🔹 Read response as text first
        .then(text => {
            //console.log("Raw Response:", text); // ✅ Print full response

            try {
                let data = JSON.parse(text); // 🔹 Manually parse JSON
                //console.log("Parsed JSON:", data); // ✅ Print parsed JSON
                document.getElementById("categoryDiv").style.display = "block";
                let categoryDropdown = document.getElementById("category");
                categoryDropdown.innerHTML = '<option value="">-- Select a Category --</option>';
                data.forEach(cat => {
                    categoryDropdown.innerHTML += `<option value="${cat.category_name}">${cat.category_name}</option>`;
                });
            } catch (error) {
                console.error("JSON Parse Error:", error);
                console.error("Response was not valid JSON:", text);
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
        });
}



function fetchSubcategories() {
    let category = document.getElementById("category").value;
    let age = document.getElementById("age").value;
    if (!category) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usrfunction: "getSubcategories", category_name: category, age: age })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("subCategoryDiv").style.display = "block";
            document.getElementById("durationDiv").style.display = "block";
            let subcategoryContainer = document.getElementById("subcategoryContainer");
            subcategoryContainer.innerHTML = "";
            data.forEach(sub => {
                subcategoryContainer.innerHTML += `<label>
                <input type="checkbox" name="subcategories" value="${sub.subcategory_name}"> ${sub.subcategory_name}
            </label><br>`;
            });
        });
}


// Fetch initial questions
function fetchQuestions_Not_in_use() {
    age = document.getElementById("age").value;
    let category_name = document.getElementById("category").value;
    let subcategories = Array.from(document.querySelectorAll('input[name="subcategories"]:checked'))
        .map(cb => cb.value);
    testDuration = document.getElementById("duration").value;

    let dbCategories = subcategories.filter(sub => !dynamicCategories.includes(sub)); // DB-based categories
    let dynamicTypes = subcategories.filter(sub => dynamicCategories.includes(sub)); // Dynamically generated types

    if (dbCategories.length > 0) {
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                usrfunction: "getQuestions",
                age: age,
                category_name: category_name,
                subcategories: JSON.stringify(dbCategories),
                test_duration: testDuration,
                seen_questions: JSON.stringify(seenQuestions) // Send seen questions
            })
        })
            .then(response => response.json())
            .then(data => {
                dbFetchedQuestions = [...data]; // Store DB questions
                dbFetchedQuestionIndex = 0;
                //generateDynamicQuestions(dynamicTypes);
            });
    } else {
        //Not in use
        generateDynamicQuestions(dynamicTypes);
    }
}

//Not in Use
//This will return one question at a time geneated dynamically for the selected dynamic categories
function generateDynamicQuestions(selectedTypes) {
    if (selectedTypes.length === 0) return null;

    const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];

    let maxNumber = age >= 5 && age <= 7 ? 70 : age >= 8 && age <= 10 ? 900 : 100;
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;

    let category = "math";
    let subcategory;
    let questionText = "";
    let quiz_correctAnswer;

    switch (type) {
        case "addition":
            questionText = `${num1} + ${num2} = ?`;
            quiz_correctAnswer = (num1 + num2).toString();
            subcategory = "addition";
            break;
        case "subtraction":
            const a = Math.max(num1, num2);
            const b = Math.min(num1, num2);
            questionText = `${a} - ${b} = ?`;
            quiz_correctAnswer = (a - b).toString();
            subcategory = "subtraction";
            break;
        case "multiplication":
            questionText = `${num1} × ${num2} = ?`;
            quiz_correctAnswer = (num1 * num2).toString();
            subcategory = "multiplication";
            break;
        default:
            console.warn(`No logic defined for subcategory: ${type}`);
            return null;
    }

    const quiz_options = generatequiz_options(quiz_correctAnswer);

    return {
        question: questionText,
        options: quiz_options,
        answer: quiz_correctAnswer,
        category: category,
        subcategory: subcategory
    };
}

function fetchAllCategories() {
    // Fetch all categories and populate dropdown
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usrfunction: "getCategories" })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("categoryDiv").style.display = "block";
            let dropdown = document.getElementById("categorySelect");
            data.forEach(category => {
                dropdown.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            });
        });

    // Handle form submission (Add/Edit Question)
    document.getElementById("questionForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let category_id = document.getElementById("categorySelect").value;
        let question = document.getElementById("questionText").value;
        let options = [
            document.getElementById("option1").value,
            document.getElementById("option2").value,
            document.getElementById("option3").value,
            document.getElementById("option4").value
        ];
        let correctAnswer = document.getElementById("correctAnswer").value;

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                usrfunction: "addQuestion",
                category_id: category_id,
                question: question,
                options: JSON.stringify(options),
                correct_answer: correctAnswer
            })
        }).then(response => response.json())
            .then(data => alert(data.message));
    });

    // Fetch all questions and populate table
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usrfunction: "getQuestions" })
    })
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById("questionTable");
            data.forEach(question => {
                table.innerHTML += `
            <tr>
                <td>${question.question}</td>
                <td>${question.category_name}</td>
                <td>
                    <button onclick="editQuestion(${question.id})">Edit</button>
                    <button onclick="deleteQuestion(${question.id})">Delete</button>
                </td>
            </tr>
        `;
            });
        });

}

function getCertificate_Not_in_use(certificatecd) {

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            usrfunction: "getCertificate",
            certificatecd: certificatecd
        })
    }).then(response => response.json())
        .then(data => {
            const decodedCertificate = atob(data.certificate); // Decode base64 to HTML string
            document.getElementById("tutorialDivId").innerHTML = `
          <div id="certificateContent">${decodedCertificate}</div>
      `;
        });
}