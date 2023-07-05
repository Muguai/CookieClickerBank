var balance = 0;
var loan = 0;

function putEarningsInBank(){
    balance += pay;
    pay = 0;
    
    updateBankBalance(balance);
    updatePay(pay);
}

function updateBankBalance(balance){
    const text = document.getElementById("balanceText");
    text.textContent = "Balance: " + balance;
}
