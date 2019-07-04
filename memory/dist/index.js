var MemoryGame = (function () {
    function MemoryGame(cardCount) {
        var _a;
        this.cards = [];
        this.values = [];
        this.rows = [];
        for (var i = 0; i < cardCount / 2; i++) {
            var value = 0;
            do {
                value = Math.floor(Math.random() * 100);
            } while (this.values.indexOf(value) != -1);
            this.values.push(value, value);
        }
        this.squareSize = Math.ceil(Math.sqrt(cardCount));
        for (var i = 0; i < this.squareSize; i++) {
            this.rows.push(Utilities.createDivWithClass("card-row"));
            for (var j = 0; j < this.squareSize; j++) {
                var card = new Card(this.values.splice(Math.floor(Math.random() * this.values.length), 1).toString());
                this.cards.push(card);
                this.rows[i].append(card.card);
            }
        }
        this.board = Utilities.createDivWithClass("board");
        document.body.appendChild(this.board);
        (_a = this.board).append.apply(_a, this.rows);
        var self = this;
        this.board.addEventListener('click', function (event) {
            var clickedCards = self.cards.filter(function (c) { return c.clicked; });
            if (clickedCards.length === 2) {
                if (clickedCards[0].value === clickedCards[1].value) {
                    clickedCards[0].reveal();
                    clickedCards[1].reveal();
                }
                else {
                    setTimeout(function () {
                        clickedCards[0].flip();
                        clickedCards[1].flip();
                    }, 500);
                }
            }
        });
    }
    return MemoryGame;
}());
var Card = (function () {
    function Card(value) {
        this.card = Utilities.createDivWithClass("card");
        this.value = value;
        var self = this;
        this.card.addEventListener('click', function (event) {
            self.flip();
        });
    }
    Card.prototype.flip = function () {
        if (!this.revealed) {
            this.clicked = !this.clicked;
            this.card.innerText = this.clicked ? this.value : "";
        }
    };
    Card.prototype.reveal = function () {
        this.revealed = true;
        this.card.innerText = this.value;
        this.clicked = false;
    };
    return Card;
}());
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.createDivWithClass = function (className) {
        var div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    };
    Utilities.toggleDivClass = function (div, className) {
        div.classList.contains(className) ? div.classList.remove(className) : div.className += " " + className;
    };
    return Utilities;
}());
(function startGame() {
    var game = new MemoryGame(16);
})();
//# sourceMappingURL=index.js.map