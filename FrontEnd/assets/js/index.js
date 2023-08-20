/***********************************************************************************************
* Appel à l'API (Fetch) + récupération des travaux (getWorks) + les catégories (getCategories) *
***********************************************************************************************/

/*lien de l'API*/
const url = "http://localhost:5678/api";

// fetch(`${url}/works`)
//   .then (reponse => {
//     return reponse.json();
//   })
//   .then((works) => {
//     const sectionGallery = document.querySelector(".gallery");

//     works.forEach((work) => {
//       sectionGallery.innerHTML += `<figure>
//       <img src="${work.imageUrl}" alt="${work.title}">
//       <figcaption>${work.title}</figcaption>
//       </figure>`;
//     })
//   });

// fetch(`${url}/categories`)
//   .then (reponse => {
//     return reponse.json();
//   })
//   .then((categories) => {
//     // Boucle qui parcourt le tableau des catégories;
//   for (let i = 0; i < categories.length; i++) {
//     const elFiltreCategories = document.getElementById("filtre-categories");

//     const categorie = categories[i];

//     // Crée les boutons filtre en fonction de leur nom;
//     const boutonFiltre = document.createElement("button");
//     // Ajoute le nom de la categorie du backend ainsi que son id
//     boutonFiltre.innerText = categorie.name;
//     boutonFiltre.dataset.catid = categorie.id;
//     // Rattache les boutons filtre à leur parent HTML;
//     elFiltreCategories.appendChild(boutonFiltre);
//   }
  
//   })

// Variable qui stockera les travaux, une autre pour les catégories
let getWorks;
let getCategories;

// On selectionne la class pour afficher la galerie des travaux
const galleryHtml = document.querySelector(".gallery");

// Récupère les works de l'API avec une fonction asynchrone
const works = async function() {
  try {
    return (await fetch(`${url}/works`)).json();
  } catch (error) {
    alert("Une erreur est survenue, veuillez réessayer ultérieurement", error);
  }
};
// Récupère le tableau des works en les stockant dans la variable getWorks
getWorks = await works();

// Récupère les catégories de l'API avec une fonction asynchrone
const categories = async function() {
  try {
    return (await fetch(`${url}/categories`)).json();
  } catch (error) {
    alert("Une erreur est survenue", error);
  }
};
// Récupère le tableau des catégories en les stockant dans la variable getCategories
getCategories = await categories();

//------------------------------------------------------------------------------------------//
//-------------------- Création et affichage de la galerie des projets ---------------------//

const getData = function (getWorks) {

// clean le body, au refresh auto de la page si clique sur filtre
  galleryHtml.innerHTML = "";

  // Affichage des works à l'aide d'une boucle
  for (let work of getWorks) {
    galleryHtml.innerHTML += `<figure>
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
      </figure>`;
  }
};
getData(getWorks);

//-----------------------------------------------------------------------------------------//
//-------------------------- Création, affichage et utilisation des Filtres ----------------------------//

// Crée un bouton pour afficher tous les projets;
const buttonAll = document.createElement("button");
buttonAll.innerText = "Tous";
// Rattache le bouton à son parent HTML;
document.getElementById("filtre-categories").appendChild(buttonAll);

// Boucle qui parcourt le tableau des catégories;
for (let i = 0; i < getCategories.length; i++) {
  const filter_categorie = document.getElementById("filtre-categories");

  const categorie = getCategories[i];

  // Crée les boutons filtre en fonction de leur nom;
  const buttonFilter = document.createElement("button");
  // Ajoute le nom de la categorie du backend ainsi que son id
  buttonFilter.innerText = categorie.name;
  buttonFilter.dataset.catid = categorie.id;
  // Rattache les boutons filtre à leur parent HTML;
  filter_categorie.appendChild(buttonFilter);
}

// Événement au click pour filtrer les works en fonction de leur catégorie
let buttonFilters = document.querySelectorAll("#filtre-categories button");
for (let buttonFilter of buttonFilters) {
  buttonFilter.addEventListener("click", function () {
    const thisButton = this;
    const worksFiltres = getWorks.filter(function (workCat) {
      if (!thisButton.dataset.catid) {
        // Si bouton TOUS
        return true; // Garde ce work
      } else if (workCat.category.id == thisButton.dataset.catid) {
        // Si autre bouton : Garde si la cat du Works correspond à la cat du bouton
        return true; // Garde ce work
      }
    });
    // Appel à la fonction qui régénère les works
    getData(worksFiltres);
  });
}