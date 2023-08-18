import Worker from "./person.js";

const payAmount = 100;

//Updates Pay amount and starts Animation for when clicking the WORK button
//Creates a div with a text in it and sends that text up/down in an arch
//TLDR: i found the setInterval function and went nuts
function work(event) {
  Worker.addPay(payAmount);

  const workBill = document.createElement("div");
  workBill.classList.add("moneyBill");
  workBill.classList.add("unSelectable");
  workBill.innerText = payAmount + "$";

  const initialX = event.pageX;
  const initialY = event.pageY;
  workBill.style.left = event.pageX + "px";
  workBill.style.top = event.pageY + "px";

  document.body.appendChild(workBill);

  let velocityX = (Math.random() - 0.5) * 10;
  let velocityY = -15;
  let accelerationY = 1;
  const accelerationModifier = 0.01;

  let posX = initialX;
  let posY = initialY;

  const intervalId = setInterval(() => {
    posX += velocityX;
    posY += velocityY;
    velocityY += accelerationY;
    accelerationY += accelerationModifier;

    workBill.style.left = posX + "px";
    workBill.style.top = posY + "px";
  }, 10);

  setTimeout(() => {
    workBill.style.opacity = "0";
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    workBill.remove();
  }, 1500);
}

//Work button eventlistener
const workButton = document.getElementById("workButton");
workButton.addEventListener("click", work);
