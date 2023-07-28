"use strict";

const btnArrow = document.querySelector(".arrow");
const form = document.querySelector(".sub");
const dayDisplay = document.querySelector(".dayDisp");
const monthDisplay = document.querySelector(".monthDisp");
const yearDisplay = document.querySelector(".yearDisp");
const inputsFields = document.querySelectorAll("input");

const errorDisplay = function (errDisplay) {
  errDisplay.classList.remove("hidden");
  errDisplay.style.color = "hsl(0, 100%, 67%)";
  errDisplay.closest(".parent").querySelector("label").style.color =
    "hsl(0, 100%, 67%)";
};

const calcAge = function () {
  const dayInput = document.querySelector("#day");
  const monthInput = document.querySelector("#month");
  const yearInput = document.querySelector("#year");

  const dayErrorDisplay = document.querySelector(".dayErr");
  const monthErrorDisplay = document.querySelector(".monthErr");
  const yearErrorDisplay = document.querySelector(".yearErr");

  const datee = new Date();
  const days = +dayInput.value;
  const months = +monthInput.value - 1;
  const years = +yearInput.value;

  const d =
    (datee.getTime() - new Date(years, months, days)) / (1000 * 60 * 60 * 24);
  // console.log("jjjjjjj", days, months, years, d);
  // console.log("days", Math.trunc((d % 365) % 30));
  // console.log(
  //   "years",
  //   Math.trunc(
  //     (datee.getTime() - new Date(years, months, days)) /
  //       (1000 * 60 * 60 * 24 * 365)
  //   )
  // );
  inputsFields.forEach((inp) => {
    if (inp.value === "") {
      const targetParent = inp.closest(".parent");
      inp.style.borderColor = "hsl(0, 100%, 67%)";
      const newDiv = document.createElement("div");
      const newContent = document.createTextNode("This field is required");
      newDiv.style.color = "hsl(0, 100%, 67%)";
      newDiv.appendChild(newContent);

      targetParent.appendChild(newDiv);
      targetParent.querySelector("label").style.color = "hsl(0, 100%, 67%)";
    }
  });

  if (Number(monthInput.value) === 2 && Number(dayInput.value) > 28) {
    errorDisplay(dayErrorDisplay);
    return;
  }

  if (
    (Number(monthInput.value) === 4 ||
      Number(monthInput.value) === 6 ||
      Number(monthInput.value) === 9 ||
      Number(monthInput.value) === 11) &&
    Number(dayInput.value) > 30
  ) {
    errorDisplay(dayErrorDisplay);
    return;
  }

  if (
    (dayInput.value.length > 0 && Number(dayInput.value < 1)) ||
    Number(dayInput.value) > 31
  ) {
    errorDisplay(dayErrorDisplay);
  }

  if (
    monthInput.value.length > 0 &&
    (Number(monthInput.value) < 1 || Number(monthInput.value) > 12)
  ) {
    errorDisplay(monthErrorDisplay);
  }
  if (Number(yearInput.value > datee.getFullYear())) {
    errorDisplay(yearErrorDisplay);
  }

  if (
    dayInput.value.length > 0 &&
    monthInput.value.length > 0 &&
    yearInput.value.length > 0 &&
    Number(dayInput.value > 0) &&
    Number(dayInput.value) < 32 &&
    Number(monthInput.value) > 0 &&
    Number(monthInput.value) < 13 &&
    Number(yearInput.value < datee.getFullYear())
  ) {
    dayDisplay.textContent = Math.trunc((d % 365) % 30);
    monthDisplay.textContent = Math.trunc((d % 365) / 30);
    yearDisplay.textContent = Math.trunc(d / 365);
  }
};

btnArrow.addEventListener("click", function (e) {
  e.preventDefault();
  calcAge();
});
