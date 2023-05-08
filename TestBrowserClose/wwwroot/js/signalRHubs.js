"use strict";

///////////////////// UserCconnected method in javascript. /////////////////////

var connection = new signalR.HubConnectionBuilder().withUrl("/mainHub")
    .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: () => {
            this._errorState$.next(true);
            return 1000;
        },
        reconnectDelay: 500 // set the reconnect delay to 500ms
    })
    .configureLogging(signalR.LogLevel.Debug).build();
connection.serverTimeoutInMilliseconds = 120000;

//Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {

    console.log(connection.connectionId);

    //loadStatus("available");

}).catch(function (err) {
    return console.error(err.toString());
});


var tryingToReconnect = false;

// Seems not work
connection.onreconnected(function () {
    tryingToReconnect = false;

    //loadStatus("available");
    return console.log("Connection Reconnected")
});

// Seems not work
connection.onreconnecting(function (err) {
    tryingToReconnect = true;
    return console.log(err.message)
});

async function start() {
    try {
        await connection.start();
        //loadStatus("available");
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        //loadStatus("connecting");
        setTimeout(start, 5000);
    }
};


connection.onclose((error) => {
    console.log("ConnectId" +connection.connectionId + "Disconnected");
    console.log(`Something went wrong: ${error}`);
    connection.invoke("UserDisconnected");
});


// handle the beforeunload event
$(window).on('beforeunload', function () {
    // your code here
    console.log("Before unload event");

    // notify the server that the user has disconnected
    connection.invoke("UserDisconnected");
});




///////////////////// UserDisconnected method in javascript. /////////////////////


////Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

window.onload = function () {
    if (connection == undefined || connection == "undefined") {
        console.log("not connect to signalr server");
    } else {
        if (connection._connectionState == "Connected") {
            //document.getElementById("sendButton").disabled = false;
        }
    }
}



connection.on("Chat_ReceiveMessage", function (user, message) {
    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    //// We can assign user-supplied strings to an element's textContent because it
    //// is not interpreted as markup. If you're assigning in any other way, you 
    //// should be aware of possible script injection concerns.
    //li.textContent = `${user} says ${message}`;
});

connection.on("UserDisconnected", function (user) {
    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    //// We can assign user-supplied strings to an element's textContent because it
    //// is not interpreted as markup. If you're assigning in any other way, you
    //// should be aware of possible script injection concerns.
    //li.textContent = `${user} says ： close browser manually`;

    console.log("UserDisconnected");
});



//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("Chat_SendMessageToAll", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});