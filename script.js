//Start coding
$(document).ready(function () {
    console.log("ready");

    //Creating a variable and the local stoarge that will store every city entered as well as the empty array. 
    var cityList = JSON.parse(localStorage.getItem("cityList")) || []

    //Print each city from the list in the local storage.
    cityList.forEach(city => printCity(city));

    //When page is reloaded, it shows the last entry of city on the list.  
    getWeather(cityList[cityList.length - 1]);

    $(".btn.btn-primary").on("click", function (event) {
        event.preventDefault();
        var city = $("#city-name").val();
        printCity(city);

        //It pushes every new city into a list setting into a local storage. 
        cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityList))
        getWeather(city);
    });

    //Creating a click function. Wheck clicked on a city anywhere on a document, it will get and show weather for that city. 
    $(document).on("click", ".city", function () {
        var city = $(this).text();
        getWeather(city);
    })

    //Creating a variable of listed items, adding a class and appending to the existing class of list-group.
    //By adding text(city), it will print the names of the cities. 
    function printCity(city) {
        var li = $("<li>").addClass("list-group-item city").text(city);
        $(".list-group").append(li);
    }

    function getWeather(city) {
        var apiKey = "13002b03031d9418e8a4593147cb8d89";

        //API call and result for current conditions.

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            dataType: "json",
            method: "GET",
            data: { q: city, appid: apiKey, units: "imperial" },

            success: function (data) {
                console.log(data);
                var forecast = "";

                forecast += "<p><b>" + data.name + " (" + new Date().toDateString() + ")</b><img src=\"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png\"></p>" +
                    " Temperature: " + data.main.temp + "&deg;F" + " | " + " Wind speed: " + data.wind.speed + " | Humidity: " + data.main.humidity + "%"

                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi",
                    dataType: "json",
                    method: "GET",
                    data: { appid: apiKey, ...data.coord },
                    success: function (data) {
                        console.log(data);
                        console.log(forecast);
                        forecast += " | " + "UVI: " + data.value

                        $("#current-section").html(forecast);
                    }
                })

                //API call for 5-day forecast.

                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast",
                    dataType: "json",
                    method: "GET",
                    data: { q: city, appid: apiKey, units: "imperial" },

                    success: function (data) {
                        console.log(data);
                        var forecastFive = "";

                        forecastFive += "<p><b>" + data.list[0].dt_txt + "</b><img src=\"https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png\"></p>" +
                            " Temperature: " + data.list[0].main.temp + "&deg;F" + " | " + " Humidity: " + data.list[0].main.humidity + "%"

                        forecastFive += "<p><b>" + data.list[8].dt_txt + "</b><img src=\"https://openweathermap.org/img/w/" + data.list[7].weather[0].icon + ".png\"></p>" +
                            " Temperature: " + data.list[8].main.temp + "&deg;F" + " | " + " Humidity: " + data.list[8].main.humidity + "%"

                        forecastFive += "<p><b>" + data.list[16].dt_txt + "</b><img src=\"https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png\"></p>" +
                            " Temperature: " + data.list[16].main.temp + "&deg;F" + " | " + " Humidity: " + data.list[16].main.humidity + "%"

                        forecastFive += "<p><b>" + data.list[24].dt_txt + "</b><img src=\"https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png\"></p>" +
                            " Temperature: " + data.list[24].main.temp + "&deg;F" + " | " + " Humidity: " + data.list[24].main.humidity + "%"

                        forecastFive += "<p><b>" + data.list[32].dt_txt + "</b><img src=\"https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png\"></p>" +
                            " Temperature: " + data.list[32].main.temp + "&deg;F" + " | " + " Humidity: " + data.list[32].main.humidity + "%"


                        //Results are printed in 5-Day Forecast.
                        $("#future-section").html(forecastFive);

                    }
                })
            }
        });
    }
})
