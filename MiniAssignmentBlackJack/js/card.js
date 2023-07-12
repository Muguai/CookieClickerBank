export class card{
    constructor(image, value) {
        this.image = image;
        this.value = value;
    }

    getValue(){
        switch(this.value){
            case"JACK":
            case"QUEEN":
            case"KING":
                return Number(10);
                break; 
            case"ACE":
                return Number(11);
                break; 
            default:
                return Number(this.value);

                
        }

    }

    createCardElement(backOfCard){
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-3');
        const cardImage = document.createElement('img');
        cardImage.id = 'cardImage';
        cardImage.classList.add('card-img', 'img-fluid');
        if(backOfCard)
            cardImage.src = "https://www.deckofcardsapi.com/static/img/back.png";
        else
            cardImage.src = this.image;
        cardImage.alt = this.value;
        return[cardDiv, cardImage];

    }
    
}

