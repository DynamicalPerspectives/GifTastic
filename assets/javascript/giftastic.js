// Giftastic js file. Note to self: For reference see this (i) 2017-03-20 Class Content files and (ii) http://stackoverflow.com/questions/41620816/giphy-api-how-do-i-search-for-giphs
var comedians = ["melissa mccarthy", "david cross", "sarah silverman", "stephen colbert", "samantha bee", "amy poehler", "tina fey", "julia louis-dreyfus", "tony hale", "aziz anzari", "nick offerman", "amy schumer"];

// this function (see below) creates buttons from the "comedians" array and from "comicEntered"
installComicButtons();

// creates new comic button at end of array.  "False return" keeps page from reloading per stackoverflow comment referenced above.
$("#addComic").on("click", function() {
    var comicEntered = $("#comicInput").val().trim();
    comedians.push(comicEntered);
    $("#comicInput").val("");
    installComicButtons();

    return false;
});

// searching from giphy API
$(document.body).on("click", ".button-list", function() {
    var comicName = $(this).data("comedian");
    var query = "https://api.giphy.com/v1/gifs/search?q=" + comicName + "&limit=10&api_key=dc6zaTOxFJmzC";
    $("#comedians").empty();
    $.ajax({
        url: query,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        for (i = 0; i < results.length; i++) {
            var newGif = $("<div class='col-sm-5'>");
            var rating = results[i].rating.toUpperCase();
            var p = $("<p>").html("Rating: " + rating);
            p.addClass("text-center");
            var img = $("<img>");
            // note to self: see 2017_03-20 "pausing gifs" folder for reference
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-clicked", "still");
            img.addClass("gif-margin gif center-block panel");

            newGif.append(p);
            newGif.append(img);

            $("#comedians").append(newGif);
            console.log(results);
        }
    });
});

// Function to click to animate and/or pause gifs:
$(document.body).on("click", ".gif", function() {
    var click = $(this).attr("data-clicked");
    if (click === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-clicked", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-clicked", "still");
    }
});

// Makes the buttons on page:
function installComicButtons() {
    $("#comicButtons").empty();
    for (var i = 0; i < comedians.length; i++) {
        var button = $("<button>").addClass("btn btn-primary button-list");
        button.attr("data-comedian", comedians[i]).html(comedians[i]);
        $("#comicButtons").append(button);
    }
}
// To do if time: Figure out way to remove individual buttons
