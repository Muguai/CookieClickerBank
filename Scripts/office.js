var pay = 0;

function increasePay(){
    console.log(balance)
    pay += 100;
    updatePay(pay);
}

function updatePay(pay){
    const text = document.getElementById("payText");
    text.textContent = "Pay: " + pay;
}