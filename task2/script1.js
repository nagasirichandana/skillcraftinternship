const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= '0' && key <= '9') ||
        key === '+' ||
        key === '-' ||
        key === '*' ||
        key === '/' ||
        key === '.'
    ) {
        display.value += key;
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        backspace();
    }

    else if (key === "Delete") {
        clearDisplay();
    }
});