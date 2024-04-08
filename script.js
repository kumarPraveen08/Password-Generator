let input = document.getElementById("input");
let copy = document.getElementById("copy");
let lengthField = document.getElementById("length");
let length = document.getElementById("length").value;
let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let number = document.getElementById("number");
let special = document.getElementById("special");
let other = document.getElementById("other");
let generateBtn = document.getElementById("btn");
let audio = document.getElementById("myAudio");

let types = [];

lengthField.addEventListener("input", function () {
  length = this.value;
});

uppercase.addEventListener("change", function () {
  audio.play();
  this.checked ? types.push(1) : removeFromArr(1);
});

lowercase.addEventListener("change", function () {
  audio.play();
  this.checked ? types.push(2) : removeFromArr(2);
});

number.addEventListener("change", function () {
  audio.play();
  this.checked ? types.push(3) : removeFromArr(3);
});

special.addEventListener("change", function () {
  audio.play();
  this.checked ? types.push(4) : removeFromArr(4);
});

other.addEventListener("change", function () {
  audio.play();
  this.checked ? types.push(5) : removeFromArr(5);
});

function removeFromArr(num) {
  const index = types.indexOf(num);
  if (index > -1) {
    types.splice(index, 1);
  }
}

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let mychars = chars(types);
  audio.play();
  input.value = generatePassword(length, mychars);
});

function generatePassword(length, mychars) {
  let password = "";

  if (length < 3 || length > 64) {
    length = 16;
  }

  for (let i = 0; i < length; i++) {
    password += chooseRandom(mychars);
  }

  return password;
}

function chars(types) {
  let result = "";

  if (types.length === 0) types = [2, 3, 4];

  for (const type of types) {
    result += choose(type);
  }

  return result;
}

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function choose(type) {
  switch (type) {
    case 1:
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    case 2:
      return "abcdefghijklmnopqrstuvwxyz";
    case 3:
      return "1234567890";
    case 4:
      return "!@#$%^&*()+";
    case 5:
      return "~`[];?,";
  }
}

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(input.value).then(audio.play());
});

input.addEventListener(`focus`, () => input.select());
