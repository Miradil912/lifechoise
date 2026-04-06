let options = [];
let angle = 0;

// Scroll
function scrollToTool(){
  document.getElementById("tool").scrollIntoView({behavior:"smooth"});
}

// Add option
function addOption(){
  let input = document.getElementById("optionInput");
  if(input.value){
    options.push(input.value);
    renderOptions();
    drawWheel();
    input.value = "";
  }
}

function renderOptions(){
  let list = document.getElementById("optionsList");
  list.innerHTML = "";
  options.forEach((opt,i)=>{
    let li = document.createElement("li");
    li.textContent = opt;
    list.appendChild(li);
  });
}

// Draw wheel
function drawWheel(){
  let canvas = document.getElementById("wheelCanvas");
  let ctx = canvas.getContext("2d");

  let arc = 2 * Math.PI / options.length;

  for(let i=0;i<options.length;i++){
    ctx.beginPath();
    ctx.fillStyle = i%2==0 ? "#4F46E5" : "#22C55E";
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,i*arc,(i+1)*arc);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText(options[i], 120, 150);
  }
}

// Spin
function spinWheel(){
  if(options.length === 0) return;

  let spin = Math.floor(Math.random()*360)+720;
  angle += spin;

  document.getElementById("wheelCanvas").style.transform = `rotate(${angle}deg)`;

  setTimeout(()=>{
    let index = Math.floor(Math.random()*options.length);
    document.getElementById("wheelResult").innerText = "Result: " + options[index];
  },2000);
}

// Quotes
let quotes = [
  "Believe in yourself.",
  "Take the first step.",
  "Small progress is progress.",
  "Stay strong.",
  "Think wisely, act boldly."
];

// Decision Engine
function generateDecision(){
  let problem = document.getElementById("problem").value.toLowerCase();
  let category = document.getElementById("category").value;
  let mood = document.getElementById("mood").value;

  let decision = "";

  if(problem.includes("stress") || mood === "Stressed"){
    decision = "Take a break and prioritize your mental health.";
  }
  else if(category === "Money"){
    decision = "Avoid risky decisions. Save and plan wisely.";
  }
  else if(category === "Health"){
    decision = "Choose a safe and healthy option. Consult a professional if needed.";
  }
  else if(mood === "Confused"){
    decision = "Take time to reflect before making a decision.";
  }
  else{
    decision = "Follow a balanced and thoughtful approach.";
  }

  let quote = quotes[Math.floor(Math.random()*quotes.length)];

  document.getElementById("decisionText").innerText = decision;
  document.getElementById("quoteText").innerText = "💡 " + quote;
}

// PDF
function downloadPDF(){
  const { jsPDF } = window.jspdf;

  html2canvas(document.getElementById("resultBox")).then(canvas=>{
    let imgData = canvas.toDataURL("image/png");
    let pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save("LifeChoise_Result.pdf");
  });
}

// Share
function shareResult(){
  let text = document.getElementById("decisionText").innerText;

  navigator.clipboard.writeText(text);
  alert("Result copied! Share anywhere.");
}