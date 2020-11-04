import { db } from "../../firebase/firebase";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ChatEmployee() {
  const [usersVal, setusersVal] = useState([]);
  const [chatvalues, setChatValues] = useState([]);
  const mensaje = {
    textbox: '',
    usuario:'',
  };
  const [values, setValues] = useState(mensaje);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const salachat = async () =>{
    const chatRef4 = db.ref('chat/'+values.usuario);
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
      chatRef4.child(autoID).set({
              id: autoID,
              message: values.textbox,
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
  }
  const chatUsers = db.ref('chat');
  const getUsers = async () => {

    chatUsers.orderByKey().on('child_added', snapshot => {
      console.log("usuario ingresado");
      var primerfa= true;
      setusersVal(prevvalus =>[...prevvalus, snapshot.key]);
      toast("Se agrego al Usuario "+snapshot.key, {
        type: "success",
      });
      const chatRefs3 = db.ref('chat/'+snapshot.key);
      var user = snapshot.key;
      chatRefs3.limitToLast(1).on('child_added', snapshot =>{
        if (!primerfa&&snapshot.val().type!==0) {
          toast("Agrego un mensaje el usuario "+user, {
            type: "info",
          });
        }
      })
      primerfa=false;
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
  
  const getChats = async () => {
    const chatRefs = db.ref('chat/'+values.usuario);
    chatRefs.orderByKey().on('child_added', snapshot => {
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
    getUsers();
  }, []);

  useEffect(()=>{
    setChatValues([]);
    getChats();
    
    return()=>{
      if (values.usuario!=="") 
      {
      const chatRefs2 = db.ref('chat/'+values.usuario);
      chatRefs2.off('child_added');
      var primerfa1= true;
      chatRefs2.limitToLast(1).on('child_added', snapshot =>{
        if (!primerfa1&&snapshot.val().type!==0) {
          toast("Agrego un mensaje el usuario "+values.usuario, {
            type: "info",
          });
        }
        primerfa1=false;
      })
    }

    }
  }, [values.usuario])

    useEffect(() => {
      scroll();
    }, [chatvalues]);
  

  return (
    <div className="mt-4 container content_chat">
            <select className="form-control" name="usuario" onChange={handleInputChange}>
            <option key="1">Eliga Usuario</option>
            {
                usersVal.map((users)=>(
                <option key={users}>{users}</option>
                ))
            } 
            </select>
      {
        <>
        <div className="chat_header">
        Sala de chat
    </div>
    <div className="chat_room" id="chat_room" data-spy="scroll">
    {chatvalues.map((cvalues) => (
          cvalues.type===0||cvalues.type === 1?
          <div key={cvalues.id}>
            {cvalues.type === 0? <span className='mymessage rounded text-white'>{cvalues.message}</span>:
            <span className='othermessage bg-secondary rounded text-white'>{cvalues.message}</span>
            }
            <br/>
            <br/>

        </div>
        :
        null
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
      }
    <ToastContainer />
    </div>
    
  );
}

export default ChatEmployee;