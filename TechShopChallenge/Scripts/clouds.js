
const cloudIntervalId  = setInterval(() => {
    spawnClouds();
  }, 10000);
  const cloudIntervalId2  = setInterval(() => {
    spawnClouds();
  }, 17500);


function spawnClouds()
{
    const cloudImg = document.createElement('img');
    const randomCloudInt = randomIntFromInterval(1,3);
    cloudImg.src = "img/clouds/cloud" + randomCloudInt + ".png";

    const leftPosition = window.screenX;
    const topPosition = window.screenY;

    const rightPosition = window.screenX + window.innerWidth;
    const bottomPosition = window.screenY + window.innerHeight;

    console.log("LeftPos " + leftPosition + " RightPos " + rightPosition);


    cloudImg.style.left = -10 + '%';
    cloudImg.style.top = randomFloatFromInterval(bottomPosition - 400,topPosition) + 'px';
    cloudImg.style.transition = `left ${randomFloatFromInterval(65,75)}s`;

    cloudImg.style.maxHeight = "10%";
    cloudImg.style.maxWidth = "10%";
    cloudImg.style.position = "absolute";
    cloudImg.classList.add("unSelectable");
    cloudImg.style.zIndex = "-1";
    cloudImg.style.opacity = `${randomFloatFromInterval(0.7,1)}`;

    document.body.appendChild(cloudImg);


    setTimeout(() => {
        cloudImg.style.left = (110 ) + '%';
      }, 100);


    setTimeout(() => {
        cloudImg.remove();
      }, 70000);

}



spawnClouds();
spawnClouds();

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min;
}
