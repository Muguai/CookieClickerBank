import Worker from "./person.js";

const laptopUrl = "https://hickory-quilled-actress.glitch.me";

//Puts all the laptops titles as options in the selector
async function initializeLaptops() {
  const selector = document.getElementById("laptopSelector");
  try {
    const jsonFile = await fetch(laptopUrl + "/computers").then((data) => {
      data = data.json();
      return data;
    });

    for (let i = 0; i < jsonFile.length; i++) {
      var option = document.createElement("option");
      option.text = jsonFile[i]["title"];
      selector.add(option);
    }

    selector.selectedIndex = 0;
    showLaptopInfo();
  } catch (error) {
    console.log(error);
  }
}

initializeLaptops();

//Fetch the selected laptops info
async function showLaptopInfo() {
  const selector = document.getElementById("laptopSelector");

  try {
    const jsonFile = await fetch(laptopUrl + "/computers").then((data) => {
      return data.json();
    });

    assignLaptopInfo(jsonFile[selector.selectedIndex]);
  } catch (error) {
    console.log(error);
  }
}

//Show Laptop selector eventlistener
const laptopSelector = document.getElementById("laptopSelector");
laptopSelector.addEventListener("change", showLaptopInfo);

//Assign selected laptops info
function assignLaptopInfo(data) {
  const infoText = document.getElementById("laptopInfo");
  const nameHeader = document.getElementById("laptopInfoTitle");
  const priceText = document.getElementById("laptopPrice");
  const featureText = document.getElementById("laptopFeatureText");
  const laptopPic = document.getElementById("laptopPic");

  nameHeader.textContent = data["title"];
  infoText.textContent = data["description"];
  priceText.textContent = data["price"] + " $";
  featureText.textContent = "";
  for (const i of data["specs"]) {
    featureText.textContent += i + "\r\n";
  }

  laptopPic.src = laptopUrl + "/" + data["image"];
}

//Buys a laptop that continously ticks up your balance (Like cookie clicker)
//Laptop increases your balance by (laptopPrice / 20) every second
function buyLaptop() {
  const priceText = document.getElementById("laptopPrice");
  const splitText = priceText.textContent.split(" ");
  if (Worker.balance < Number(splitText[0])) {
    alert("Not enough balance to buy laptop");
    return;
  }

  Worker.withdrawBank(Number(splitText[0]));

  const nameHeader = document.getElementById("laptopInfoTitle");

  Worker.addLaptop(
    Math.round(Number(splitText[0]) / 20),
    nameHeader.textContent
  );
}

//Work button eventlistener
const laptopBuyButton = document.getElementById("laptopBuyButton");
laptopBuyButton.addEventListener("click", buyLaptop);
