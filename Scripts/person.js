class Person {

    constructor() {
        this.loan = 0;
        this.pay = 0;
        this.balance = 0;
        this.boughtLaptops = [];
        this.parentImage = document.getElementById('bankImage');


        const intervalId = setInterval(() => {
            this.updateLaptops();
          }, 1000);
    }

    withdrawBank(amount){
        this.balance -= amount;
        this.updateBankBalance();
    }

    depositBank(amount){
        this.balance += amount;
        this.updateBankBalance();
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

    addLaptop(balanceAdd, name){
        this.boughtLaptops.push(new Laptop(balanceAdd, name, this.boughtLaptops.length, this))
        this.updateLaptops();
    }

    updateLaptops(){
        if(this.boughtLaptops.length == 0)
            return;
        const angleIncrement = 360 / this.boughtLaptops.length;

        let [imgCenterX,imgCenterY] = this.calculateParentImageCenter();

        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const radius = Math.min(windowWidth, windowHeight) / 10;

        for (var i = 0; i < this.boughtLaptops.length; i++) {
            const angle = i * angleIncrement;
            const smallImageX = imgCenterX + radius * Math.cos(angle * Math.PI / 180);
            const smallImageY = imgCenterY + radius * Math.sin(angle * Math.PI / 180);

            let smallImg = this.boughtLaptops[i].img; 
            smallImg.style.left = smallImageX - smallImg.getBoundingClientRect().width / 2 + 'px';
            smallImg.style.top = smallImageY - smallImg.getBoundingClientRect().width / 2 + 'px';
        }
    }

    calculateParentImageCenter(){
        let imgRect = this.parentImage.getBoundingClientRect();

        let imgCenterX = imgRect.left + imgRect.width / 2;
        let imgCenterY = imgRect.top + imgRect.height / 2; 

        return [imgCenterX, imgCenterY];
    }
}

const worker = new Person();



class Laptop {

    constructor(balanceAdd, name, laptopNumber,parent ) {
        this.balanceAdd = balanceAdd;
        this.name = name;
        this.isMovingOut = false;
        this.offset = 100;
        this.img = document.createElement('img');
        this.img.style.position = 'absolute';
        //this.img.innerText = "$";
        this.img.classList.add('bounce-animation');
       
        this.parent = parent;
        this.img.src = 'https://cdn4.iconfinder.com/data/icons/app-ui/100/laptop-512.png';
        this.img.style.animationDelay = laptopNumber * 100 + 'ms';
        console.log("here we add eventListener");
        this.img.addEventListener("animationend", this.increaseBalanceTick());

        document.body.appendChild(this.img);

        this.intervalId = setInterval(() => {
            this.increaseBalanceTick();
          }, 1000);

    }

    increaseBalanceTick(){
        this.parent.depositBank(this.balanceAdd)
        const tempText = document.createElement("div");

        tempText.innerText = this.balanceAdd + "$";
        let [imgCenterX,imgCenterY] = this.parent.calculateParentImageCenter();
        const initialY = imgCenterX + tempText.getBoundingClientRect().width / 2;
        const initialX = imgCenterY + tempText.getBoundingClientRect().width / 2;

        tempText.style.position = "absolute";
        tempText.style.left = initialY+ 'px';
        tempText.style.top = initialX+ 'px';
        tempText.style.border = "thick solid green";
        tempText.style.background = "lightgreen";
        tempText.style.color = "green";
        tempText.style.userSelect = "none";

        
        document.body.append(tempText);
        //Make it so spawned text move from computer to middle of bank instead.
        //Also add a transparent effect to it.

    
    }
    


}

worker.addLaptop(120, "coolLaptop");