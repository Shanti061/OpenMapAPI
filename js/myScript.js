/* all our JS scripts for open weather in here */


var theButton = document.getElementById("myButton");

theButton.addEventListener("click",getWeather,false);

function getWeather(){
    
    var cityName = document.getElementById("locationName").value;
    //console.log(cityName);
    
    //this is the first line of AJAX Call
    var myRequest = new XMLHttpRequest();
    //console.log(myRequest);
    
    
    //need to remove samples and put api, add daily, add &cnt=7 for 7 days forecast
    var theAPICall = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&units=metric&appid=73241246e39ddcf6c2cb6de0459d5ef3&cnt=7";
    myRequest.open("GET", theAPICall , true);
    myRequest.send();
    
    myRequest.onload = function(){
       
        if(myRequest.readyState == 4 && myRequest.status == 200){
            
            var data = JSON.parse(myRequest.responseText);
            //console.log(data);
            
            /*document.getElementById("current").innerHTML = "CURRENT WEATHER"; */
            document.getElementById("fourdays").innerHTML = "THREE DAYS FORECAST"; 
            var D0=data.list[0].dt;
            var D1=data.list[1].dt;
            var D2=data.list[2].dt;
            var D3=data.list[3].dt;
            /*var D4=data.list[4].dt;*/
            /*var D5=data.list[5].dt;
            var D6=data.list[6].dt;*/
            
            var timestamp = [D0, D1, D2, D3];
            
            
            for (var i = 1; i<timestamp.length; i++){
                
                var weekDays = new Date(timestamp[i]*1000);
                var days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                var dayForecast = days[weekDays.getDay()];
                /*var forecastImage = "http://openweathermap.org/img/w/" +data.list[i].weather["0"].icon+ ".png";*/
                document.getElementById("weekdays").innerHTML += dayForecast + " " + " " + data.list[i].temp.day + "&deg; C" + " " +  "<img src = 'http://openweathermap.org/img/w/" + data.list[i].weather["0"].icon+ ".png'>" + data.list[i].weather["0"].description + "<p>";
                /*.list[2].weather["0"].icon*/
                
                
                /*document.getElementById("temperatureForecast").src += forecastImage + "<p>";*/
            }
            
            document.getElementById("place").innerHTML = data.city.name; 
            var weatherImage = "http://openweathermap.org/img/w/" +data.list["0"].weather["0"].icon+ ".png";
            
            document.getElementById("temperature").innerHTML = data.list["0"].temp.day+ "&deg; C";
            document.getElementById("imageToday").src = weatherImage;
            
            document.getElementById("highTemp").innerHTML = "&uarr;" +data.list[0].temp.max + "&deg; C" + "" + "" + "&darr;" + data.list[0].temp.min + "&deg; C"  + "<br><br>";
            
            
           /* document.getElementById("lowToday").innerHTML = "&darr;" + data.list[0].temp.min + "&deg; C" + "<br><br>";*/
            document.getElementById("dayDesc").innerHTML = data.list[0].weather[0].description + "<br><br>";
            console.log(data);
        }
        
    }
  reset();
}



function reset(){
    
    document.getElementById("temperature").innerHTML = " ";
    document.getElementById("imageToday").innerHTML = " ";
    document.getElementById("highTemp").innerHTML = " ";
    document.getElementById("lowTemp").innerHTML = " ";
    document.getElementById("dayDesc").innerHTML = " ";
    document.getElementById("weekdays").innerHTML = " ";
    
}