let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#reset");
let stat = document.querySelector("#status");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let turnO = true;
let count = 0; // To Track Draw

const winPatterns = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
];

// Initialize underline on p1
p1.style.textDecoration = "underline rgb(240, 78, 78)";
p1.style.textDecorationThickness = "4px";
p1.style.textUnderlineOffset = "10px";

// Store the default HTML content of the stat element
const defaultStatContent = stat.innerHTML;

function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.addEventListener("click", boxClickHandler);
        box.innerText = "";
    }
}

function reset() {
    turnO = true;
    count = 0;
    enableBoxes();

    // Reset stat innerHTML to its default content
    stat.innerHTML = defaultStatContent;

    location.reload();
}

// const disableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = true;
//     }
// };
function disableBoxes() {
    for (let box of boxes) {
        this.removeEventListener("click", boxClickHandler);
    }
};

function checkForWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];

        if (boxes[a - 1].innerText === "O" && boxes[b - 1].innerText === "O" && boxes[c - 1].innerText === "O") {
            // console.log("Player 1 is the Winner");
            stat.innerText = "Player 1 is the Winner";
        } else if (boxes[a - 1].innerText === "X" && boxes[b - 1].innerText === "X" && boxes[c - 1].innerText === "X") {
            // console.log("Player 2 is the Winner");
            stat.innerText = "Player 2 is the Winner";
        }
    }
}


function gameDraw() {
    stat.innerText = `It's a Draw! Press Reset to play again.`
}



function boxClickHandler() {
    console.log(`Box ${this.getAttribute("id")} pressed.`);

    // Reset underline styles for both players
    p1.style.textDecoration = "";
    p2.style.textDecoration = "";

    console.log(turnO);

    if (turnO === true) {
        this.innerText = "O";
        p2.style.textDecoration = "underline rgb(240, 78, 78)";
        p2.style.textDecorationThickness = "4px";
        p2.style.textUnderlineOffset = "10px";
        turnO = false;
    } else {
        this.innerText = "X";
        p1.style.textDecoration = "underline rgb(240, 78, 78)";
        p1.style.textDecorationThickness = "4px";
        p1.style.textUnderlineOffset = "10px";
        turnO = true;
    }

    // Remove the click event listener after the box is clicked
    this.removeEventListener("click", boxClickHandler);

    checkForWinner();
    let isWinner = checkForWinner();
    count++;

    if (isWinner) {
        disableBoxes();
    }
    if (count === 9 && !isWinner) {
        gameDraw();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", boxClickHandler);
});

rstBtn.addEventListener("click", reset);

document.addEventListener("keypress", function (event) {
    reset();
});