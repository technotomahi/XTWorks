export class DomManager {
  static getAParaNode(text, className) {
    var paraElement = document.createElement("p");
    paraElement.className = className;
    var textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }

  static getACard(collectionId, title, restaurants) {
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    var editIcon = document.createElement("i");
    // <i class="far fa-edit" style=" float: right;"></i>
    var cardItemsWrapper = document.createElement("div");

    cardItemsWrapper.className = "connectedSortable";
    editIcon.className = "far fa-edit";
    editIcon.style = "float: right;";

    editIcon.addEventListener("click", function() {
      $("#collectionModal").modal("show");
      $(".search-fields").hide();
      document.getElementById("collection-name").value = title;
      document
        .getElementById("collection-name")
        .setAttribute("data-info", `${collectionId}`);
      $("#update-collection").show();
      $("#add-collection").hide();
    });

    cardTitle.appendChild(editIcon);
    cardTitle.appendChild(document.createTextNode(title));
    card.className = "card";
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardTitle.id = "card-title-" + collectionId;

    cardBody.appendChild(cardTitle);
    cardItemsWrapper.setAttribute("data-info", `${collectionId}`);
    restaurants.forEach(restaurant => {
      var cardText = document.createElement("p");
      cardText.setAttribute("data-info", `${restaurant.id}`);
      cardText.appendChild(document.createTextNode(restaurant.name));
      cardText.className = "card-text";
      cardItemsWrapper.appendChild(cardText);
    });

    cardBody.appendChild(cardItemsWrapper);
    card.appendChild(cardBody);

    return card;
  }

  static cleanCollectionModal() {
    document.getElementById("restaurant-name-search").value = "";
    document.getElementById("collection-name").value = "";
    document.getElementById("restaurants-container-modal").innerHTML = "";
    $("#update-collection").hide();
    $("#add-collection").show();
    $("#collectionModal").modal("toggle");
  }

  static getArrayOfObjects(datas) {
    var restultArrray = [];
    datas.forEach(item => {
      restultArrray.push({ id: item.split("#")[0], name: item.split("#")[1] });
    });
    return restultArrray;
  }

  static getADetailedCard(title, image, restaurant) {
    var card = document.createElement("div");
    var img = document.createElement("img");
    img.className = "card-img-top";
    img.setAttribute("alt", "Card image cap");
    img.setAttribute("src", image);

    var cardBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    var cardItemsWrapper = document.createElement("div");

    cardItemsWrapper.className = "connectedSortable";
    cardTitle.appendChild(document.createTextNode(title));
    card.className = "card";
    card.setAttribute("style", "width: 23rem");
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardBody.appendChild(cardTitle);
    for (var property in restaurant) {
      var cardText = document.createElement("p");
      cardText.appendChild(
        document.createTextNode(property + " : " + restaurant[property])
      );
      cardText.className = "card-text";
      cardItemsWrapper.appendChild(cardText);
    }
    cardBody.appendChild(cardItemsWrapper);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
  }
}
