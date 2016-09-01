(function() {
   var elem = document.createElement('input');
   elem.setAttribute('type', 'date');

   if ( elem.type === 'text' ) {
      $('#date').datepicker();
   }
})();
