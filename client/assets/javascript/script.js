/** Select text input */
const textInput = document.getElementById('city');
let cityName = textInput.value;

/** When an input event is triggered update cityName */
textInput.addEventListener('input', (e) => {
  cityName = e.target.value;
});

/** Select our form */
const form = document.querySelector('form');

/** When form is submitted */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // make request to API
  axios.get(`http://localhost:3000/api/v1/weather/${cityName}`)
    .then(response => {
      // select elements
      let city = document.querySelector('.cityName');
      let celcius = document.querySelector('.celsius');
      let fahrenheit = document.querySelector('.fahrenheit');
      let errorMessage = document.querySelector('.error-message');
      console.log(response.data['temperature (C)']);

      if (response.data.city) {
        city.innerHTML = `City: ${response.data.city}`;
        celcius.innerHTML = `Temperatur (C): ${response.data['temperature (C)']}`;
        fahrenheit.innerHTML = `Temperatur (F): ${response.data['temperature (F)']}`;
        errorMessage.innerHTML = '';
      } else {
        errorMessage.innerHTML = `${response.data.error}`;
        city.innerHTML = ``;
        celcius.innerHTML = ``;
        fahrenheit.innerHTML = ``;
      }
    })
    .catch(error => console.log(error));

  textInput.value = '';
});