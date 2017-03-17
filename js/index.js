 $(document).ready( function(){
   
 // Getting weather from user location input on Enter 
  $("input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        var city = "q=" + $("input[name=city]").val();
        apiURL= URL + city + apiKey;
        getWeather(apiURL);
    }
});
 
// Getting weather from user location input on button click  
   
/*  $("button").click( function (){
  var city = "q=" + $("input[name=city]").val();
  apiURL= URL + city + apiKey;
  getWeather(apiURL);
  });
}
); */
   
});   

// Declaring global variables
  var latitude = "lat=";
  var longitude = "&lon=";
  var apiKey="&appid=dce2a724ae32446ea18dafa489909aea";
  var URL = "http://api.openweathermap.org/data/2.5/weather?";
  var temperature = 0;
  
// Check to see if this browser supports geolocation  

if (navigator.geolocation) {

  function positionFound(position) {
    latitude += position.coords.latitude;
    longitude += position.coords.longitude;
    apiURL =  URL + latitude + longitude + apiKey;
    getWeather(apiURL);
  };

  // Get the location of the user's browser using the native geolocation service
  
navigator.geolocation.getCurrentPosition(positionFound);

  }

function getWeather(apiURL) {
  // Api request
  
  $.ajax({
      url: apiURL,  
      dataType: "jsonp",
      data: {
        units: "metric"       
     },
    // Passing the weather parameters to document in case of successful request
      success: function(data) {
      $("#city").html(data.name+", " + data.sys.country);
      temperature = Math.round(data.main.temp);  
      $("#temp").html(temperature);
      $("#desc").html(data.weather[0].description.toLowerCase());
      icon = data.weather[0].icon;
      getScene(icon);  
          }
    }
  );
};

// Displaying weather scene for corresponding weather icon id

function getScene(icon) {
  // merging some weather cases:
  // cloudy night
  if (icon=="04n" || icon=="02n") icon="03n";
  // cloudy day
  if ( icon=="03d" || icon=="04d") icon="02d";
  // rainy day
  if ( icon=="09d") icon="10d";
  // rainy night
  if ( icon=="09n") icon="10n";
  var url="http://tildedagger.com/portfolio/" + icon + ".png";
  $("#icon").html("<img src=" + url + " />");
}

// Temperature conversion functions

function toFahrenheit(){
   temperature = Math.round((temperature * 1.8) + 32);
   $("#temp").html(temperature);
}

function toCelsius(){
   temperature = Math.round((temperature - 32) / 1.8);
   $("#temp").html(temperature);
}

// Toggling temperature units

$("#metric").click(function(){
  if (!($("#metric").hasClass("active"))){
    $("#metric").addClass("active");
    $("#imperial").removeClass("active");
    toCelsius();
  }
});

$("#imperial").click(function(){
    if (!($("#imperial").hasClass("active"))){
    $("#imperial").addClass("active");
    $("#metric").removeClass("active");
    toFahrenheit();
    }
});

// Displaying date
var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();