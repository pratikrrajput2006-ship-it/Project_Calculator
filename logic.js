const input = document.querySelector("#dataprint");
const blocks = document.querySelectorAll(".blocks");
const equal = document.querySelector("#equal");
const remove = document.querySelector("#crono");

blocks.forEach((element) => {
  if (element.id === "equal") return;

  element.addEventListener("click", (e) => {
    if (input.value === "Error" || input.value === "NaN" || input.value === "Infinity") {
      input.value = "";
    }

    const char = e.target.textContent;
    const currentVal = input.value;
    const lastChar = currentVal.slice(-1);
    const operators = ["+", "-", "*", "/", "."];

    if (operators.includes(char)) {
      if (operators.includes(lastChar)) {
        input.value = currentVal.slice(0, -1) + char;
      } else {
        input.value += char;
      }
    } else {
      input.value += char;
    }

    element.classList.add("active");
    setTimeout(() => {
      element.classList.remove("active");
    }, 100);

    adjustFontSize();
  });
});

equal.addEventListener("click", () => {
  equal.classList.add("active");
  setTimeout(() => {
    equal.classList.remove("active");
  }, 100);

  let data = input.value;

  if (!data || data === "Error") return;

  const operators = ["+", "-", "*", "/", "."];
  while (data.length > 0 && operators.includes(data.slice(-1))) {
    data = data.slice(0, -1);
  }

  data = data.replace(/[^0-9+\-*/.]/g, "");

  data = data.replace(/(^|[-+*/])0+(?=\d)/g, '$1');

  try {
    let result = new Function('return ' + data)();

    if (result === Infinity || Number.isNaN(result)) {
      input.value = "Error";
    } else {
      input.value = Math.round(result * 100000000) / 100000000;
    }

    input.classList.add("active");
    adjustFontSize();
  } catch {
    input.value = "Error";
    adjustFontSize();
  }
});

remove.addEventListener("click", () => {
  remove.classList.add("active");
  setTimeout(() => {
    remove.classList.remove("active");
  }, 100);

  if (input.value === "Error") {
    input.value = "";
  } else {
    input.value = input.value.slice(0, -1);
  }
  
  adjustFontSize();

  if (input.value === "") {
    input.classList.remove("active");
  }
});

function adjustFontSize() {
  input.style.fontSize = "2rem";

  let size = parseFloat(getComputedStyle(input).fontSize);
  
  while (input.scrollWidth > input.clientWidth && size > 10) {
    size -= 1;
    input.style.fontSize = size + "px";
  }
}