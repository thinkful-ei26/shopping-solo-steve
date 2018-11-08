$(document).ready(function() {
  shoppingList.bindEventListeners();

  api.getItems(items => {
    console.log('in get items the first time');
    items.forEach(item => STORE.addItem(item));
    shoppingList.render();
  });
});
