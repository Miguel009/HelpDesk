import { db } from "../firebase/firebase";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2"

function Chat() {
  var user = JSON.parse(localStorage.getItem("user"));
  var users = "";
  if (user == null) {
    users="Users"
  }
  else
  {
   var partes = user.email.split("@")
    users=partes[0]
  }
  const [chatvalues, setChatValues] = useState([]);
  const chatRef = db.ref('chat/'+users);
  const mensaje = {
    textbox: ''
  };
  const [values, setValues] = useState(mensaje);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const salachat = async () =>{
   if (values.textbox.trim() !== "") {
      var autoID = 0;
      var cantidad = chatvalues.length-1;
      if (chatvalues.length>=10) {
        autoID = chatvalues[cantidad].id+1;
      }
      else
      {
        autoID=chatvalues.length;
      }
      console.log(autoID);
     chatRef.child(autoID).set({
              id: autoID,
              message: values.textbox,
              type: 1
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
  }

  const getChats = async () => {
    chatRef.orderByKey().limitToLast(10).on('child_added', snapshot => {
      console.log(snapshot.val());
      setChatValues(preve=>[...preve, {...snapshot.val()}]);
    });

   /* if (user !=null) {
      chatRef.orderByKey().limitToLast(10).on('child_added', snapshot => {
        if (snapshot.val().type == 1) {
            document.getElementById("chat_room").innerHTML += "<span class='mymessage rounded text-white'>"+snapshot.val().message+"</span><br><br>";
        } else {
            document.getElementById("chat_room").innerHTML += "<span class='othermessage bg-secondary rounded text-white'>"+snapshot.val().message+"</span><br><br>";
        }
        document.getElementById("chat_room").scrollTop =document.getElementById("chat_room").scrollHeight;
    });
    }*/
  };
  const scroll = ()=>{
    document.getElementById("chat_room").scrollTop =document.getElementById("chat_room").scrollHeight;
  }
  useEffect(() => {
    getChats();
  }, []);

 
    useEffect(() => {
      if (user != null) {
      scroll();
      }
    }, [chatvalues]);
  

  return (
    <div className="mt-4 container content_chat">
      {
        user !=null?
        <>
        <div className="chat_header">
        Sala de chat
    </div>
    <div className="chat_room" id="chat_room" data-spy="scroll">
    {chatvalues.map((values) => (
                <div key={values.id}>
                 {values.type === 1? <span className='mymessage rounded text-white'>{values.message}</span>:
                  <span className='othermessage bg-secondary rounded text-white'>{values.message}</span>
                  }
                  <br/>
                  <br/>
              </div>
    ))
    }
    </div>
    <div className="input_content">
        <div className="d-table-cell w-100">
            <input type="text" className="form-control rounded-0" name="textbox" onChange={handleInputChange}/>
        </div>
        <div className="d-table-cell align-middle">
            <button id="enter" className="btn btn-primary flag_background btn_margin rounded-0" onClick = {salachat}>enter</button>
        </div>
    </div></>
    :
    <div className="alert alert-danger" role="alert">
      Debe iniciar sesion para poder utilizar el chat!
    </div>
      }

    </div>
  );
}

export default Chat;