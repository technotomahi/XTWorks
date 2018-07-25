For running the json server run this command at the roor of the directory

>json-server --watch db.json --port 3004




APP REDUCER CALLS
/*
state = appReducers(state, {
  type: ReduxConstants.ADD_RESTAURANTS, 
  payload: {
    name: "Neq name1",
    title: "Title of the restaurant1"
  }
})

state = appReducers(state, {
  type: ReduxConstants.ADD_RESTAURANTS, 
  payload: {
    name: "Neq name 2",
    title: "Title of the restaurant2"
  }
})


state = appReducers(state, {
  type: ReduxConstants.DETAIL_RESTAURANT, 
  payload: {
    name: "Detai Restaurant detail",
    title: "Title of the Detail restaurant"
  }
})

state = appReducers(state, {
  type: ReduxConstants.CURRENT_VIEW, 
  payload: "RestaurantDetail"
})

*/




function createRestaurantCard(food) {
  const foodCard = createHTMLElement(`
  <div class="card" style="width: 23rem">
    <img class="card-img-top" alt="Card image cap" src="https://b.zmtcdn.com/data/pictures/9/53449/1926b6522d6ae29425546ec43dc3cd17.jpg?fit=around%7C200%3A200&amp;crop=200%3A200%3B%2A%2C%2A">
    <div class="card-body">
      <h5 class="card-title">Sri Udupi Park</h5>
      <div class="connectedSortable">
        <p class="card-text">Average cost for two : ${
  food.average_cost_for_two
}</p>
        <p class="card-text">Phone Numbers : ${food.contact}</p>
        <p class="card-text">Name : Sri Udupi Park</p><p class="card-text">Address : 25/1, NR Chambers, Old Airport Road, Bangalore</p>
        <p class="card-text">Rating : 3.2</p>
        </div>
    </div>
  </div>
  `);

  const addButton = foodCard.querySelector('button');
  addButton.addEventListener('click', () => {});

  return foodCard;
}
createRestaurantCard();