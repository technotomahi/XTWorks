import { Constants } from "../shared/constants";
import { DomManager } from "../shared/domManager";
import { CollectionService } from "../services/collectionService";
export class CollectionController {
  constructor() {
    this.collectionService = new CollectionService();
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

/**
* Displays user's favourite collections
* @param {*Collections Data} data 
*/
  displayCollections(data) {
    console.log(data);
    let searchForm = document.getElementById("searchForm");

    //searchForm.className("hide");
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
      var card = DomManager.getACard(dataItem.title, dataItem.restaurants);
      collectionContainer.appendChild(card);
    });
  }

  AddToCollection(dataItem) {
    let collectionContainer = document.getElementById("collectionContainer");
    var card = DomManager.getACard(dataItem.title, dataItem.restaurants);
    collectionContainer.appendChild(card);
    $('#collectionModal').modal('toggle')
  }




}


