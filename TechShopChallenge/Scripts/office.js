
const payAmount = 100;

//Creates a div with a text in it and sends that text up/down in an arch
//Updates Pay amount and starts Animation for when clicking the WORK button 
function workButtonClick(event) {

    worker.addPay(payAmount);
    const clickMessage = document.createElement('div');
    clickMessage.classList.add('click-message');
    clickMessage.innerText = payAmount + '$';

    const initialX = event.pageX;
    const initialY = event.pageY;
    clickMessage.style.left = event.pageX + 'px';
    clickMessage.style.top = event.pageY + 'px';
    clickMessage.style.userSelect = "none";

    document.body.appendChild(clickMessage);

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
  
      clickMessage.style.left = posX + 'px';
      clickMessage.style.top = posY + 'px';
    }, 10);

    setTimeout(() => {
        clickMessage.style.opacity = "0";
      }, 1000);


    setTimeout(() => {
        clearInterval(intervalId);
        clickMessage.remove();
      }, 1500);
}

const workButton = document.getElementById("workButton");
workButton.addEventListener('click', workButtonClick);