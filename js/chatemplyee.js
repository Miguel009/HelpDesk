const database = firebase.database();
const chatRef = database.ref('chat');
function init(){
    chatroom();
    var textbox = document.getElementById("textbox");
    var enter = document.getElementById("enter"); 
    enter.onclick = function(e){
        if (textbox.value.trim() != "") {
                var autoID = chatRef.push().key
                chatRef.child(autoID).set({
                        from: 'user',
                        message: textbox.value,
                        type: 0
                    });
        }
        else
        {
            Swal.fire({
                title: 'Error!',
                text: 'Hay campos vacios',
                icon: 'error',
                confirmButtonText: 'Entendido'
                })
        }

    };
}

function chatroom(){
    chatRef.orderByKey().limitToLast(10).on('child_added', snapshot => {
        if (snapshot.val().type == 0) {
            document.getElementById("chat_room").innerHTML += "<span class='mymessage rounded text-white'>"+snapshot.val().message+"</span><br><br>";
        } else {
            document.getElementById("chat_room").innerHTML += "<span class='othermessage bg-secondary rounded text-white'>"+snapshot.val().message+"</span><br><br>";
        }
        
        console.log(snapshot.val().message);
    });
}


if(window.addEventListener){
    window.addEventListener("load", init, false);
}
   else if(window.attachEvent){
    window.attachEvent("onload", init);
}