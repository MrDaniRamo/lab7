$(document).ready(function() {

// Start your code from here

var animals = ["dog", "cat", "rabbit", "frog", "chicken", "bird", "turtle"];

function populateButtons(arrayToUse, classToAdd, placeHolder){
    $(placeHolder).empty();

    for (var i=0; i< arrayToUse.length; i++){

        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type",arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(placeHolder).append(a);
    }

}

$("#animal-buttons").on("click",".animal-button", function(){

    var search = $(this).attr("data-type");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=7wSk6ynedB2fRJcRBXuRfAu8XLtinxOm&limit=10";

    $.ajax({url:queryUrl})
    .then(function(response) {
        var results = response.data;
        $("#animals").empty()
        for (var i =0; i < results.length; i++){

            

            var animalDiv = $("<div class=\"animal-item\">")
            var rating = results[i].rating
            var p = $("<p>").text("Rating: " + rating)

            var animated = results[i].images.fixed_height.url
            var still = results[i].images.fixed_height_still.url

            var animalImage = $("<img>")
            animalImage.attr("src",still)
            animalImage.attr("data-still",still)
            animalImage.attr("data-animate",animated)
            animalImage.attr("data-isAnimated","false")
            animalImage.addClass("animal-image")

            animalDiv.append(p)
            animalDiv.append(animalImage)

            $("#animals").append(animalDiv)


        }


    })


})

$("#animals").on("click",".animal-image", function(){
// Registro del evento para la imagen
    //alert("hola1");
    var state1 = $(this).attr("data-isAnimated");
    if (state1 == "false") {

    $(this).attr("src", $(this).attr("data-animate"))
    $(this).attr("data-isAnimated","true");

    }
    else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-isAnimated","false");

    }
})

$("#animal-form").on("click","#add-animal", function(e){
    e.preventDefault();
    var inp = $("#animal-input").val();
    animals.push(inp);
    populateButtons(animals, "animal-button", "#animal-buttons");
})


populateButtons(animals, "animal-button", "#animal-buttons");

});



