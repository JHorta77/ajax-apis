$(document).ready(function () {

    var teams = ["Boston Bruins", "New England Patriots", "Boston Red Sox", "Boston Celtics"];

    function showGifButtons() {
        console.log(teams);
        $("#team-buttons").empty();
        for (i = 0; i < teams.length; i++) {
            var tb = $("<button>");
            tb.addClass("team-button");
            tb.attr("data-type", teams[i]);
            tb.text(teams[i]);
            $("#team-buttons").append(tb);
            //$("#team-buttons").append("<button class=btn btn-success' data-team'" + teams[i] + "'>" + teams[i] + "</button>");
        }
    }
    showGifButtons();

    $("#add-team").on("click", function () {
        event.preventDefault();
        var team = $("#team-input").val();
        teams.push(team);
        showGifButtons();

    });

    $(document).on('click', '.team-button', function () {
        var team = $(this).attr("data-type");
        console.log(team);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + '&api_key=Ix1raiCGZ0fEifNhIWfEVTp545KoT9dU&limit=10&offset=0&rating=PG&lang=en';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var response = response.data;
            console.log(response);
            $("#teams").empty();
            for (var i = 0; i < response.length; i++) {
                var teamDiv = $("<div>");
                var p = $("<p>").text("Rating:" + response[i].rating);
                var teamImg = $("<img>");

                teamImg.attr("src", response[i].images.original_still.url);
                teamImg.attr("data-still", response[i].images.original_still.url);
                teamImg.attr("data-animate", response[i].images.original.url);
                teamImg.attr("data-state", "still");
                teamImg.addClass("gif-img");
                teamDiv.append(p);
                teamDiv.append(teamImg);
                $("#teams").append(teamDiv);
            }
        });
    });

    $(document).on("click", ".gif-img", function () {
        console.log("works");
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    });


});

