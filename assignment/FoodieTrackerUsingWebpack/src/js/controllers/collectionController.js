import { Constants } from '../shared/constants';
import DomManager from '../views/domManager';
import { CollectionService } from '../services/collectionService';

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
      .then((data) => {
        console.log(data);
        this.displayCollections(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCollection(payload) {
    this.collectionService
      .addCollection(payload)
      .then((data) => {
        console.log(data);
        this.AddToCollection(data);
        DomManager.cleanCollectionModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCollection(payload) {
    this.collectionService
      .updateCollection(payload)
      .then((data) => {
        console.log(data);
        DomManager.cleanCollectionModal();
        document.getElementById(
          `card-title-${data.id}`,
        ).innerHTML = `<i class="far fa-edit" style="float: right;"></i>${
          data.title
        }`;
        const cardItemsWrapper = document.getElementById(
          `restaurant-items-col-${data.id}`,
        );
        cardItemsWrapper.innerHTML = '';
        data.restaurants.forEach((restaurant) => {
          const cardText = document.createElement('p');
          cardText.setAttribute('data-info', `${restaurant.id}`);
          cardText.appendChild(document.createTextNode(restaurant.name));
          cardText.className = 'card-text';
          cardItemsWrapper.appendChild(cardText);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Displays user's favourite collections
   * @param {*Collections Data} data
   */
  displayCollections(data) {
    console.log(data);
    let paraNode;
    const resultscontainer = document.querySelector('#ResultContainer');
    resultscontainer.innerHTML = '';
    const totalitemsFound = data.length;
    if (totalitemsFound == 0) {
      paraNode = getAParaNode(
        'Oops, Your search returned no results !!',
        'text-danger',
      );

      resultscontainer.appendChild(paraNode);
      return;
    }
    paraNode = DomManager.getAParaNode(
      `${totalitemsFound} collections found. Showing ${totalitemsFound} only.`,
      'text-success',
    );
    resultscontainer.appendChild(paraNode);

    const collectionContainer = document.getElementById('collectionContainer');
    document.getElementById('collectionContainer').innerHTML = '';
    data.forEach((dataItem) => {
      const card = DomManager.getACard(
        dataItem.id,
        dataItem.title,
        dataItem.restaurants,
      );
      collectionContainer.appendChild(card);
    });
    const collectionController = new CollectionController();
    collectionController.addDragability();
  }

  addDragability() {
    $(() => {
      $('.connectedSortable')
        .sortable({
          connectWith: '.connectedSortable',
          start(event, ui) {
            this.sourceCollectionId = ui.item[0].parentElement.getAttribute(
              'data-info',
            );
          },
          receive(event, ui) {
            const group = event.target;
            const resultRestaurants = [];
            event.target.childNodes.forEach((p) => {
              resultRestaurants.push(p.getAttribute('data-info'));
            });

            const index = resultRestaurants.findIndex(
              item => item === ui.item[0].getAttribute('data-info'),
            );
            window.targetPositionId = index;
          },
          stop(event, ui) {
            this.targetCollectionId = ui.item[0].parentElement.getAttribute(
              'data-info',
            );
            console.log(`Source Collection id${this.sourceCollectionId}`);
            this.collectionService = new CollectionService();

            const self = this;
            this.collectionService.UpdateCollections(
              this.sourceCollectionId,
              this.targetCollectionId,
              {
                id: ui.item[0].getAttribute('data-info'),
                name: ui.item[0].innerHTML,
              },
              window.targetPositionId,
            );
          },
        })
        .disableSelection();
    });
  }

  AddToCollection(dataItem) {
    const collectionContainer = document.getElementById('collectionContainer');
    const card = DomManager.getACard(
      dataItem.id,
      dataItem.title,
      dataItem.restaurants,
    );
    collectionContainer.appendChild(card);
    $('#collectionModal').modal('toggle');
    const collectionController = new CollectionController();
    collectionController.addDragability();
  }
}
