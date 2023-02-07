const loanForm = document.getElementById("loan-form");
const amountInput = document.getElementById("amount");
const interestInput = document.getElementById("interest");
const yearsInput = document.getElementById("years");
const monthlyPaymentOutput = document.getElementById("monthly-payment");
const totalPaymentOutput = document.getElementById("total-payment");
const errorOutput = document.getElementById("error");

loanForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validación de la entrada
  const amount = parseFloat(amountInput.value);
  const interest = parseFloat(interestInput.value) / 100 / 12;
  const years = parseFloat(yearsInput.value) * 12;

  if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
    errorOutput.textContent = "Por favor ingrese valores numéricos válidos.";
    return;
  }

  if (amount <= 0 || interest <= 0 || years <= 0) {
    errorOutput.textContent = "Por favor ingrese valores positivos.";
    return;
  }

  // Cálculo de la cuota mensual y el pago total
  const x = Math.pow(1 + interest, years);
  const monthly = (amount * x * interest) / (x - 1);
  const total = monthly * years;

  // Visualización de los resultados
  monthlyPaymentOutput.textContent = "$" + monthly.toFixed(2);
  totalPaymentOutput.textContent = "$" + total.toFixed(2);

  // Guardado de los resultados en el almacenamiento local
  const loanResult = {
    monthlyPayment: "$" + monthly.toFixed(2),
    totalPayment: "$" + total.toFixed(2),
  };
  const loanResultString = JSON.stringify(loanResult);
  localStorage.setItem("loanResult", loanResultString);
});

amountInput.addEventListener("input", function () {
  errorOutput.textContent = "";
});

interestInput.addEventListener("input", function () {
  errorOutput.textContent = "";
});

yearsInput.addEventListener("input", function () {
  errorOutput.textContent = "";
});

// Carga de los resultados del almacenamiento local
const storedLoanResultString = localStorage.getItem("loanResult");
if (storedLoanResultString) {
  const storedLoanResult = JSON.parse(storedLoanResultString);
  monthlyPaymentOutput.textContent = storedLoanResult.monthlyPayment;
  totalPaymentOutput.textContent = storedLoanResult.totalPayment;
}
