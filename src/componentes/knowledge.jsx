import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Swal from "sweetalert2";
function Knowledge() {
  const knowRef = db.ref('Knowled');
  const [Know, setKnow] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [currentId2, setCurrentId2] = useState("");
  const [currentPos, setcurrentPos] = useState("");
  const [respuestasOform, setRespuestasOform] = useState(true);
  var userlog = JSON.parse(localStorage.getItem("user"));
  var users = "";
  if (userlog == null) {
    users="Users"
  }
  else
  {
   var partes = userlog.email.split("@")
    users=partes[0]
  }
  let FaqNum = 0;
  const initialStateValues = {
    Problema: "",
    Descripcion: "",
    User: users,
    Categoria: "Hardware",
    Respuestas: [{}],
    Actualizacion: ""
  };
  const respuestas = {
    Respuesta:"",
    User:users
  };
  const [values, setValues] = useState(initialStateValues);
  const [values2, setValues2] = useState(respuestas);

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setValues2({ ...values2, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getKnowById = async (id) => {
    await knowRef.orderByKey().equalTo(id).on('value', snapshot => {
        snapshot.forEach(function(childSnapshot) {
            setValues({ ...childSnapshot.val() });
          });
    });
  };
  const getKnows = async () => {
    await knowRef.orderByKey().on('value', snapshot => {
        let docs=[];
        FaqNum=0;
        snapshot.forEach(function(childSnapshot) {
          docs.push({ ...childSnapshot.val(), id: childSnapshot.key, num:FaqNum});
          FaqNum++;
        });
        setKnow(docs);
      });
  };

  const onDeleteKnow = async (id) => {
    if (window.confirm("Esta seguro que quiere eliminar este pregunta?")) {
      await knowRef.child(id).remove();
    }
  };

  const emptyspaces = (values)=>{
    var n;
    for (n in values) {
      if (typeof values[n] != 'object') {
        if (values[n].trim()==="" && n!=="Actualizacion" && n!=="Respuestas") {
          return true
        }
      }
    }
    return false
  }

  const addOrEditKnow = async (e) => {
    e.preventDefault();
    try {
      if (!emptyspaces(values)) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var H = today.getHours();
      var n = today.getMinutes();
      if (n<10) {
        n="0"+n;
      }
      today = dd + '/' + mm + '/' + yyyy+' a las '+H+':'+n;
      const autoid = knowRef.push().key;
      const val ={...values, ["Actualizacion"]:today}
      if (currentId === "") {
        await knowRef.child(autoid).set(val);
      } else {
        await knowRef.child(currentId).update(val);
        setCurrentId("");
      }
      setValues(initialStateValues);
      }
      else
      {
        Swal.fire({
          title: 'Error!',
          text: 'Hay espacios en blanco',
          icon: 'error',
          confirmButtonText: 'Entendido'
          })
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addOrEditanswer = async (e) => {
    const knowRefs2= db.ref('Knowled/'+currentId2+'/Respuestas')
    e.preventDefault();
    try {
      if (!emptyspaces(values2)) {
      //if (currentId === "") {
        let array = Know[currentPos].Respuestas;
        let numero = 0;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var H = today.getHours();
        var n = today.getMinutes();
        if (n<10) {
          n="0"+n;
        }
        today = dd + '/' + mm + '/' + yyyy+' a las '+H+':'+n;
        if (array !== undefined) {
          numero = array.length;
        }
        await knowRefs2.child(numero).set(values2);
        await knowRef.child(currentId2).update({Actualizacion:today});
      /*} else {
        knowRefs2.child(currentId).update(values2);
        setCurrentId("");
      }*/
    }
    else
    {
      Swal.fire({
        title: 'Error!',
        text: 'Hay espacios en blanco',
        icon: 'error',
        confirmButtonText: 'Entendido'
        })
    }
    } catch (error) {
      console.error(error);
    }
    setValues(initialStateValues);
  };


  const abrir = (id, num)=>{
    setRespuestasOform(false)
    setCurrentId2(id);
    setcurrentPos(num);
  }

  const defaults = (e) => {
    setRespuestasOform(true);
    setCurrentId("");
  }

  const updates = (id) => {
    setRespuestasOform(true);
    setCurrentId(id);
  }

  useEffect(() => {
    getKnows();
  }, []);

  useEffect(()=>{
    if (currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (currentId !== null && currentId !== undefined) {
        getKnowById(currentId);
      }
    }
  }, [currentId])
    return (
      <>


          <div className="main">
                  <div className="container-fluid">
                      <h2 id="title-faq">Base de Conocimiento</h2>
                  </div>
                  {
                    userlog!=null?
                      <button className="btn flag_background text-white" id="submit" onClick={defaults} data-toggle="modal" data-target="#exampleModa2">Nuevo</button>
                      :
                      null
                  }
                  <div className="accordion" id="faqgroup">
                  {
                  Know.map((know) => (
                      <div className="card" key={know.id}>
                          <div className="card-header card_edge_bg" id={"Faq"+know.num}>
                              <h2 className="mb-0">
                                  <button
                                      className="btn btn-link btn-block text-left text_btn_edge"
                                      type="button"
                                      data-toggle="collapse"
                                      data-target={"#coll"+know.num}
                                      aria-expanded="false"
                                      aria-controls={"coll"+know.num}
                                  >
                                      {know.Problema}
                                      <br/>
                                      <label className="label_btn">{"Por @"+know.User}</label>
                                  </button>
                                  <span className="span_edge">{know.Respuestas===undefined? 0: know.Respuestas.length} respuestas</span>
                              </h2>
                          </div>
                          <div
                              id={"coll"+know.num}
                              className="collapse"
                              aria-labelledby={"Faq"+know.num}
                              data-parent="#faqgroup"
                          >
                              <div className="card-body body_text_edge">
                                  {know.Descripcion}
                              </div>
                              <div className="card-footer body_text_edge">
                              <button className="btn btn-success text-white btn2" id="submit" data-toggle="modal" onClick={() => abrir(know.id, know.num)}  data-target="#exampleModa2">Ver Respuestas o Responder</button>
                                {
                                  userlog!=null?
                                    users===know.User?
                                      <>
                                      <button className="btn btn-secondary text-white btn2" onClick={() => updates(know.id)} data-toggle="modal" data-target="#exampleModa2">Editar</button>
                                      <button className="btn btn-danger text-white" onClick={() => onDeleteKnow(know.id)}>Eliminar</button>
                                      </>
                                    :
                                    null
                                  :
                                  null
                                }
                              </div>
                          </div>
                      </div>
                  )
                  )}
                  </div>
              </div>
     <div className="modal fade" id="exampleModa2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div className="modal-dialog">
       <div className="modal-content">
         <div className="modal-header">
           <h5 className="modal-title" id="exampleModalLabel">New message</h5>
           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div className="modal-body">
           {
             respuestasOform?
             <form>
             <div className="form-group">
               <label htmlFor="recipient-name" className="col-form-label" >Problema:</label>
               <input type="text" className="form-control" value={values.Problema} name="Problema" onChange={handleInputChange}/>
             </div>
             <div className="form-group">
               <label htmlFor="recipient-name" className="col-form-label" >Descripcion:</label>
               <textarea type="text" className="form-control" value={values.Descripcion} name="Descripcion" onChange={handleInputChange}></textarea>
             </div>
             <select className="form-control" name="Categoria" onChange={handleInputChange} value={values.Categoria}>
               <option>Hardware</option>
               <option>Software</option>
               <option>Mantenimiento</option>
               <option>Ordenadores Completos</option>
               <option>Modding</option>
               <option>Juegos</option>
               <option>Moviles</option>
               <option>Electronica de Consumo</option>
               <option>Internet y Conectividad</option>
            </select>
           </form>
           :
           <>
           <div className="answersplace" data-spy="scroll">
          {
           Know[currentPos] !== undefined?  
          Know[currentPos].Respuestas!==undefined?
          Know[currentPos].Respuestas.map((resp) =>(
              <div className="alert alert-primary" role="alert">
               <strong>{resp.User}</strong> Dice: {resp.Respuesta}
              </div>
           )):
          <h1>No hay comentarios :c</h1>
          :
          null
          }
           </div>
           {userlog!=null?
           <form>
             <div className="form-group">
               <label htmlFor="recipient-name" className="col-form-label" >Respuesta:</label>
               <textarea type="text" className="form-control" value={values2.Respuesta} name="Respuesta" onChange={handleInputChange2}></textarea>
             </div>
            </form>:
            null
            }
            </>
           }
         </div>
         <div className="modal-footer">
           <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
           {userlog!=null?
           <button type="submit" className="btn btn-success" data-dismiss={respuestasOform?"modal":null} onClick={respuestasOform?addOrEditKnow:addOrEditanswer}>Send message</button>
           :null
           }
         </div>
       </div>
     </div>
   </div>
   </>
    );
  }
  
  export default Knowledge;