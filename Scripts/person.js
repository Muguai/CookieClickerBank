class Person {

    constructor() {
        this.loan = 0;
        this.pay = 0;
        this.balance = 0;
    }

    updateBankBalance(){
        const text = document.getElementById("balanceText");
        text.textContent = "Balance: " + this.balance;
    }

    
    updatePay(){
        const text = document.getElementById("payText");
        text.textContent = "Pay: " + this.pay;
    }

    updateLoan(){
        const text = document.getElementById("loanText");
        text.textContent = "Loan: " + this.loan;
    }
}

const worker = new Person();