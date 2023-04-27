let encripterButton = document.getElementById("encripterButton");
let decripterButton = document.getElementById("decripterButton");
let textarea = document.getElementById("wordToEncript");
let defaultContent = document.getElementById("defaultContent");
let deEncriptedWord = document.getElementById("de-encripteWord");
let copyButton = document.getElementById("copyButton");
let noContentImg = document.getElementById("noContentImg");
let aside = document.querySelector("aside");

// Event listeners
textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
  this.classList.remove("error");
});
encripterButton.addEventListener("click", () => {
  if (textarea.value == "") {
    showToast("error", "Ingrese un texto primero");
    textarea.classList.add("error");
    return;
  }
  handleButtonClick();
  deEncriptedWord.textContent = encripter(textarea.value);
});
decripterButton.addEventListener("click", () => {
  if (textarea.value == "") {
    showToast("error", "Ingrese un texto primero");
    textarea.classList.add("error");
    return;
  }
  handleButtonClick();
  deEncriptedWord.textContent = decripter(textarea.value);
});

copyButton.addEventListener("click", () => {
  copiarTexto(deEncriptedWord.textContent);
  showToast("success", "Texto copiado al portapapeles");
});

const handleButtonClick = () =>{
  aside.style.justifyContent = "space-between" 
  noContentImg.style.display = "none";
  defaultContent.style.display = "none";
  copyButton.style.display = "block";
}

let encripterDict = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufar",
};

let decripterDict = {
  enter: "e",
  imes: "i",
  ai: "a",
  ober: "o",
  ufar: "u",
};

const encripter = (word) => {
  let encriptedWord = "";
  for (const character of word.toLowerCase()) {
    if (encripterDict[character]) {
      encriptedWord += encripterDict[character];
    } else {
      encriptedWord += character;
    }
  }
  return encriptedWord;
};

const decripter = (word) => {
  /* 
  //* Solucion 1
  return word.toLowerCase().replace("enter","e").replace("imes","i").replace("ober","o").replace("ai","a").replace("ufar","u")
  */
  // * Solucion 2
  return word
    .toLowerCase()
    .replace(/enter|imes|ai|ober|ufar/gi, function (matched) {
      return decripterDict[matched];
    });
};

const copiarTexto = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto);
  } catch (err) {
    console.error("Error al copiar el texto al portapapeles: ", err);
  }
};

const showToast = (tipo, mensaje) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = mensaje;

  if (tipo === "success") {
    toast.classList.add("success");
  } else if (tipo === "error") {
    toast.classList.add("error");
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("active");
    setTimeout(() => {
      toast.classList.remove("active");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2000);
  }, 200);
};
