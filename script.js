//fct qui génère 25 éléments 
function generateFields(){
    //trouver l'élément parent 'field-parts' dans le document
    const element = document.querySelector("field-parts");
    //creer une boucle pour génerer 25 field parts
    for(let i = 0; i <25  ;i++){   //element.insertAdjacantElement() voir documentation mdn
        //creer un nouveau element 'field-parts'
        const newElement = document.createElement("field-part");
        //ajouter une classe CSS à un élément HTML
        newElement.classList.add("grass");
    
        element.appendChild(newElement);
    }
}
//appel de la fct lorsque la page a terminé son chargement
window.addEventListener("load", generateFields);



//creer une fonction qui attachera un gestionnaire d'événement "click" sur les outils sitiués à gauche de l'interface
function attachToolsEvent(){
    //selectionner tous les elements répresentant les outils
    const tools = document.querySelectorAll("tool"); 
    //fct qui gère le click sur un outil
    function onToolClick (event) {
        //désactiver tous les outils en retirant la classe 'active'
        tools.forEach(tool => {
            tool.classList.remove('active');
        });
        //activer l'outil cliqué en ajoutant la classe active
        event.currentTarget.classList.add('active');
    }


    //attacher l'evenement 'click' à chaque outil
    tools.forEach(tool => {
      tool.addEventListener('click' , onToolClick);
    });
}
//appel de la fct
document.addEventListener("DOMContentLoaded" ,attachToolsEvent);


function attachFieldEvent(){
    const fields = document.querySelectorAll('.field');
    const StockWheat = document.getElementById('stock-wheat');

    fields.forEach(field => {
        field.addEventListener('click', function() {
            //obtenir l'outil actif 
            const activeTool = document.querySelector('.tool.active');
            if (!activeTool) return; //si il n y a pas d'outil actif , ne rien faire
            //effectuer une action en fct de l'outil actif
            switch(activeTool.id){
                case 'tool-hoe':
                    field.classList.add('farmland');
                    field.classList.remove('grass');
                    break;
                case 'tool-water':
                    if (field.classList.contains('farmland')) {
                        field.classList.add('hydrated');
                    }
                    break;
                case 'tool-sow' :
                    if(field.classList.contains('farmland') && !field.dataset.seed){
                        field.dataset.seed = 1;
                    }
                    break;
                case 'tool-harvest' :
                    if (field.dataset.seed && field.dataset.seed === '7') {
                        StockWheat.textContent = parseInt(StockWheat.textContent) + 1;
                    }
                    field.dataset.seed = 0;
                    field.classList.remove('farmland' , 'hydrated');
                    break;
            }
        });
    });
}

//appel fct
document.addEventListener('DOMContentLoaded', attachFieldEvent);

