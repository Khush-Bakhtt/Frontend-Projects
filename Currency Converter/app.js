const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const form = document.querySelector("form");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

// ==============================
// Currency Dropdowns
// ==============================

for (let select of dropdowns) {

  for (let currCode in countryList) {

    let newOption = document.createElement("option");

    newOption.innerText = currCode;
    newOption.value = currCode;

    // Default FROM currency = USD
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }

    // Default TO currency = PKR
    else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  // Change flag when currency changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


// ==============================
// Update Exchange Rate
// ==============================

const updateExchangeRate = async () => {

  let amount = document.querySelector(".amount input");

  let amtVal = amount.value;

  // If amount is empty or less than 1
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // API URL
  const URL =
    `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {

    // Fetch API
    let response = await fetch(URL);

    let data = await response.json();

    // Get exchange rate
    let rate =
      data[fromCurr.value.toLowerCase()]
          [toCurr.value.toLowerCase()];

    // Calculate final amount
    let finalAmount = amtVal * rate;

    // Round off decimal value
    let roundedAmount = Math.round(finalAmount);

    // Display result
    msg.innerText =
      `${amtVal} ${fromCurr.value} = ${roundedAmount} ${toCurr.value}`;

  } catch (error) {

    msg.innerText = "Something went wrong. Please try again.";

    console.log(error);
  }
};


// ==============================
// Update Currency Flag
// ==============================

const updateFlag = (element) => {

  let currCode = element.value;

  let countryCode = countryList[currCode];

  let newSrc =
    `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img =
    element.parentElement.querySelector("img");

  img.src = newSrc;
};


// ==============================
// Form Submit
// ==============================

form.addEventListener("submit", (evt) => {

  // Stop page from refreshing
  evt.preventDefault();

  // Update exchange rate
  updateExchangeRate();
});


// ==============================
// Run when page loads
// ==============================

window.addEventListener("load", () => {

  updateExchangeRate();

});