import { Constants } from "../shared/constants";
//import { RestaurantController } from "../../controllers/restaurantController.j";

export class DomManager {
  constructor() {
    this.restaurantController = new RestaurantController();
  }

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
    editIcon.className = "far fa-edit";
    editIcon.style = "float: right;";

    var cardItemsWrapper = document.createElement("div");

    cardItemsWrapper.className = "connectedSortable";

    editIcon.addEventListener("click", function() {
      $("#collectionModal").modal("show");
      $(".search-fields").show();
      document.getElementById("collection-name").value = title;
      document
        .getElementById("collection-name")
        .setAttribute("data-info", `${collectionId}`);
      $("#update-collection").show();
      $("#add-collection").hide();
      $("#restaurant-name-search-fields").hide();

      let searchResultsPlaceholder = document.getElementById(
        "restaurants-container-modal"
      );
      searchResultsPlaceholder.innerHTML = `<label for="message-text" style="font-weight:bold;" class="col-form-label">Restaurants Selected: (Uncheck to remove)</label>`;
      restaurants.forEach(restaurantItem => {
        var divElement = document.createElement("div");
        var labelElement = document.createElement("label");
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("checked", "checked");
        inputElement.className = "restaurantCheckbox";
        inputElement.setAttribute(
          "value",
          `${restaurantItem.id}#${restaurantItem.name}`
        );

        var textNode = document.createTextNode(`  ${restaurantItem.name}`);

        labelElement.appendChild(inputElement);
        labelElement.appendChild(textNode);
        divElement.appendChild(labelElement);
        var self = this;
        searchResultsPlaceholder.appendChild(divElement);
      });
    });

    cardTitle.appendChild(editIcon);
    cardTitle.appendChild(document.createTextNode(title));
    card.className = "card";
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardTitle.id = "card-title-" + collectionId;

    cardBody.appendChild(cardTitle);
    cardItemsWrapper.setAttribute("data-info", `${collectionId}`);
    cardItemsWrapper.setAttribute("id", `restaurant-items-col-${collectionId}`);
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
    $("#collectionModal").modal("hide");
    $("#update-collection").hide();
    $("#restaurant-name-search-fields").show();
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
    image = image || Constants.ZOMATO_DEFAULT_IMAGE;
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
