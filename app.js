$(document).ready(function fetchGameResult(data) {



    $("#1").on("click", function(event) {
        console.log("1");

        $.ajax({
            url: "http://localhost:3000/Flip",
            type: "POST",
            dataType: "json",
            contentType: "Application/Json",
            data: JSON.stringify({
                "call": "heads"
            }),
            success: function(data) {
                console.log(data.result);
                alert("Result :" + data.result);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });


    });
    $("#2").on("click", function(event) {
        console.log("2");

        $.ajax({
            url: "http://localhost:3000/Flip",
            type: "POST",
            dataType: "json",
            contentType: "Application/Json",
            data: JSON.stringify({
                "call": "tails"
            }),
            success: function(data) {
                console.log(data.result);
                alert("Result :" + data.result);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });


    });
    $("#3").on("click", function(event) {
        console.log("3");

        $.ajax({
            url: "http://localhost:3000/stats",
            type: "GET",
            dataType: "json",
            contentType: "Application/Json",
            success: function(data) {
                console.log(data.wins);
                console.log(data.losses);
                alert("Wins :" + data.wins + "Losses" + data.losses);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });


    });

$("#4").on("click", function(event) {
        console.log("4");
    $.ajax({
            url: "http://localhost:3000/stats",
            type: "Delete",
            success: function(data) {
                
                
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });


        


    });


});