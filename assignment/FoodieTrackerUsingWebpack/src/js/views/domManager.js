import { Constants } from '../shared/constants';

const document = window.document;
class DomManager {
  static getAParaNode(text, className) {
    const paraElement = document.createElement('p');
    paraElement.className = className;
    const textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }

  static getACard(collectionId, title, restaurants) {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const editIcon = document.createElement('i');
    editIcon.className = 'far fa-edit';
    editIcon.style = 'float: right;';

    const cardItemsWrapper = document.createElement('div');

    cardItemsWrapper.className = 'connectedSortable';

    editIcon.addEventListener('click', () => {
      $('#collectionModal').modal('show');
      $('.search-fields').show();
      document.getElementById('collection-name').value = title;
      document
        .getElementById('collection-name')
        .setAttribute('data-info', `${collectionId}`);
      $('#update-collection').show();
      $('#add-collection').hide();
      $('#restaurant-name-search-fields').hide();

      const searchResultsPlaceholder = document.getElementById(
        'restaurants-container-modal',
      );
      searchResultsPlaceholder.innerHTML = '<label for="message-text" style="font-weight:bold;" class="col-form-label">Restaurants Selected: (Uncheck to remove)</label>';
      restaurants.forEach((restaurantItem) => {
        const divElement = document.createElement('div');
        const labelElement = document.createElement('label');
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('checked', 'checked');
        inputElement.className = 'restaurantCheckbox';
        inputElement.setAttribute(
          'value',
          `${restaurantItem.id}#${restaurantItem.name}`,
        );

        const textNode = document.createTextNode(`  ${restaurantItem.name}`);

        labelElement.appendChild(inputElement);
        labelElement.appendChild(textNode);
        divElement.appendChild(labelElement);
        searchResultsPlaceholder.appendChild(divElement);
      });
    });

    cardTitle.appendChild(editIcon);
    cardTitle.appendChild(document.createTextNode(title));
    card.className = 'card';
    cardBody.className = 'card-body';
    cardTitle.className = 'card-title';
    cardTitle.id = `card-title-${collectionId}`;

    cardBody.appendChild(cardTitle);
    cardItemsWrapper.setAttribute('data-info', `${collectionId}`);
    cardItemsWrapper.setAttribute('id', `restaurant-items-col-${collectionId}`);
    restaurants.forEach((restaurant) => {
      const cardText = document.createElement('p');
      cardText.setAttribute('data-info', `${restaurant.id}`);
      cardText.appendChild(document.createTextNode(restaurant.name));
      cardText.className = 'card-text';
      cardItemsWrapper.appendChild(cardText);
    });

    cardBody.appendChild(cardItemsWrapper);
    card.appendChild(cardBody);

    return card;
  }

  static cleanCollectionModal() {
    document.getElementById('restaurant-name-search').value = '';
    document.getElementById('collection-name').value = '';
    document.getElementById('restaurants-container-modal').innerHTML = '';
    $('#update-collection').hide();
    $('#add-collection').show();
    $('#collectionModal').modal('hide');
    $('#update-collection').hide();
    $('#restaurant-name-search-fields').show();
  }

  static getArrayOfObjects(datas) {
    const restultArrray = [];
    datas.forEach((item) => {
      restultArrray.push({ id: item.split('#')[0], name: item.split('#')[1] });
    });
    return restultArrray;
  }

  static getADetailedCard(title, image, restaurant) {
    const card = document.createElement('div');
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.setAttribute('alt', 'Card image cap');
    image = image || Constants.ZOMATO_DEFAULT_IMAGE;
    img.setAttribute('src', image);

    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardItemsWrapper = document.createElement('div');

    cardItemsWrapper.className = 'connectedSortable';
    cardTitle.appendChild(document.createTextNode(title));
    card.className = 'card';
    card.setAttribute('style', 'width: 23rem');
    cardBody.className = 'card-body';
    cardTitle.className = 'card-title';
    cardBody.appendChild(cardTitle);
    for (const property in restaurant) {
      const cardText = document.createElement('p');
      cardText.appendChild(
        document.createTextNode(`${property} : ${restaurant[property]}`),
      );
      cardText.className = 'card-text';
      cardItemsWrapper.appendChild(cardText);
    }
    cardBody.appendChild(cardItemsWrapper);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
  }
}

export default DomManager;
