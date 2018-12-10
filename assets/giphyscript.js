var actors = ["Jake Gyllenhaal", "Matt Damon", "Mindy Kaling", "Steve Carell", "Christoph Waltz", "Tom Hanks", "Kristen Wiig", "Kristen Bell", "Ben Affleck", "Will Smith", "Johnny Depp", "Channing Tatum", "Jennifer Lawrence", "Chris Pratt", "Meryl Streep"]

renderButtons();

$("#submitButton").on("click", function() {
    var newActor = $("#formInput").val();
    actors.push(newActor);
    renderButtons();
})

function displayGifs() {
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
        var imageURL = response.data[m].images.original_still.url;
        var image = $("<img src=" + imageURL + ">");
        $(image).attr("data-still", imageURL);
        $(image).attr("data-animate", response.data[m].images.original.url);
        $(image).attr("data-state", "still");
        image.addClass("image");
        $(gifDiv).append(ratingSpan);
        $(gifDiv).append("<br>");
        $(gifDiv).append(image);
        $("#gifContainer").append(gifDiv);
        }
    })
}

function animateOrStop() {
    var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

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

$(document).on("click", ".actor", displayGifs);
$(document).on("click", ".image", animateOrStop);