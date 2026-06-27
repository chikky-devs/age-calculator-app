const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayError = document.getElementById("text-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const displayDay = document.getElementById("displayDay");
const displayMonth = document.getElementById("displayMonth");
const displayYear = document.getElementById("displayYear");

const button = document.getElementById("calculateButton");

function clearErrors() {
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  dayInput.style.borderColor = "";
  monthInput.style.borderColor = "";
  yearInput.style.borderColor = "";
}

function setError(input, errorElement, message) {
  input.style.borderColor = "red";
  errorElement.textContent = message;
}

function calculateAge() {
  clearErrors();

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  let hasError = false;

  /* Required Fields */

  if (!day) {
    setError(dayInput, dayError, "This field is required");
    hasError = true;
  }

  if (!month) {
    setError(monthInput, monthError, "This field is required");
    hasError = true;
  }

  if (!year) {
    setError(yearInput, yearError, "This field is required");
    hasError = true;
  }

  if (hasError) return;

  /* Month Validation */

  if (month < 1 || month > 12) {
    setError(monthInput, monthError, "Must be a valid month");

    return;
  }

  /* Date Validation */

  const birthDate = new Date(year, month - 1, day);

  const validDate =
    birthDate.getDate() === day &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getFullYear() === year;

  if (!validDate) {
    setError(dayInput, dayError, "Must be a valid day");

    return;
  }

  const today = new Date();

  /* Future Date */

  if (birthDate > today) {
    setError(yearInput, yearError, "Must be in the past");

    return;
  }

  /* Age Calculation */

  let years = today.getFullYear() - birthDate.getFullYear();

  let months = today.getMonth() - birthDate.getMonth();

  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;

    months += 12;
  }

  displayYear.textContent = years;
  displayMonth.textContent = months;
  displayDay.textContent = days;
}

button.addEventListener("click", calculateAge);
