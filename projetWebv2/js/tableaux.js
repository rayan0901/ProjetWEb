document.addEventListener("DOMContentLoaded", function() {

    // Récupérer tous les éléments avec la classe 'tableauArt'
    var tableaux = document.querySelectorAll('.tableauArt');
    var popup = document.getElementById('popup');
  
    // Ajouter un écouteur d'événements à chaque élément
    tableaux.forEach(function(tableau) {
        tableau.addEventListener('click', function() {
            showPopup(tableau);
        });
    });
  
    // Cacher la popup lorsque vous cliquez en dehors de celle-ci
    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            hidePopup();
        }
    });
    
    function showPopup(tableau) {
        document.getElementById('popupTitre').innerText = tableau.querySelector('.titretableau').innerText;
        document.getElementById('popupPeintre').innerText = tableau.querySelector('.Peintre').innerText;
        document.getElementById('popupDate').innerText = tableau.querySelector('.dateTableau').innerText;
        document.getElementById('popupImage').src = tableau.querySelector('.tableauPhoto').src;
        popup.style.display = 'block';
    }
    
    function hidePopup() {
        popup.style.display = 'none';
    }
  
  });
  