/* =========================================
   KONFIGURASI
========================================= */

// Ganti URL ini dengan URL Web App Google Apps Script
const GOOGLE_SCRIPT_URL =
    "GANTI_DENGAN_URL_WEB_APP_GOOGLE_SCRIPT";


/* =========================================
   DATA SOAL
========================================= */

const questions = [

    {
        question:
            "Planet yang kita tinggali disebut...",

        answers: [
            "Mars",
            "Bumi",
            "Jupiter",
            "Venus"
        ],

        correct: 1
    },

    {
        question:
            "Hasil dari 12 × 5 adalah...",

        answers: [
            "50",
            "55",
            "60",
            "65"
        ],

        correct: 2
    },

    {
        question:
            "Hewan yang mengalami metamorfosis sempurna adalah...",

        answers: [
            "Kucing",
            "Ayam",
            "Kupu-kupu",
            "Sapi"
        ],

        correct: 2
    },

    {
        question:
            "Sumber energi utama bagi kehidupan di bumi adalah...",

        answers: [
            "Bulan",
            "Matahari",
            "Angin",
            "Air"
        ],

        correct: 1
    },

    {
        question:
            "Ibukota Indonesia adalah...",

        answers: [
            "Bandung",
            "Surabaya",
            "Jakarta",
            "Semarang"
        ],

        correct: 2
    },

    {
        question:
            "Berapa jumlah sisi pada sebuah segitiga?",

        answers: [
            "2",
            "3",
            "4",
            "5"
        ],

        correct: 1
    },

    {
        question:
            "Proses tumbuhan membuat makanan sendiri disebut...",

        answers: [
            "Respirasi",
            "Fotosintesis",
            "Evaporasi",
            "Transpirasi"
        ],

        correct: 1
    },

    {
        question:
            "Bahasa yang digunakan untuk membuat struktur halaman web adalah...",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        correct: 0
    },

    {
        question:
            "Warna yang dihasilkan dari campuran merah dan kuning adalah...",

        answers: [
            "Hijau",
            "Ungu",
            "Oranye",
            "Biru"
        ],

        correct: 2
    },

    {
        question:
            "Alat untuk mengukur suhu disebut...",

        answers: [
            "Barometer",
            "Termometer",
            "Speedometer",
            "Higrometer"
        ],

        correct: 1
    }

];


/* =========================================
   VARIABEL GAME
========================================= */

let currentQuestion = 0;

let score = 0;

let correctCount = 0;

let wrongCount = 0;

let playerName = "";

let startTime;


/* =========================================
   ELEMENT HTML
========================================= */

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");


const playerNameInput =
    document.getElementById("playerName");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


const displayName =
    document.getElementById("displayName");

const scoreElement =
    document.getElementById("score");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");


/* =========================================
   TOTAL SOAL
========================================= */

totalQuestions.textContent =
    questions.length;


/* =========================================
   MULAI GAME
========================================= */

startButton.addEventListener(
    "click",
    startGame
);


function startGame() {

    const name =
        playerNameInput.value.trim();


    if (!name) {

        alert(
            "Silakan masukkan nama terlebih dahulu."
        );

        playerNameInput.focus();

        return;
    }


    playerName = name;

    currentQuestion = 0;

    score = 0;

    correctCount = 0;

    wrongCount = 0;

    startTime = new Date();


    displayName.textContent =
        playerName;


    scoreElement.textContent =
        score;


    showScreen(gameScreen);

    showQuestion();
}


/* =========================================
   MENAMPILKAN SOAL
========================================= */

function showQuestion() {

    const data =
        questions[currentQuestion];


    questionElement.textContent =
        data.question;


    questionNumber.textContent =
        currentQuestion + 1;


    answersElement.innerHTML =
        "";


    feedback.textContent =
        "";


    data.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => checkAnswer(index)
            );


            answersElement.appendChild(
                button
            );

        }
    );
}


/* =========================================
   CEK JAWABAN
========================================= */

function checkAnswer(selectedIndex) {

    const data =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    // Matikan semua tombol

    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    if (
        selectedIndex ===
        data.correct
    ) {

        // BENAR

        buttons[selectedIndex]
            .classList.add("correct");


        score += 10;

        correctCount++;


        scoreElement.textContent =
            score;


        feedback.textContent =
            "🎉 Jawaban benar! +10 poin";


        feedback.style.color =
            "#2e7d32";


    } else {

        // SALAH

        buttons[selectedIndex]
            .classList.add("wrong");


        buttons[data.correct]
            .classList.add("correct");


        wrongCount++;


        feedback.textContent =
            "❌ Jawaban salah!";


        feedback.style.color =
            "#c62828";
    }


    setTimeout(
        nextQuestion,
        1200
    );
}


/* =========================================
   SOAL BERIKUTNYA
========================================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        finishGame();

        return;
    }


    showQuestion();
}


/* =========================================
   GAME SELESAI
========================================= */

function finishGame() {

    showScreen(resultScreen);


    const percentage =
        Math.round(
            (
                correctCount /
                questions.length
            ) * 100
        );


    document.getElementById(
        "resultName"
    ).textContent =
        playerName;


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "correctAnswer"
    ).textContent =
        correctCount;


    document.getElementById(
        "wrongAnswer"
    ).textContent =
        wrongCount;


    document.getElementById(
        "percentage"
    ).textContent =
        percentage + "%";


    saveResult();
}


/* =========================================
   SIMPAN KE GOOGLE SHEETS
========================================= */

async function saveResult() {

    const saveStatus =
        document.getElementById(
            "saveStatus"
        );


    const finishTime =
        new Date();


    const duration =
        Math.round(
            (
                finishTime -
                startTime
            ) / 1000
        );


    const percentage =
        Math.round(
            (
                correctCount /
                questions.length
            ) * 100
        );


    const data = {

        nama: playerName,

        skor: score,

        benar: correctCount,

        salah: wrongCount,

        totalSoal: questions.length,

        persentase: percentage,

        durasi: duration

    };


    try {

        saveStatus.textContent =
            "⏳ Menyimpan hasil ke Google Sheets...";


        await fetch(
            GOOGLE_SCRIPT_URL,
            {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)

            }
        );


        saveStatus.textContent =
            "✅ Hasil permainan berhasil disimpan!";


    } catch (error) {

        console.error(error);


        saveStatus.textContent =
            "⚠️ Hasil tidak dapat dikirim ke server.";

    }
}


/* =========================================
   GANTI SCREEN
========================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(
            element => {

                element.classList.remove(
                    "active"
                );

            }
        );


    screen.classList.add("active");
}


/* =========================================
   MAIN LAGI
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        playerNameInput.value =
            playerName;


        showScreen(startScreen);

    }
);
