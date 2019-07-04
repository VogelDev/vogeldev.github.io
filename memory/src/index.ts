class MemoryGame {
    cards: Card[];
    board: HTMLDivElement;
    rows: HTMLDivElement[];
    squareSize: number;
    values: number[];
    constructor(cardCount: number){

        this.cards = [];
        this.values = [];
        this.rows = [];

        // pick random values from 0-99
        for(let i = 0; i < cardCount / 2; i++){
            let value = 0;
            // make sure this number doesn't exist or there will be 4, or more, of the same value
            do {
                value = Math.floor(Math.random() * 100);
            }while(this.values.indexOf(value) != -1);
            this.values.push(value, value);
        }

        // create a square with the number given, might need to rethink this
        this.squareSize = Math.ceil(Math.sqrt(cardCount));
        for(let i = 0; i < this.squareSize; i++){
            this.rows.push(Utilities.createDivWithClass("card-row"));
            for(let j = 0; j < this.squareSize; j++){
                let card = new Card(this.values.splice(Math.floor(Math.random()*this.values.length),1).toString());
                this.cards.push(card);
                this.rows[i].append(card.card);
            }
        }

        this.board = Utilities.createDivWithClass("board");
        document.body.appendChild(this.board);
        this.board.append(...this.rows);
        
        let self = this;
        this.board.addEventListener('click', function (event) {
            let clickedCards = self.cards.filter(c=>c.clicked);
            if(clickedCards.length === 2){
                if(clickedCards[0].value === clickedCards[1].value){
                    clickedCards[0].reveal();
                    clickedCards[1].reveal();
                }else{
                    setTimeout(()=>{
                        clickedCards[0].flip();
                        clickedCards[1].flip();
                    }, 500);
                }
            }
        });
    }    
}

class Card {
    card: HTMLDivElement;
    clicked: boolean;
    value: string;
    revealed: boolean;

    constructor(value:string){
        this.card = Utilities.createDivWithClass("card");
        this.value = value;

        let self = this;
        this.card.addEventListener('click', function (event) {
            self.flip();
        });
    }

    flip(){
        if(!this.revealed){
            this.clicked = !this.clicked;
            this.card.innerText = this.clicked ? this.value : "";
        }
    }

    reveal(){
        this.revealed = true;
        this.card.innerText = this.value;
        this.clicked = false;
    }

}

class Utilities{
    static createDivWithClass(className: string){
        let div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    }

    static toggleDivClass(div: HTMLDivElement, className: string){
        div.classList.contains(className) ? div.classList.remove(className) : div.className += ` ${className}`;
    }
}

(function startGame(){
    let game = new MemoryGame(16);
})();