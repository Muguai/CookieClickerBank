//Set Cloud Spawner intervals
const cloudIntervalId = setInterval(() => {
  spawnClouds();
}, 10000);
const cloudIntervalId2 = setInterval(() => {
  spawnClouds();
}, 17500);

//Spawns a cloud that transition with css..
//..from the outside the left screen limit to outside the right screen limit
function spawnClouds() {
  const cloudImg = document.createElement("img");
  const randomCloudInt = randomIntFromInterval(1, 3);
  cloudImg.src = "img/clouds/cloud" + randomCloudInt + ".png";

  const topPosition = window.screenY;
  const bottomPosition = window.screenY + window.innerHeight;

  cloudImg.style.left = -10 + "%";
  cloudImg.style.top =
    randomFloatFromInterval(bottomPosition - 400, topPosition) + "px";
  cloudImg.style.transition = `left ${randomFloatFromInterval(65, 75)}s linear`;

  cloudImg.style.maxHeight = "10%";
  cloudImg.style.maxWidth = "10%";
  cloudImg.style.position = "absolute";
  cloudImg.classList.add("unSelectable");
  cloudImg.style.zIndex = "-1";
  cloudImg.style.opacity = `${randomFloatFromInterval(0.6, 1)}`;

  document.body.appendChild(cloudImg);

  setTimeout(() => {
    cloudImg.style.left = 110 + "%";
  }, 100);

  setTimeout(() => {
    cloudImg.remove();
  }, 75000);
}

//Spawns two initial clouds at webpage load
let initialSpawnClouds = 2;
for (let i = 0; i < initialSpawnClouds; i++) {
  spawnClouds();
  setTimeout(() => { }, 1000);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromInterval(min, max) {
  return Math.random() * (max - min + 1) + min;
}
