(function gameFunction(){
    window.onload = function(){

        var config = {
            apiKey: "AIzaSyDnwNPo5ya6pQR24jkzg13CRE-wW3SP9AM",
            authDomain: "train-scheduler-507c5.firebaseapp.com",
            databaseURL: "https://train-scheduler-507c5.firebaseio.com",
            projectId: "train-scheduler-507c5",
            storageBucket: "train-scheduler-507c5.appspot.com",
            messagingSenderId: "888248325097"
          };
          firebase.initializeApp(config);

        var database = firebase.database();

        $("#add-train-btn").on("click", function(event) {
            event.preventDefault();
          
            var trainName = $("#train-name-input").val().trim();
            var destination = $("#dest-input").val().trim();
            var startTime = moment($("#initial-time-input").val().trim(), "HH:mm").format("HH:mm");
            var freq = $("#freq-input").val().trim();
          
            var newTrain = {
              name: trainName,
              dest: destination,
              start: startTime,
              frequency: freq
            };
          
            database.ref().push(newTrain);

            $("#train-name-input").val("");
            $("#dest-input").val("");
            $("#initial-time-input").val("");
            $("#freq-input").val("");
        });        

        database.ref().on("child_added", function(childSnapshot) {
    
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().dest;
        var startTime = childSnapshot.val().start;
        var freq = childSnapshot.val().frequency;
        
        var minAway = freq - (moment(moment().format("HH:mm"), "HH:mm").diff(moment(startTime ,"HH:mm"), "minutes") % freq)

        var nextArr = moment(moment().format("HH:mm"), "HH:mm").add(minAway, "minutes").format("HH:mm");

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(freq),
            $("<td>").text(nextArr),
            $("<td>").text(minAway),
        );

        $("#train-table > tbody").append(newRow);
        });

    };
}());