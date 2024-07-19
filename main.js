import axios from 'axios';

const url = "https://tyradex.tech/api/v1/pokemon";

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('apiButton');
  const button2 = document.getElementById('myButton');
  const input = document.getElementById('myInput');
  const image = document.getElementById('imagePokemon');
  const type1 = document.getElementById('imageType1');
  const type2 = document.getElementById('imageType2');

  button2.addEventListener('click', () => {
    const value = input.value.trim(); // Récupère et nettoie la valeur de l'input

    if (!value) {
      alert('Please enter a valid Pokémon name or ID.');
      return;
    }

    const url2 = `${url}/${encodeURIComponent(value)}`; // Encode les caractères spéciaux dans l'URL

    console.log('Requesting URL:', url2); // Affiche la valeur dans la console

    axios.get(url2)
      .then(response => {
        console.log(response.data); // handle the data from the API
        if (response.data && response.data.sprites && response.data.sprites.regular) {
          image.hidden = false;
          image.src = response.data.sprites.regular;
          if (response.data.types.length === 2)
          {
            type1.hidden = false;
            type1.src = response.data.types[0].image;
            type2.hidden = false;
            type2.src = response.data.types[1].image;
          }
          else 
          {
            type1.hidden = false;
            type1.src = response.data.types[0].image;
            type2.hidden = true;
          }
        } else {
          alert('No image found for this Pokémon.');
        }
      })
      .catch(error => {
        console.error('There was an error with the second request!', error);
        alert('Error with the second request: ' + error.message);
      });
  });

});
