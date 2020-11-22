import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
function LastUpdates() {
  const [Know, setKnow] = useState([]);
  const getLastUpdates = async () => {
    const knowRef = db.ref('Knowled');
    await knowRef.orderByChild("Actualizacion").limitToLast(6).on('value', snapshot => {
        const docs=[];
        var usuario;
        snapshot.forEach(function(childSnapshot) {
          usuario = childSnapshot.val().User.split("@");
          docs.push({ ...childSnapshot.val(), id: childSnapshot.key, User:usuario[0]});
        });
        docs.reverse();
        setKnow(docs);
      });
  };

  useEffect(() => {
    getLastUpdates();
  }, []);
    return (
        <>
        {
            Know.length!==0?
            Know.map((know)=>(
                <li className="pb_cont" key={know.id}>
                <img src="./img/avatar.png" alt=""/>
                <div className="pb_data col-auto mr-auto align-self-center">
                    <h6>{know.Problema}</h6>
                    <span className="sm_user"><span className="align-middle">@{know.User}</span></span>
                    <span className="sm_desc"><i className="material-icons align-middle">event</i><span
                            className="align-middle"> Última
                            actualización: {know.Actualizacion}</span></span>
                </div>
                <div className="flag_rpl flag_green col-auto">
                    <span className="">{know.Respuestas===undefined? 0: know.Respuestas.length}</span><span className="flag_rpl_sub">Respuestas</span>
                </div>
            </li>
            ))
            :
            <div className="alert alert-danger" role="alert">
                No Hay Actualizaciones!
            </div>
        }
    </>
    );
  }
  
  export default LastUpdates;