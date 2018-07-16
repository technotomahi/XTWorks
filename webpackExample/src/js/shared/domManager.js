export class DomManager {

    static getAParaNode(text, className) {
        var paraElement = document.createElement("p");
        paraElement.className = className;
        var textNode = document.createTextNode(text);
        paraElement.appendChild(textNode);
        return paraElement;
    }

    static getACard(title, text) {
        var card = document.createElement("div");
        var cardBody = document.createElement("div");
        var cardTitle = document.createElement("h5");
        cardTitle.appendChild(document.createTextNode(title));
        var cardText = document.createElement("p");
        cardText.appendChild(document.createTextNode(text));
        card.className = "card";
        cardBody.className = "card-body";
        cardTitle.className = "card-title";
        cardText.className = "card-text";
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
      
        return card;
      }
}


