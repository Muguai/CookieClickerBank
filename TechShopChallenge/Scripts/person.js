class Person {
  constructor() {
    this.loan = 0;
    this.pay = 0;
    this.balance = 0;
    this.boughtLaptops = [];
    this.parentImage = document.getElementById("bankImage");

     this.intervalId = setInterval(() => {
      this.updateLaptops();
    }, 1000);
  }

  withdrawBank(amount) {
    this.balance -= amount;
    this.updateBankBalance();
  }

  depositBank(amount) {
    this.balance += amount;
    this.updateBankBalance();
  }

  updateBankBalance() {
    const text = document.getElementById("balanceText");
    text.textContent = "Balance: " + this.balance + " $";
  }

  removePay(amount) {
    this.pay -= amount;
    this.updatePay();
  }

  addPay(amount) {
    this.pay += amount;
    this.updatePay();
  }

  updatePay() {
    const text = document.getElementById("payText");
    text.textContent = "Pay: " + this.pay + " $";
  }

  getLoan(amount) {
    this.loan = amount;
    this.updateLoan();
  }

  removeLoan(amount) {
    this.loan -= amount;
    this.updateLoan();
  }

  updateLoan() {
    const text = document.getElementById("loanText");
    text.textContent = "Loan: " + this.loan + " $";
  }

  addLaptop(balanceAdd, name) {
    this.boughtLaptops.push(
      new Laptop(
        balanceAdd,
        name,
        this.boughtLaptops.length,
        this,
        this.calculateBankImageCenter()
      )
    );
    this.updateLaptops();
  }

  updateLaptops() {
    if (this.boughtLaptops.length == 0) return;

    const angleIncrement = 360 / this.boughtLaptops.length;

    let [imgCenterX, imgCenterY] = this.calculateBankImageCenter();

    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const radius = Math.min(windowWidth, windowHeight) / 10;

    for (let i = 0; i < this.boughtLaptops.length; i++) {
      const angle = i * angleIncrement;
      const smallImageX =
        imgCenterX + radius * Math.cos((angle * Math.PI) / 180);
      const smallImageY =
        imgCenterY + radius * Math.sin((angle * Math.PI) / 180);
      let smallImg = this.boughtLaptops[i].img;
      const finalX = smallImageX - smallImg.getBoundingClientRect().width / 2;
      const finalY = smallImageY - smallImg.getBoundingClientRect().height / 2;
      this.boughtLaptops[i].bankImagePos = [finalX, finalY];

      smallImg.style.left = finalX + "px";
      smallImg.style.top = finalY + "px";
    }
  }

  calculateBankImageCenter() {
    let imgRect = this.parentImage.getBoundingClientRect();
    let imgCenterX = imgRect.left + imgRect.width / 2;
    let imgCenterY = imgRect.top + imgRect.height / 2;

    return [imgCenterX, imgCenterY];
  }
}

export default Worker = new Person();

class Laptop {
  constructor(balanceAdd, name, laptopNumber, parent, bankImagePos) {
    this.balanceAdd = balanceAdd;
    this.name = name;
    this.img = document.createElement("img");
    this.img.style.position = "absolute";
    this.bankImagePos = bankImagePos;
    this.img.classList.add("bounce-animation");
    this.parent = parent;
    this.img.src =
      "https://cdn4.iconfinder.com/data/icons/app-ui/100/laptop-512.png";
    this.img.alt = "$";
    this.img.classList.add("unSelectable");
    this.img.style.animationDelay = laptopNumber * 100 + "ms";

    document.body.appendChild(this.img);

    this.intervalId = setInterval(() => {
      this.increaseBalanceTick();
    }, 1000);
  }

  increaseBalanceTick() {
    this.parent.depositBank(this.balanceAdd);
    const tempText = document.createElement("div");

    tempText.innerText = this.balanceAdd + "$";
    const initialX = this.bankImagePos[0];
    const initialY = this.bankImagePos[1];
    const [imgCenterX, imgCenterY] = this.parent.calculateBankImageCenter();

    tempText.classList.add("moneyBill", "unSelectable");
    tempText.style.left = initialX + "px";
    tempText.style.top = initialY + "px";
    tempText.style.transition = "all 0.4s ease-in-out";

    document.body.append(tempText);

    setTimeout(() => {
      tempText.style.left = imgCenterX + "px";
      tempText.style.top = imgCenterY + "px";
      tempText.style.opacity = "0.1";
    }, 50);

    setTimeout(() => {
      tempText.remove();
    }, 450);
  }
}

Worker.addLaptop(120, "coolLaptop");
