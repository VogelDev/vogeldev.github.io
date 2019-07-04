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
    }    
}

class Card {
    card: HTMLDivElement;
    constructor(value:string){
        this.card = Utilities.createDivWithClass("card");
        this.card.innerText = value;
        this.card.addEventListener('click', function (event) {
            Utilities.toggleDivClass(this, "clicked");
        });
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