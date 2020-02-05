//Start coding

$(document).ready(function () {
    console.log("ready");

    //Click button

    $(".btn.btn-primary").on("click", function (event) {
        event.preventDefault();
        var city = $("#city-name").val();
        var apiKey = "13002b03031d9418e8a4593147cb8d89";

        console.log("#city-name");

        //API call and result for current conditions.

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            dataType: "json",
            method: "GET",
            data: { q: city, appid: apiKey, units: "imperial" },

            success: function (data) {
                console.log(data);
                var forecast = "";

                forecast += "<p><b>" + data.name + " (" + new Date().toDateString() + ")</b><img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\"></p>" +
                    data.main.temp + "&deg;F" + " | " + data.weather[0].main + ", " + data.weather[0].description + " | humidity: " + data.main.humidity + "%"
            
                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi",
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

            }

        });
    });
})
