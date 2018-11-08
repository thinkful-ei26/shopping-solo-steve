const shoppingList = (function() {
  function generateItemElement(item) {
    const checkedClass = item.checked ? 'shopping-item__checked' : '';
    let itemTitle = `<span class="shopping-item ${checkedClass}">${
      item.name
    }</span>`;

    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
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
    const items = shoppingList.map(item => generateItemElement(item));
    return items.join('');
  }

  function render() {
    let items = [...STORE.items];
    if (STORE.error) {
      $('.error-message').html(STORE.error);
    }
    if (STORE.hideCompleted) {
      items = items.filter(item => !item.checked);
    }
    if (STORE.searchItem) {
      items = items.filter(item => item.name.includes(STORE.searchItem));
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
      $('.js-shopping-list-entry').val('');
      api.createItem(
        newItemName,
        item => {
          console.log('making a request to create an item');
          STORE.addItem(item);
          render();
        },
        error => {
          STORE.setError(error.responseJSON.message);
          render();
        }
      );
    });
  }

  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.updateItem(id, { checked: !STORE.findById(id).checked }, () => {
        STORE.findAndUpdate(id, { checked: !STORE.findById(id).checked });
        render();
      });
    });
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in STORE.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api.deleteItem(id, () => {
        STORE.findAndDelete(id);
        render();
      });
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

    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
})();
