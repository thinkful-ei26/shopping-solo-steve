const shoppingList = (function() {
  function generateItemElement(item) {
    return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${
          item.checked ? 'shopping-item__checked' : ''
        }">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }

  function generateShoppingItemsString(shoppingList) {
    console.log('Generating shopping list element');
    const items = shoppingList.map(item => generateItemElement(item));
    return items.join('');
  }

  function render() {
    // render the shopping list in the DOM
    console.log('`renderShoppingList` ran');

    let items = STORE.items;
    if (STORE.hideCompleted) {
      //If hidecompleted is checked then filter out all the checked items
      items = STORE.items.filter(item => !item.checked);
    }
    if (STORE.searchItem) {
      //if the search bar is not empty then filter the results to be the searched string
      items = STORE.items.filter(item => item.name.includes(STORE.searchItem));
    }
    const shoppingListItemsString = generateShoppingItemsString(items);
    $('.js-shopping-list').html(shoppingListItemsString);
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function(event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      STORE.addItem(newItemName);
      render();
    });
  }

  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      STORE.findAndToggleChecked(id);
      render();
    });
  }

  function setSearchTerm(val) {
    STORE.searchTerm = val;
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in STORE.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      STORE.findAndDelete(id);
      // render the updated shopping list
      render();
    });
  }

  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget)
        .find('.shopping-item')
        .val();
      STORE.findAndUpdateName(id);
      render();
    });
  }

  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      STORE.toggleCheckedFilter();
      render();
    });
  }

  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      setSearchTerm(val);
      render();
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
