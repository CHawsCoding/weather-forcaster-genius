function getApi() {
  
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=ddb57c76a06132be7b16257a310c62d6';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });
}

getApi();