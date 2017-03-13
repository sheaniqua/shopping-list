/* ***FIRST SECTION***
An object that contains my application's state
*/
var state = {
  items: []
};

var listItemTemplate = (
  '<li>' + 
        '<span class="shopping-item js-shopping-item"></span>' +
        '<div class="shopping-item-controls">' +
          '<button class="js-shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="js-shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>'
)
/* ***SECOND SECTION - state management***
o=ne or more functions that modify state

These should take the state object as their first argument, 
and any additional data as additional arguments

*/
function addItem(state, item) {
  state.items.push({
    displayName: item,
    checkedOff: false
  })
}
 
function getItem(state, itemIndex) {
  console.log('get')
  return state.items[itemIndex];
}

function deleteItem (state, itemIndex) {
  console.log('delete')
  state.items.splice(itemIndex, 1);
}

function updateItem(state, itemIndex, newItemState) {
  console.log('update')
  state.items[itemIndex] = newItemState;
}
/* ***THIRD SECTION - DOM Manipulation***
Functions which render HTML into a DOM element. The HTML should reflect
the state. You should have a single function for each part of the page
which you want to update.

*/
function renderItem (item, itemId, itemTemplate, itemDataAttr) {
  var element = $(itemTemplate);
  element.find('.js-shopping-item').text(item.displayName);
  if(item.checkedOff) {
    element.find('.js-shopping-item').addClass('shopping-item__checked')
  }
  element.find('.js-shopping-item-toggle');
  element.attr(itemDataAttr, itemId);
  return element
}

function renderList (state, listElement, itemDataAttr) {
  var itemsHTML = state.items.map(function(item, index) {
    return renderItem(item, index, listItemTemplate, itemDataAttr)      
  });

  listElement.html(itemsHTML);
}



/* ***FOURTH SECTION event listeners***
House jQuery event listeners here. 

When an event fires, you should call one or more of your state modification 
functions to update the state appropriately, then call one or more of your 
render functions to make your DOM reflect the updated state.
*/

function handleItemAdds(formElement, newItemIdentifier, itemDataAttr, listElement, state) {
  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = formElement.find(newItemIdentifier).val();
    addItem(state, newItem);
    renderList(state, listElement, itemDataAttr);
    this.reset();
  });
}

function handleItemDeletes(formElement, removeIdentifier, itemDataAttr, listElement, state) {
  listElement.on('click', removeIdentifier, function(event) {
    var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
      deleteItem(state, itemIndex);
      renderList(state, listElement, itemDataAttr);
  })
}

function handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state) {
  listElement.on('click', toggleIdentifier, function(event) {
    var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
    var oldItem = getItem(state, itemId);

    updateItem(state, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    renderList(state, listElement, itemDataAttr)
  })
}


$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElement = $('.js-shopping-list');

  // from index.html -- it's the id of the input
  // containing shopping list items
  var newItemIdentifier = '#js-new-item';

  // from `listItemTemplate` at top of this file. for each
  // displayed shopping list item, we'll be adding a button
  // that has this class name on it
  var removeIdentifier = '.js-shopping-item-delete';

  // we'll use this attribute to store the id of the list item
  var itemDataAttr = 'data-list-item-id';

  //
  var toggleIdentifier = '.js-shopping-item-toggle'

  handleItemAdds(
    formElement, newItemIdentifier, itemDataAttr, listElement, state);
  handleItemDeletes(
    formElement, removeIdentifier, itemDataAttr, listElement, state);
  handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state);
});



















