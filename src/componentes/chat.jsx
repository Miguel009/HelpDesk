import { db } from "../firebase/firebase";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2"

function Chat() {
  const [chatvalues, setChatValues] = useState([]);
  const chatRef = db.ref('chat');
  const mensaje = {
    textbox: ''
  };
  const [values, setValues] = useState(mensaje);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const salachat = async () =>{
    if (values.textbox.trim() != "") {
      var autoID = chatRef.push().key
      chatRef.child(autoID).set({
              from: 'user',
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
    chatRef.orderByKey().limitToLast(20).on('value', snapshot => {
      let docs=[];
      snapshot.forEach(function(childSnapshot) {
        docs.push({ ...childSnapshot.val(), id: childSnapshot.key });
      });
      setChatValues(docs);
      document.getElementById("chat_room").scrollTop =document.getElementById("chat_room").scrollHeight;
      console.log(document.getElementById("chat_room").scrollTop);
    });
  };
  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="mt-4 container content_chat">
         <div className="chat_header">
            Sala de chat
        </div>
        <div className="chat_room" id="chat_room" data-spy="scroll">
        {chatvalues.map((values) => (
                <div key={values.id}>
                 {values.type == 1? <span className='mymessage rounded text-white'>{values.message}</span>:
                  <span className='othermessage bg-secondary rounded text-white'>{values.message}</span>
                  }
                  <br/>
                  <br/>
                </div>
              ))}
        </div>
        <div className="input_content">
            <div className="d-table-cell w-100">
                <input type="text" className="form-control rounded-0" name="textbox" onChange={handleInputChange}/>
            </div>
            <div className="d-table-cell align-middle">
                <button id="enter" className="btn btn-primary flag_background btn_margin rounded-0" onClick = {salachat}>enter</button>
            </div>
        </div>
    </div>
  );
}

export default Chat;