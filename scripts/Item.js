const Item = (function() {
  const validateName = function(name) {
    if (!name) throw new TypeError('Cannot add empty items');
  };
  const create = function(name) {
    return {
      id: cuid(),
      name,
      checked: false
    };
  };
  return {
    validateName,
    create
  };
})();
