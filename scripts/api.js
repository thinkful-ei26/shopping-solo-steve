const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/steve';

  const getItems = function(callback) {
    $.ajax({
      url: BASE_URL + '/items',
      method: 'GET',
      contentType: 'application/json',
      success: response => {
        callback(response);
        console.log(response);
      }
    });
  };

  const createItem = function(name, callback, error) {
    const newItem = JSON.stringify({
      name: name
    });
    $.ajax({
      url: BASE_URL + '/items',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: response => {
        callback(response);
      },
      error: response => {
        error(response);
      }
    });
  };

  const updateItem = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: response => {
        callback(response);
      }
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: response => {
        callback(response);
      }
    });
  };

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
})();
