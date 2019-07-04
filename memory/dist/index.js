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
    }
    return MemoryGame;
}());
var Card = (function () {
    function Card(value) {
        this.card = Utilities.createDivWithClass("card");
        this.card.innerText = value;
        this.card.addEventListener('click', function (event) {
            Utilities.toggleDivClass(this, "clicked");
        });
    }
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