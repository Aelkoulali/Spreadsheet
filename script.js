// Declare infixToFunction 
const infixToFunction = {
    "+":(x,y) => x + y,
    "-": (x, y) => x - y,
    "*": (x,y) => x * y,
    "/": (x,y) => x / y,
};
// Declare infixEval function
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

// Declare highPrecedence function
const highPrecedence = str => {
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    return  str2 === str ? str : highPrecedence(str2);
};

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
    even : nums => nums.filter(isEven),
    someeven: nums => nums.some(isEven),
    everyeven: nums => nums.every(isEven),
    firsttwo: nums => nums.slice(0,2),
    lasttwo: nums => nums.slice(nums.length - 2),
    has2: nums => nums.includes(2),
    increment: nums => nums.map(element => element += 1),
};

// Declare applyFunction
const applyFunction =str => {
    const noHigh = highPrecedence(str);
    const infix = /([\d.]+)([+-])([\d.]+)/;
    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
    const toNumberList = args => args.split(",").map(parseFloat);
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    return str2.replace(functionCall, (match, fn, args ) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())? apply(fn, args) :match);
};

// Declare Function to genrate numbers 
const range = (start, end) => Array(end -start + 1).fill(start).map((element, index) => element + index);

// Declare Function to genrate letters
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));

// Declare Function to parse and evaluate the input string
const evalFormula = (x, cells) => {
    const idToText = (id) => cells.find((cell) => cell.id === id).value; 
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    const elemValue = num => character => idToText(character + num);           
    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2 ) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
    const cellRegex = /[A-J][1-9][0-9]?/gi;  
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
};
      

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
            input.onchange = update;
            container.appendChild(input);
        });
    });
}

// Declare update function 
const update = (event) => {
    const element = event.target.element; 
    const value = element.value.replace(/\s/g,"");
    if (!value.includes(element.id) && value.startsWith('=')) {
        element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
};