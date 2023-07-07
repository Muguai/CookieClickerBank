function putEarningsInBank(){
    if(worker.pay <= 0)
        return;
        
    transferMoneyVisuals()
    if(worker.loan > 0){
        worker.loan -= (worker.pay / 10);
        worker.pay -= (worker.pay / 10);
        if(worker.loan <= 0)
            hideLoan(true);
    }
    worker.balance += worker.pay;
    worker.pay = 0;
    worker.updatePay();

}

//Move the pay value visually to the bank balance through CSS transition
function transferMoneyVisuals(){

    const payText = document.getElementById("payText");
    const balanceText = document.getElementById("balanceText");

    const balanceTransfer = document.createElement('div');
    balanceTransfer.style.position = 'absolute';
    balanceTransfer.style.left = `${getOffset(payText).left + 50}px`;
    balanceTransfer.style.top = `${getOffset(payText).top + 10}px`;
    balanceTransfer.style.border = "thick solid green";
    balanceTransfer.style.background = "lightgreen";
    balanceTransfer.style.color = "green";

    balanceTransfer.innerText = worker.pay + "$";

    balanceTransfer.style.transition = 'all 0.7s ease-in-out';
    
    setTimeout(() => {
        balanceTransfer.style.left = `${getOffset(balanceText).left + 70}px`;
        balanceTransfer.style.top = `${getOffset(balanceText).top + 10}px`;
    
    }, 100);

    document.body.appendChild(balanceTransfer);

    setTimeout(() => {  
        worker.updateBankBalance();    
        worker.updateLoan();
        balanceTransfer.remove();
    }, 700);
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


function getALoan(){
    if(worker.loan > 0){
        alert("You cant get a loan when you already have one");
        return;
    }

    let appliedLoan = prompt("How much would you like to loan?");
    if(isNaN(Number(appliedLoan))) {
        alert(appliedLoan + " is not a valid number");
        return;
    }

    if(Number(appliedLoan) == 0){
        alert("You cant get a loan of 0");
        return;
    }

    if(Number(appliedLoan) > worker.balance * 2){
        alert("You cant get a loan thats more than double your bank balance");
        return;
    }
    
    hideLoan(false);
    worker.loan = Number(appliedLoan);
    worker.updateLoan();
}

function payLoan(){
    worker.loan -= worker.pay;

    if(worker.loan < 0){
        worker.balance += Math.abs(worker.loan);
        worker.loan = 0;
    }

    worker.pay = 0;
    worker.updateBankBalance();
    worker.updateLoan();
    worker.updatePay();

    if(worker.loan <= 0)
        hideLoan(true)
}

//Hides or shows the loan text and pay loan button
function hideLoan(hide){
    console.log("get here");
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

hideLoan(true);
