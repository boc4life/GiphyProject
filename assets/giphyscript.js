var actors = ["Jake Gyllenhaal", "Matt Damon", "Mindy Kaling", "Steve Carell", "Christoph Waltz", "Tom Hanks", "Kristen Wiig", "Kristen Bell", "Ben Affleck", "Will Smith", "Johnny Depp", "Channing Tatum", "Jennifer Lawrence", "Chris Pratt", "Meryl Streep"]

renderButtons();

$(".actor").on("click", function() {
    $("#gifContainer").empty();
    var selected = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=0742OzUohRpoQ5bmUOwg0CMML5V9z1M4&q=" + selected + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var m = 0; m < response.data.length; m++) {
        var gifDiv = $("<div>");
        var ratingSpan = $("<span>").text("Rating: " + response.data[m].rating);
        var imageURL = response.data[m].images["480w_still"].url;
        var image = $("<img src=" + imageURL + ">");
        $(gifDiv).append(ratingSpan);
        $(gifDiv).append("<br>");
        $(gifDiv).append(image);
        $("#gifContainer").append(gifDiv);
        }
    })
})

function renderButtons() {
    $("#buttonsDiv").empty();

    for (var i = 0; i < actors.length; i++) {
        var actorButton = $("<button>");
        actorButton.addClass("actor");
        actorButton.attr("data-name", actors[i]);
        actorButton.text(actors[i]);
        $("#buttonsDiv").append(actorButton);
    }
}

