import axios from 'axios';

const url = "https://tyradex.tech/api/v1/pokemon";

document.addEventListener('DOMContentLoaded', () => {
  console.log("Ready !!!!!")
  const input = document.getElementById('myInput');
  const name = document.getElementById('nom');
  const image = document.getElementById('imagePokemon');
  const nPokedex = document.getElementById('numeroPokedex');

  if (!input || !image) {
    console.error('Un ou plusieurs éléments requis sont manquants.');
    return;
  }

  input.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key); // Vérifiez que l'événement est correctement capturé
    
    if (event.key === 'Enter') {
      const value = input.value.trim(); // Récupère et nettoie la valeur de l'input

      if (!value) {
        alert('Please enter a valid Pokémon name or ID.');
        return;
      }

      const url2 = `${url}/${encodeURIComponent(value)}`; // Encode les caractères spéciaux dans l'URL

      console.log('Requesting URL:', url2); // Affiche la valeur dans la console
      image.src='images/cergle.gif'
      axios.get(url2)
        .then(response => {
          console.log('API response:', response.data); // Inspectez la réponse de l'API
          
          if (response.data && response.data.sprites && response.data.sprites.regular) {
            name.innerText = response.data.name.fr;
            image.hidden = false;
            image.src = response.data.sprites.regular;
            nPokedex.innerText = response.data.pokedex_id;
          } else {
            alert('No image found for this Pokémon.');
          }
        })
        .catch(error => {
          console.error('There was an error with the request!', error);
          alert('Error with the request: ' + error.message);
        });
    }
  });
});
