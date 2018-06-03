

var config = {
    apiKey: "AIzaSyCZE6O1WZAESxdSEe5R3Ox8Rr3SQGFZTwg",
    authDomain: "rps-multiplayer-8e437.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-8e437.firebaseio.com",
    storageBucket: "rps-multiplayer-8e437.appspot.com",
    };

    firebase.initializeApp(config);

    var wins_1 = 0;
    var wins_2 = 0;
    var ties = 0;
    var player1 = " ";
    var player2 = " ";

    $("#submit-guess").on("click", function(event) {
    event.preventDefault();
        // Get the input values
    player1 = $("#guess1_input").val().trim();
    player2 = $("#guess2_input").val().trim();
    
    console.log(player1);
    console.log(player2);
    
    
    // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
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
    


var database = firebase.database();

database.ref().set({
    player1: player1,
    player2: player2,
    wins_1: wins_1,
    wins_2: wins_2,
    ties:ties
});             
    
    database.ref().on("value", function(snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().player1);
        console.log(snapshot.val().player2);
        console.log(snapshot.val().wins_1);
        console.log(snapshot.val().wins_2);
        console.log(snapshot.val().ties);
  
        // Change the HTML to reflect        
        
    // $("#playerOne").text(snapshot.val().player1);
    // $("#playerTwo").text(snapshot.val().player2);
    $("#wins_1").text(snapshot.val().wins_1);
    $("#wins_2").text(snapshot.val().wins_2);
    $("#ties").text(snapshot.val().ties); 
  
    // if (player1 > player2) {      
    // // Alert
    //  alert("Player 1 Wins!");
    // }else {
    // alert("Player 2 Wins!")
    // }
    
    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
}); 
    
  