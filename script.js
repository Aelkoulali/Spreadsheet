// Declare isEven function, return true if num is even, false otherwise 
const isEven = (num) => num % 2 === 0;

// Declare calculate function
const sum = nums => nums.reduce((acc, el) => acc + el, 0);

// Declare average function : The average = The sum of all the numbers in the array / The length of the array
const average = (nums) => sum(nums) / nums.length;

// Declare median function 
const median = (nums) => {
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;
    return isEven(length) ? average([sorted[middle], sorted[middle + 1]]) : sorted[Math.ceil(middle)];
}

// Declare a spreadsheetFunctions object
const spreadsheetFunctions = {
    sum,
    average,
    median,
};

// Declare Function to genrate numbers 
const range = (start, end) => Array(end -start + 1).fill(start).map((element, index) => element + index);

// Declare Function to genrate letters
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));

// Add onload event 
window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = (name) => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = name;
        container.appendChild(label);
    }

    const letters = charRange("A", "J");
    letters.forEach(createLabel);
    range(1, 99).forEach((number)=>{
        createLabel(number);
        letters.forEach((letter)=> {
            const input = document.createElement("input");
            input.type = "text";
            input.id = letter + number;
            input.ariaLabel = letter + number;
            container.appendChild(input);
        });
    });
  
  }
// Declare update function 
const update = (event) => {
    input.onchange = update;
};