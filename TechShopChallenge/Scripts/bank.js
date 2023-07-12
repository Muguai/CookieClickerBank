import Worker from "./person.js";

function putEarningsInBank() {
  if (Worker.pay <= 0) return;

  let loanPay = 0;
  if (Worker.loan > 0) {
    loanPay = Worker.pay / 10;
    Worker.removePay(loanPay);
  }

  transferMoneyVisuals(Worker.pay, loanPay);
  Worker.removePay(Worker.pay);
}

//Bank button eventlistener
const bankButton = document.getElementById("bankButton");
bankButton.addEventListener("click", putEarningsInBank);

//Move the pay value visually to the bank balance through CSS transition
function transferMoneyVisuals(pay, loanPay) {
  const payText = document.getElementById("payText");
  const balanceImage = document.getElementById("bankImage");

  const balanceTransfer = document.createElement("div");

  balanceTransfer.classList.add("moneyBill", "unSelectable");
  balanceTransfer.style.left = `${getOffset(payText).left + 50}px`;
  balanceTransfer.style.top = `${getOffset(payText).top}px`;

  balanceTransfer.style.transition = "all 0.5s ease-in-out";
  balanceTransfer.innerText = Worker.pay + "$";

  setTimeout(() => {
    balanceTransfer.style.left = `${getOffset(balanceImage).left +
      balanceImage.getBoundingClientRect().width / 2
      }px`;
    balanceTransfer.style.top = `${getOffset(balanceImage).top +
      balanceImage.getBoundingClientRect().height / 2
      }px`;
  }, 100);

  document.body.appendChild(balanceTransfer);

  setTimeout(() => {
    //Pay gets added to balance after transfer money visuals is complete
    Worker.depositBank(pay);
    Worker.removeLoan(loanPay);
    if (Worker.loan <= 0) hideLoanUI(true);
    balanceTransfer.remove();
  }, 700);
}

//Get image position
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

function getALoan() {
  if (Worker.loan > 0) {
    alert("You cant get a loan when you already have one");
    return;
  }

  let appliedLoan = prompt("How much would you like to loan?");

  if (isNaN(Number(appliedLoan))) {
    alert(appliedLoan + " is not a valid number");
    return;
  }

  if (Number(appliedLoan) <= 0) {
    alert("You cant get a loan of 0 or less");
    return;
  }

  if (Number(appliedLoan) > Worker.balance * 2) {
    alert("You cant get a loan thats more than double your bank balance");
    return;
  }

  hideLoanUI(false);
  Worker.getLoan(Number(appliedLoan));
}

//Get Loan button eventListener
const getLoanButton = document.getElementById("getLoanButton");
getLoanButton.addEventListener("click", getALoan);

function payLoan() {
  Worker.removeLoan(Worker.pay);

  if (Worker.loan < 0) {
    Worker.depositBank(Math.abs(Worker.loan));
    Worker.getLoan(0);
  }

  Worker.removePay(Worker.pay);

  if (Worker.loan <= 0) hideLoanUI(true);
}

//Pay Loan button eventListener
const payLoanButton = document.getElementById("payLoanButton");
payLoanButton.addEventListener("click", payLoan);

//Hides or shows the loan text and pay loan button
function hideLoanUI(hide) {
  const loanText = document.getElementById("loanText");
  const loanButton = document.getElementById("payLoanButton");

  if (!hide) {
    loanText.style.display = "block";
    loanButton.style.display = "block";
  } else {
    loanText.style.display = "none";
    loanButton.style.display = "none";
  }
}

//Hide loan ui at page startup
hideLoanUI(true);
