document.getElementById('addTableau').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
  });
  
  document.getElementById('close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
  });
  
  // Get the popup
var popup = document.getElementById('popup');

// When the user clicks anywhere outside of the popup content, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  } 
}

document.getElementById('addForm').addEventListener('submit', function(e) 
{
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const painter = document.getElementById('painter').value;
  const date = document.getElementById('date').value;
  const movement = document.getElementById('movement').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  // Vérification des champs obligatoires
  if(!title || !painter || !date || !movement || !description)
  {

      alert("Veuillez remplir tous les champs obligatoires (Titre, Peintre, Date, Mouvement, Description).");
      return;
  }
  
  // Générer l'URL de l'image
  let imageUrl = '';
  if(image){
      const reader = new FileReader();
      reader.onload = function (e) {
          imageUrl = e.target.result;
          createRow(imageUrl);
      };
      reader.readAsDataURL(image);
  }
  else {
      createRow(imageUrl);
  }
  
  function createRow(imageUrl) {
      const table = document.querySelector('table');
      const row = document.createElement('tr');
      
      row.innerHTML = `
  <td>${image ? `<img src="${imageUrl}" alt="">` : ''}</td>
  <td>${title}</td>
  <td>${painter}</td>
  <td>${date}</td>
  <td>${movement}</td>
  <td>${description}</td>
`;

      
      table.appendChild(row);
      alert('Le tableau a bien été ajouté.');
      popup.style.display = "none"
      
  }
});

document.getElementById('searchBar').addEventListener('input', function(e) {
  var filter = e.target.value.toUpperCase();  
  var trs = Array.from(document.querySelectorAll('table tr')); 
  var noResult = document.getElementById('noResult');

  // Exclure la première ligne (ligne d'en-tête)
  var dataRows = trs.slice(1);

  // Boolean pour vérifier s'il y a des résultats
  var hasResult = false;

  // Boucler sur toutes les lignes du tableau à partir de la deuxième ligne
  dataRows.forEach(function(tr) {
      var title = tr.querySelector('td:nth-child(2)').innerText.toUpperCase();  
      var painter = tr.querySelector('td:nth-child(3)').innerText.toUpperCase(); 
      var date = tr.querySelector('td:nth-child(4)').innerText.toUpperCase();  
      var movement = tr.querySelector('td:nth-child(5)').innerText.toUpperCase();  
      var description = tr.querySelector('td:nth-child(6)').innerText.toUpperCase();  

      if (title.indexOf(filter) > -1 || painter.indexOf(filter) > -1 || date.indexOf(filter) > -1 || movement.indexOf(filter) > -1 || description.indexOf(filter) > -1) {
          tr.style.display = "";
          hasResult = true; // Il y a au moins un résultat
      } else {
          tr.style.display = "none";
      }
  });

  // Afficher ou cacher le message "Aucun résultat"
  if (hasResult) {
      noResult.style.display = "none";
  } else {
      noResult.style.display = "block";
  }
});


// Mapping columns with their respective index
var columnsMap = {
  'none': 0,
  'Image': 1,
  'Titre': 2,
  'Peintre': 3,
  'Date': 4,
  'Mouvement': 5,
  'Description': 6
};

document.getElementById('sortBy').addEventListener('change', function(e) {
  var sortBy = e.target.value;
  var columnIndex = columnsMap[sortBy];

  if (columnIndex == undefined)
    return
  var trs = Array.from(document.querySelectorAll('table tr'));
  var dataRows = trs.slice(1); // Exclude the first tr
  var table = document.querySelector('table');

  dataRows.sort(function(a, b) {
      var aValue = a.querySelector(`td:nth-child(${columnIndex})`).innerText.toUpperCase();  
      var bValue = b.querySelector(`td:nth-child(${columnIndex})`).innerText.toUpperCase();  

      if (aValue < bValue) {
          return -1;
      }
      if (aValue > bValue) {
          return 1;
      }
      return 0;
  });

  dataRows.forEach(function(tr) {
      table.appendChild(tr);
  });
});

// Récupérer les éléments du tableau
const tableau = document.querySelector('table');
const lignes = tableau.querySelectorAll('tr');

// Diviser les lignes en groupes de 5
const lignesParPage = 5;
const indexLigne = 0; // Indice de la ligne d'index
let pageCourante = 1;

const diviserEnPages = () => {
  const debut = (pageCourante - 1) * lignesParPage;
  const fin = debut + lignesParPage;

  lignes.forEach((ligne, index) => {
    if (index === indexLigne || (index >= debut && index < fin)) {
      ligne.style.display = 'table-row';
    } else {
      ligne.style.display = 'none';
    }
  });
};

// Afficher la page courante initiale
diviserEnPages();

// Créer les boutons de pagination
const pagination = document.createElement('div');
pagination.classList.add('pagination');

const nombreDePages = Math.ceil((lignes.length - 1) / lignesParPage); // Exclure la ligne d'index

for (let i = 1; i <= nombreDePages; i++) {
  const bouton = document.createElement('button');
  bouton.innerText = i;

  bouton.addEventListener('click', () => {
    pageCourante = i;
    diviserEnPages();

    // Faire défiler jusqu'à l'élément avec l'id "top"
    document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
  });

  pagination.appendChild(bouton);
}

// Ajouter la pagination au conteneur
const container = document.querySelector('.container');
container.appendChild(pagination);
