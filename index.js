const STORE = {
  items: [
    { name: 'Macbook Air', checked: false },
    { name: 'Ipad Pro', checked: false },
    { name: 'Airpads', checked: true },
    { name: 'Tesla', checked: false }
  ],
  hideCompleted: false,
  searchItem: null
};

function generateItemElement(item, itemIndex) {
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

  const items = shoppingList.map((item, index) =>
    generateItemElement(item, index)
  );

  return items.join('');
}

function renderShoppingList() {
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

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ name: itemName, checked: false });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

// handle edit items
function editItems() {
  $('.js-shopping-list').on('click', '.js-shopping-item ', event => {
    console.log('item Ready to Edit');
    //make form
    // then update
  });
}

//TogglecheckedListItem
function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function handleCheckboxHidingItemsClicked() {
  $('.checkbox').on('click', event => {
    console.log('checkbox hiding items ran');
    STORE.hideCompleted = !STORE.hideCompleted;
    renderShoppingList();
  });
}
function handleSearch() {
  $('#js-searchbox-form').on('keyup', event => {
    console.log('key was pressed');
    STORE.searchItem = $('.js-shopping-list-search').val();
    console.log(STORE.searchItem);
    renderShoppingList();
  });
}
//Delete Item
function deleteItem(itemIndex) {
  console.log(`Deleting item at index ${itemIndex}`);
  // console.log(STORE[itemIndex])
  STORE.items.splice(itemIndex, 1);
}
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('handleItemDelete ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckboxHidingItemsClicked();
  handleSearch();
  editItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
