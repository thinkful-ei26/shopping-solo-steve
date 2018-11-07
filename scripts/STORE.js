const STORE = (function () {
  
const addItem = function(name) {
  try {
    Item.validateName(name);
    this.items.push(Item.create(name));
  } catch (error) {
    console.log(error.message);
  }
};

const findAndToggleChecked = function(id) {
  const item = this.findById(id);
  item.checked = !item.checked;
};
const findById = function(id) {
  return this.items.find(element => element.id === id);
};

const findAndUpdateName = function(id, newName) {
  try {
    this.Item.validateName(newName);
    this.findById(id).name = newName;
  } catch (error) {
    console.log(error.message);
  }
};

const findAndDelete = function(id) {
  this.items = this.items.filter(item => item.id !== id);
};

const findAndUpdateName = function (id, name) {
try{
  Item.validateName(name)
  const item = this.findById(id)
  item.name = name
}
catch(e){
  console.log(e.message)
}
}

const toggleCheckedFilter = function() {
  this.hideCheckedItems = !this.hideCheckedItems;
};

function setSearchTerm(searchTerm) {
  this.searchTerm = searchTerm;
}

const setItemIsEditing = function(id, isEditing) {
  const item = this.findById(id)
  item.isEditing = isEditing
}
return {

  items: [
    { id: cuid(), name: 'Macbook Air', checked: false },
    { id: cuid(), name: 'Ipad Pro', checked: false },
    { id: cuid(), name: 'Airpads', checked: true },
    { id: cuid(), name: 'Tesla', checked: false }
  ],

  hideCheckedItems = false,
  searchTerm = '',
  

  addItem,
  findById,
  findAndToggleChecked,
  findAndDelete,
  findAndUpdateName,
  toggleCheckedFilter,
  setSearchTerm,
  setItemIsEditing,
};

})()