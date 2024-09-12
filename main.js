import axios from 'axios';

const url = "https://tyradex.tech/api/v1/pokemon";

document.addEventListener('DOMContentLoaded', () => {
  console.log("Ready !!!!!")
  const input = document.getElementById('myInput');
  const name = document.getElementById('nom');
  const image = document.getElementById('imagePokemon');
  const nPokedex = document.getElementById('numeroPokedex');
  const trait = document.getElementById('trait');
  const type1 = document.getElementById('Type1');
  const type2 = document.getElementById('Type2');
  const poids = document.getElementById('poids');
  const taille = document.getElementById('taille');
  const titreType = document.getElementById('titreType');
  const gen = document.getElementById('gen');
  const evolve = document.getElementById('evolve');
  const other = document.getElementById('other');
  const principal = document.getElementById('principal');
  const evolution = document.getElementById('evolution');
  const imageEvo1 = document.getElementById('imageEvo1');
  const textEvo1 = document.getElementById('textEvo1');
  const imageEvo2 = document.getElementById('imageEvo2');
  const textEvo2 = document.getElementById('textEvo2');
  const divEvo1 = document.getElementById('evo1');
  const divEvo2 = document.getElementById('evo2');
  var res = null;

  if (!input || !image) {
    console.error('Un ou plusieurs éléments requis sont manquants.');
    return;
  }

  input.addEventListener('keydown', (event) => {
    //console.log('Key pressed:', event.key); // Vérifiez que l'événement est correctement capturé
    
    if (event.key === 'Enter') {
      const value = input.value.trim(); // Récupère et nettoie la valeur de l'input

      if (!value) {
        alert('Please enter a valid Pokémon name or ID.');
        return;
      }

      const url2 = `${url}/${encodeURIComponent(value)}`; // Encode les caractères spéciaux dans l'URL

      //console.log('Requesting URL:', url2); // Affiche la valeur dans la console
      image.src='images/cergle.gif'
      axios.get(url2)
        .then(response => {
          console.log('API response:', response.data); // Inspectez la réponse de l'API
          res = response
          if (response.data && response.data.sprites && response.data.sprites.regular) {
            name.innerText = response.data.name.fr;
            image.hidden = false;
            image.src = response.data.sprites.regular;
            nPokedex.innerText = response.data.pokedex_id;
            if (response.data.types.length === 2)
            {
              titreType.innerText = "Types: "
              trait.hidden = false;
              type1.src = response.data.types[0].image;
              type2.src = response.data.types[1].image;
              type2.hidden = false;
              type1.hidden = false;
            }
            else
            {
              titreType.innerText = "Type: "
              trait.hidden = true;
              type1.src = response.data.types[0].image;
              type2.hidden = true;
              type1.hidden = false;
            }
            poids.innerText = response.data.weight;
            taille.innerText = response.data.height;
          } else {
            alert('No image found for this Pokémon.');
          }
          if (response.data.evolution.next && response.data.evolution.next.length === 1)
          {
            var url3 = `${url}/${response.data.evolution.next[0].name}`
            console.log(url3)
            axios.get(url3).then(response2 => {
              console.log(response2);
              imageEvo1.src = response2.data.sprites.regular;
            })
            textEvo1.innerText = response.data.evolution.next[0].name
            divEvo1.removeAttribute("hidden")
          }
          else if (response.data.evolution.next && response.data.evolution.next.length === 2)
          {
            var url3 = `${url}/${response.data.evolution.next[0].name}`
            axios.get(url3).then(response2 => {
              imageEvo1.src = response2.data.sprites.regular;
            })
            textEvo1.innerText = response.data.evolution.next[0].name;
            divEvo1.removeAttribute("hidden");
            var url4 = `${url}/${response.data.evolution.next[1].name}`
            axios.get(url4).then(response2 => {
              imageEvo2.src = response2.data.sprites.regular;
            })
            textEvo2.innerText = response.data.evolution.next[1].name
            divEvo2.removeAttribute("hidden");
          }
          else
          {
            divEvo1.setAttribute("hidden", true);
            divEvo2.setAttribute("hidden", true);
          }
        })
        .catch(error => {
          console.error('There was an error with the request!', error);
          alert('Error with the request: ' + error.message);
        });
    }
  });

  gen.addEventListener('click', (event) => {
    principal.removeAttribute('hidden');
    evolution.setAttribute('hidden', 'true');
  });

  evolve.addEventListener('click', (event) => {
    console.log(res)
    principal.setAttribute('hidden', 'true');
    evolution.removeAttribute('hidden');
  })

  other.addEventListener('click', (event) => {
    principal.setAttribute('hidden', 'true');
    evolution.setAttribute('hidden', 'true');
  })
});
