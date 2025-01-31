const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cardInput = document.getElementById("card");
const form = document.getElementById("form");

const nameErrorElement = document.getElementById("name-error");
const emailErrorElement = document.getElementById("email-error");
const cardErrorElement = document.getElementById("card-error");

const nameRegex = /[\d;:<>\\\[\]\(\),."]/g;
const emailRegex = /[;:<>\\\[\]\(\),"]/g;
const cardRegex = /\D/g;

const isValidName = (name) => name.trim().length > 0 && !nameRegex.test(name);

const isValidEmail = (email) =>
  email.trim() && /.+@.+\..+/.test(email) && !emailRegex.test(email);

const isValidCard = (card) => {
  const trimmedCard = card.trim();
  if (
    !trimmedCard ||
    trimmedCard.length < 15 ||
    trimmedCard.length > 19 ||
    cardRegex.test(trimmedCard)
  ) {
    return false;
  }
  const numberArr = trimmedCard
    .split("")
    .reverse()
    .map((num) => Number.parseInt(num));
  const lastDigit = numberArr.shift();
  const sum = numberArr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
    0
  );
  return (sum + lastDigit) % 10 === 0;
};

const showError = (input, errorElement, message) => {
  errorElement.textContent = message;
  input.style.outline = "2px solid rgb(233, 57, 54)";
};

const clearError = (input, errorElement) => {
  errorElement.textContent = "";
  input.style.outline = "";
};

const showValid = (input) => {
  input.style.outline = "3px solid rgb(110, 188, 1)";
};

form.addEventListener("submit", (e) => {
  const nameValid = isValidName(nameInput.value);
  const emailValid = isValidEmail(emailInput.value);
  const cardValid = isValidCard(cardInput.value);

  if (!nameValid || !emailValid || !cardValid) {
    e.preventDefault();
  }

  if (!nameValid)
    showError(nameInput, nameErrorElement, "Letters and valid characters only");
  if (!emailValid)
    showError(
      emailInput,
      emailErrorElement,
      "Please enter a valid email address"
    );
  if (!cardValid)
    showError(cardInput, cardErrorElement, "Please enter a valid card number");
});

nameInput.addEventListener("input", () =>
  clearError(nameInput, nameErrorElement)
);
emailInput.addEventListener("input", () =>
  clearError(emailInput, emailErrorElement)
);
cardInput.addEventListener("input", () =>
  clearError(cardInput, cardErrorElement)
);

nameInput.addEventListener("blur", () => {
  if (!isValidName(nameInput.value)) {
    showError(
      nameInput,
      nameErrorElement,
      nameInput.value.trim().length === 0
        ? "Must be at least 1 character long"
        : "Letters and valid characters only"
    );
  } else {
    clearError(nameInput, nameErrorElement);
    showValid(nameInput);
  }
});

emailInput.addEventListener("blur", () => {
  if (!isValidEmail(emailInput.value)) {
    showError(
      emailInput,
      emailErrorElement,
      "Please enter a valid email address"
    );
  } else {
    clearError(emailInput, emailErrorElement);
    showValid(emailInput);
  }
});

cardInput.addEventListener("blur", () => {
  if (!isValidCard(cardInput.value)) {
    showError(cardInput, cardErrorElement, "Please enter a valid card number");
  } else {
    clearError(cardInput, cardErrorElement);
    showValid(cardInput);
  }
});
