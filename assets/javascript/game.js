

$(document).ready(function( $ ) {
    
var config = {
    apiKey: "AIzaSyCZE6O1WZAESxdSEe5R3Ox8Rr3SQGFZTwg",
    authDomain: "rps-multiplayer-8e437.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-8e437.firebaseio.com",
    storageBucket: "rps-multiplayer-8e437.appspot.com",
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var wins_1 = 0;
    var wins_2 = 0;
    var ties = 0;
    var player1 = " ";
    var player2 = " ";
    
    alert( "Click a pic Player 1")
         
    $("img").on("click", function(event) {
        player1 = ($(this).attr("data-value"));
        $("img").off("click");
        alert("Click a pic Player 2");
        $("img").on("click", function(event) {
            player2 = ($(this).attr("data-value"));
            if ((player1 === "r") || (player1 === "p") || (player1 === "s")) {

                if ((player1 === "r") && (player2 === "s")) {
                    wins_1++;
                } else if ((player1 === "r") && (player2 === "p")) {
                    wins_2++;
                } else if ((player1 === "s") && (player2 === "r")) {
                    wins_2++;
                } else if ((player1 === "s") && (player2 === "p")) {
                    wins_1++;
                } else if ((player1 === "p") && (player2 === "r")) {
                    wins_1++;
                } else if ((player1 === "p") && (player2 === "s")) {
                    wins_2++;
                } else if (player1 === player2) {
                    ties++;
                }
            }
            database.ref().set({
                player1: player1,
                player2: player2,
                wins_1: wins_1,
                wins_2: wins_2,
                ties:ties
            });
            database.ref().on("value", function(snapshot) {

                console.log(snapshot.val());
                console.log(snapshot.val().player1);
                console.log(snapshot.val().player2);
                console.log(snapshot.val().wins_1);
                console.log(snapshot.val().wins_2);
                console.log(snapshot.val().ties);
          
                 
             $("#wins_1").text(snapshot.val().wins_1);
             $("#wins_2").text(snapshot.val().wins_2);
             $("#ties").text(snapshot.val().ties); 
          
             
            
            // Handle the errors
         }, function(errorObject) {
             console.log("Errors handled: " + errorObject.code);
          });
        });
    });

    //chat js
var input = "";
    
    $("#submit_input").on("click", function(event) {
      event.preventDefault();

      input = $("#chat_input").val().trim();    
    
    database.ref("/chat").push(input);
    console.log(input);
    $("#chat_input").val("");
    });

    // Clear of the text-boxes
  
// Firebase watcher + initial loader HINT: .on("value")
database.ref("/chat").on("child_added", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
//   console.log(snapshot.val().input);
var output = snapshot.val()
  $("#chat_output").append("<ol>"+ output);
});  
    
}); //document end
    
  