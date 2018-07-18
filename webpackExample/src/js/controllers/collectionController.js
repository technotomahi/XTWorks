import { Constants } from "../shared/constants";
import { DomManager } from "../shared/domManager";
import { CollectionService } from "../services/collectionService";
export class CollectionController {
  constructor() {
    this.collectionService = new CollectionService();
    this.sourceCollectionId = 0;
    this.targetCollectionId = 0;
    this.targetRestaurantId = 0;
  }

  searchCollections() {
    this.collectionService
      .getCollections()
      .then(data => {
        console.log(data);
        this.displayCollections(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addCollection(payload) {
    this.collectionService
      .addCollection(payload)
      .then(data => {
        console.log(data);
        this.AddToCollection(data);
        DomManager.cleanCollectionModal();
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateCollection(payload) {
    ;
    this.collectionService
      .updateCollection(payload)
      .then(data => {
        console.log(data);
        DomManager.cleanCollectionModal();
        document.getElementById(
          "card-title-" + data.id
        ).innerHTML = `<i class="far fa-edit" style="float: right;"></i>${
          data.title
        }`;
        var cardItemsWrapper = document.getElementById(
          `restaurant-items-col-${data.id}`
        );
        cardItemsWrapper.innerHTML = "";
        data.restaurants.forEach(restaurant => {
          var cardText = document.createElement("p");
          cardText.setAttribute("data-info", `${restaurant.id}`);
          cardText.appendChild(document.createTextNode(restaurant.name));
          cardText.className = "card-text";
          cardItemsWrapper.appendChild(cardText);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Displays user's favourite collections
   * @param {*Collections Data} data
   */
  displayCollections(data) {
    console.log(data);
    let searchForm = document.getElementById("searchForm");

    let resultscontainer = document.getElementById("ResultContainer");
    resultscontainer.innerHTML = "";
    var totalitemsFound = data.length;
    if (totalitemsFound == 0) {
      var paraNode = getAParaNode(
        "Oops, Your search returned no results !!",
        "text-danger"
      );

      resultscontainer.appendChild(paraNode);
      return;
    } else {
      var paraNode = DomManager.getAParaNode(
        `${totalitemsFound} collections found. Showing ${totalitemsFound} only.`,
        "text-success"
      );
      resultscontainer.appendChild(paraNode);
    }

    let collectionContainer = document.getElementById("collectionContainer");
    document.getElementById("collectionContainer").innerHTML = "";
    data.forEach(dataItem => {
      var card = DomManager.getACard(
        dataItem.id,
        dataItem.title,
        dataItem.restaurants
      );
      collectionContainer.appendChild(card);
    });
    var collectionController = new CollectionController();
    collectionController.addDragability();
  }

  addDragability() {
    $(function() {
      $(".connectedSortable")
        .sortable({
          connectWith: ".connectedSortable",
          start: function(event, ui) {
            this.sourceCollectionId = ui.item[0].parentElement.getAttribute(
              "data-info"
            );
          },
          receive: function(event, ui) {
            var group = event.target;
            var resultRestaurants = [];
            event.target.childNodes.forEach(p => {
              resultRestaurants.push(p.getAttribute("data-info"));
            });
            ;
            var index = resultRestaurants.findIndex(function(item) {
              return item == ui.item[0].getAttribute("data-info");
            });
            window.targetPositionId = index;
          },
          stop: function(event, ui) {
            this.targetCollectionId = ui.item[0].parentElement.getAttribute(
              "data-info"
            );
            console.log("Source Collection id" + this.sourceCollectionId);
            this.collectionService = new CollectionService();
            ;
            var self = this;
            this.collectionService.UpdateCollections(
              this.sourceCollectionId,
              this.targetCollectionId,
              {
                id: ui.item[0].getAttribute("data-info"),
                name: ui.item[0].innerHTML
              },
              window.targetPositionId
            );
          }
        })
        .disableSelection();
    });
  }

  AddToCollection(dataItem) {
    let collectionContainer = document.getElementById("collectionContainer");
    var card = DomManager.getACard(
      dataItem.id,
      dataItem.title,
      dataItem.restaurants
    );
    collectionContainer.appendChild(card);
    $("#collectionModal").modal("toggle");
    var collectionController = new CollectionController();
    collectionController.addDragability();
  }
}
