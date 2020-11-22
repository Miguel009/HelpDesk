import { db } from "../firebase/firebase";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"

function Chat() {
  var user = JSON.parse(localStorage.getItem("user"));
  var users = "";
  if (user == null) {
    users = "Users"
  }
  else {
    var partes = user.email.split(".")
    users = partes[0] + partes[1];
  }
  const [chatvalues, setChatValues] = useState([]);
  const chatRef = db.ref('chat/' + users);
  const mensaje = {
    textbox: ''
  };
  const [values, setValues] = useState(mensaje);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const salachat = async () => {
    if (values.textbox.trim() !== "") {
      var autoID = 0;
      var cantidad = chatvalues.length - 1;
      if (chatvalues.length >= 10) {
        autoID = chatvalues[cantidad].id + 1;
      }
      else {
        autoID = chatvalues.length;
      }
      chatRef.child(autoID).set({
        id: autoID,
        message: values.textbox,
        type: 1
      });
      setValues(mensaje);
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Hay campos vacios',
        icon: 'error',
        confirmButtonText: 'Entendido'
      })
    }
  }

  const getChats = async () => {
    var user1 = JSON.parse(localStorage.getItem("user"));
    var users2 = "";
    if (user1 == null) {
      users2 = "Users"
    }
    else {
      var partes = user1.email.split(".")
      users2 = partes[0] + partes[1];
    }
    const chatRef1 = db.ref('chat/' + users2);
    chatRef1.orderByKey().limitToLast(10).on('child_added', snapshot => {
      setChatValues(preve => [...preve, { ...snapshot.val() }]);
    });
  };
  const scroll = () => {
    document.getElementById("chat_room").scrollTop = document.getElementById("chat_room").scrollHeight;
  }
  useEffect(() => {
    getChats();
  }, []);


  useEffect(() => {
    if (user != null) {
      scroll();
    }
  }, [chatvalues, user]);


  return (
    <div className="main">
      <div className="container content_chat">
        {
          user != null ?
            <>
              <div className="chat_header">
                Sala de chat
            </div>
              <div className="chat_room" id="chat_room" data-spy="scroll">
                {chatvalues.map((values) => (
                  <div key={values.id}>
                    {values.type === 1 ? <span className='mymessage text-white'>{values.message}</span> :
                      <span className='othermessage text-white'>{values.message}</span>
                    }
                  </div>
                ))
                }
              </div>
              <div className="input_content">
                <div className="d-table-cell w-100">
                  <input type="text" className="form-control rounded-0" name="textbox" onChange={handleInputChange} value={values.textbox} autoComplete="off"/>
                </div>
                <div className="d-table-cell align-middle">
                  <button id="enter" className="btn-ustlye btn btn-primary flag_background btn_margin rounded-0" onClick={salachat}><i class="material-icons float-left">send</i></button>
                </div>
              </div>
              </>
            :
            <div className="alert alert-danger" role="alert">
              Debe iniciar sesion para poder utilizar el chat!
    </div>
        }
      </div>
    </div>
  );
}

export default Chat;