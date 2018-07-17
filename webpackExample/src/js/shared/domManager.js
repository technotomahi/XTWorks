export class DomManager {

    static getAParaNode(text, className) {
        var paraElement = document.createElement("p");
        paraElement.className = className;
        var textNode = document.createTextNode(text);
        paraElement.appendChild(textNode);
        return paraElement;
    }

    static getACard(title, restaurants) {
        var card = document.createElement("div");
        var cardBody = document.createElement("div");
        var cardTitle = document.createElement("h5");
        cardTitle.appendChild(document.createTextNode(title));       
        card.className = "card";
        cardBody.className = "card-body";
        cardTitle.className = "card-title";       
        cardBody.appendChild(cardTitle);
          
        restaurants.forEach(restaurant => {
            var cardText = document.createElement("p");
            cardText.appendChild(document.createTextNode(restaurant));
            cardText.className = "card-text";
            cardBody.appendChild(cardText);
        });
        
       
        card.appendChild(cardBody);
      
        return card;
      }

      static cleanCollectionModal()
      {
        document.getElementById("restaurant-name-search").value = ""; 
        document.getElementById("collection-name").value = ""; 
        document.getElementById("restaurants-container-modal").innerHTML = ""; 
      }
}


