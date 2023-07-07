
const laptopUrl = "https://hickory-quilled-actress.glitch.me/computers";
const laptopPicUrl = "https://hickory-quilled-actress.glitch.me";


async function initializeLaptops(){
    const selector = document.getElementById("laptopSelector");
    try{
        const jsonFile = await fetch(laptopUrl)
        .then(data => {
            data = data.json()
            return data;
        });

        console.log(jsonFile.length);

        for (let i = 0; i < jsonFile.length; i++){
            var option = document.createElement("option");
            option.text = jsonFile[i]["title"];
            selector.add(option);
        }

        selector.selectedIndex = 0;
        showLaptopInfo();
    }catch (error){
        console.log(error)
    }
}

async function showLaptopInfo(){
    const selector = document.getElementById("laptopSelector");

    try{
        const jsonFile = await fetch(laptopUrl)
        .then(data => {
            return data.json();
        });
        
        assignLaptopInfo(jsonFile[selector.selectedIndex]);
    }catch (error){
        console.log(error)
    }
}

function assignLaptopInfo(data){
    const infoText = document.getElementById("laptopInfo");
    const nameHeader = document.getElementById("laptopInfoTitle");
    const priceText = document.getElementById("laptopPrice");
    const featureText = document.getElementById("laptopFeatureText");
    const laptopPic = document.getElementById('laptopPic');

    nameHeader.textContent = data["title"];
    infoText.textContent = data["description"];
    priceText.textContent = data["price"] + " $";
    featureText.setAttribute('style', 'white-space: pre;');
    featureText.textContent = "";
    for(const i of data["specs"] ){
        featureText.textContent += i + "\r\n";
    }

    laptopPic.src = laptopPicUrl + "/"+ data["image"];
}

function buyLaptop(){
    const priceText = document.getElementById("laptopPrice");
    splitText = priceText.textContent.split(" ");
    if(worker.balance < Number(splitText[0])){
        alert("Not enough balance to buy laptop");
        return;
    }

    worker.balance -= Number(splitText[0]);
    worker.updateBankBalance();

    const nameHeader = document.getElementById("laptopInfoTitle");

    
    worker.addLaptop(Math.round(Number(splitText[0])/20),nameHeader.textContent);
}

initializeLaptops();