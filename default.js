// This used to use jQuery, but was rewritten in plan DOM for speed and to get rid of the jQuery dependency.
 
function addExpandCollapse() {
  // Click handler for collapsing and expanding objects and arrays
  function collapse(collapser) {
    //var collapser = evt.target;
   
    var target = collapser.parentNode.getElementsByClassName('collapsible');
    
    if ( ! target.length ) {
      return;
    }
    
    target = target[0];

    if ( target.style.display == 'none' ) {
      var ellipsis = target.parentNode.getElementsByClassName('ellipsis')[0];
      target.parentNode.removeChild(ellipsis);
      target.style.display = '';
      collapser.innerHTML = '-';
    } else {
      target.style.display = 'none';
      
      var ellipsis = document.createElement('span');
      ellipsis.className = 'ellipsis';
      ellipsis.innerHTML = ' &hellip; ';
      target.parentNode.insertBefore(ellipsis, target);
      collapser.innerHTML = '+';
    }
  }

  function collapseEvent(evt) {
    collapse(evt.target);
  }
  
  function addCollapser(item) {
    // This mainly filters out the root object (which shouldn't be collapsible)
    if ( item.nodeName != 'LI' ) {
      return;
    }
    
    var collapser = document.createElement('div');
    collapser.className = 'collapser';
    collapser.innerHTML = '-';
    collapser.addEventListener('click', collapseEvent, false);
    item.insertBefore(collapser, item.firstChild);
    // GOTCHA: This will collapse all the collapsible elements initially,
    // comment out this line if you'd rather have all elements expanded
    // initially.
    collapse(collapser);
  }
  
  var items = document.getElementsByClassName('collapsible');
  for( var i = 0; i < items.length; i++) {
    addCollapser(items[i].parentNode);
  }
}

document.addEventListener('DOMContentLoaded', addExpandCollapse, false);
