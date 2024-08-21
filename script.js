// Add Function to genrate numbers 
const range = (start, end) => Array(end -start + 1).fill(start).map((element, index) => element + index);

// Add Function to genrate letters
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));

// Ad onload event 
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
    range(1, 99).forEach((number)=>{});
  
  }