let socket = io();
let myTurn = false;
let myTurnIndicator;
let waitIndicator;

window.onload = function () {
    myTurnIndicator = document.querySelector(".myTurn");
    waitIndicator = document.querySelector(".wait");
    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("click", event => {
            if (myTurn) {
                let parent = event.target.parentNode;
                let index = Array.from(parent.children).indexOf(event.target);
                console.log(index);
                event.target.classList.add("mine");
                socket.emit("click", index);
                myTurn = false;
                myTurnIndicator.classList.toggle("hidden");
                waitIndicator.classList.toggle("hidden");
    
            } else {
                console.log("Not your turn");
            }
        })
    })
}

socket.on("click", index => {
    console.log("data received: " + index);
    let wrapper = document.querySelector(".wrapper");
    let boxes = Array.from(wrapper.children)
    boxes[index].classList.add("opponent");
    myTurn = true;
    myTurnIndicator.classList.toggle("hidden");
    waitIndicator.classList.toggle("hidden");

});

socket.on("turn", myTurnFromServer => {
    myTurn = myTurnFromServer;
    myTurnIndicator.classList.toggle("hidden");
    waitIndicator.classList.toggle("hidden");

});