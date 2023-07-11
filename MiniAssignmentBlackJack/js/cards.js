export class cards{
    constructor(image, value) {
        this.image = image;
        this.value = value;
    }

    getValue(bust){
        switch(this.value){
            case"JACK":
            case"QUEEN":
            case"KING":
                return 10;
                break; 
            case"ACE":
                if(bust)
                    return 11;
                else
                    return 1;
                break; 
            default:
                return this.value;

                
        }

    }
    
}