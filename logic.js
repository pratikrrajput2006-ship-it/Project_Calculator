const input = document.querySelector("#dataprint");
const blocks = document.querySelectorAll(".blocks");
const equal = document.querySelector("#equal");
const remove = document.querySelector("#crono");

// Number buttons
blocks.forEach((element) => {
  element.addEventListener("click", (e) => {
    input.value += e.target.textContent;
     element.classList.add("active");
   setTimeout(() => {
     element.classList.remove("active");
   },100);
    adjustFontSize();
  });
});

// Equal button
equal.addEventListener("click", () => {
  input.value = input.value.replace(/[^0-9+\-*/.]/g, "");
  let data = input.value;

  if (data === "") {
    alert("Please enter a value");
    return;
  }

  let pattern = /^[0-9+\-*/.]+$/;

  if (!pattern.test(data)) {
    alert("Invalid characters");
    return;
  }

  try {
    let result = eval(data);
    input.value = result;
    input.classList.add("active");
    adjustFontSize();
  } catch {
    alert("Invalid Expression");
  }
});

// Backspace
remove.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
   remove.classList.add("active");
   setTimeout(() => {
    remove.classList.remove("active");
   },100);
  adjustFontSize();

  if (input.value === "") {
    input.classList.remove("active");
  }
});

// Dynamic font resize
function adjustFontSize() {
  input.style.fontSize = "2rem";

  while (input.scrollWidth > input.clientWidth) {
    let size = parseFloat(getComputedStyle(input).fontSize);
    input.style.fontSize = (size - 1) + "px";
  }
}