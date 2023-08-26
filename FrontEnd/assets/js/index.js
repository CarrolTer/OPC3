/***********************************************************************************************
* Appel à l'API (Fetch) + récupération des travaux (getWorks) + les catégories (getCategories) *
***********************************************************************************************/

/*lien de l'API*/
const url = "http://localhost:5678/api";
const galleryHtml = document.querySelector("#projets");

let works;
let categories;

const getWorks = async function () {
    let rep = await fetch(`${url}/works`);
    return rep.json();
};
works = await getWorks();

// Fonction globale genererWorks pour la mise à jour des travaux dans la galerie
const show_works = function (works) {
  galleryHtml.innerHTML = "";

  for (let jsonWork of works) {
    galleryHtml.innerHTML += `<figure>
      <img src="${jsonWork.imageUrl}" alt="${jsonWork.title}">
      <figcaption>${jsonWork.title}</figcaption>
      </figure>`;
      // console.log(jsonWork.title);
  
  }
};
show_works(works);

const getCategories = async function() {
  const res = await fetch(`${url}/categories`);
  let data_cat = await res.json();
  console.log(data_cat);

  // Crée un bouton pour afficher tous les projets;
  const boutonTous = document.createElement("button");
  boutonTous.innerText = "Tous";
  // Rattache le bouton à son parent HTML;
  document.getElementById("filtre-categories").appendChild(boutonTous);

  // Boucle qui parcourt le tableau des catégories;
  for (let i = 0; i < data_cat.length; i++) {
    const elFiltreCategories = document.getElementById("filtre-categories");

    const categorie = data_cat[i];

    // Crée les boutons filtre en fonction de leur nom;
    const boutonFiltre = document.createElement("button");
    // Ajoute le nom de la categorie du backend ainsi que son id
    boutonFiltre.innerText = categorie.name;
    boutonFiltre.dataset.catid = categorie.id;
    // Rattache les boutons filtre à leur parent HTML;
    elFiltreCategories.appendChild(boutonFiltre);
  }

};
categories = await getCategories();

// Événement au click pour filtrer les works en fonction de leur catégorie
let boutonsFiltre = document.querySelectorAll("#filtre-categories button");
for (let boutonFiltre of boutonsFiltre) {
  boutonFiltre.addEventListener("click", function () {
    const thisButton = this;
    console.log(thisButton);
    const worksFiltres = works.filter(function (workCat) {
      
      if (!thisButton.dataset.catid) {
        // Si bouton TOUS
        return true; // Garde ce work
      } else if (workCat.category.id == thisButton.dataset.catid) {
        // Si autre bouton : Garde si la cat du Works correspond à la cat du bouton
        return true; // Garde ce work
      
      }
    });
    console.log(worksFiltres);
    // Appel à la fonction qui régénère les works (en vidant d'abord le contenu de la galerie pour ensuite n'afficher que les works liés au click)
    show_works(worksFiltres);
  });
}