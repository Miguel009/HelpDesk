import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2"

const Knowledgeemp = () => {
const faqRef = db.ref('Knowled');
  const [Faqs, setFaqs] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const initialStateValues = {
    Problema: "",
    Descripcion: "",
    User: "Users",
    Categoria: "Hardware",
    Respuestas: [{}],
    Actualizacion: ""
  };
  const [values, setValues] = useState(initialStateValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const getFAQById = async (id) => {
    const faqRef2 = db.ref('Knowled');
    faqRef2.orderByKey().equalTo(id).on('value', snapshot => {
        snapshot.forEach(function(childSnapshot) {
            setValues({ ...childSnapshot.val() });
          });
    });
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
  const getFAQS = async () => {
    const faqRef3 = db.ref('Knowled');
    faqRef3.orderByKey().on('value', snapshot => {
        let docs=[];
        snapshot.forEach(function(childSnapshot) {
          docs.push({ ...childSnapshot.val(), id: childSnapshot.key });
        });
        setFaqs(docs);
      });
  };

  const onDeleteFAQ = async (id) => {
    if (window.confirm("Esta seguro que quiere eliminar la faq?")) {
        faqRef.child(id).remove();
    }
  };

  const clean = ()=>{
    if (currentId==="") {
      setValues(initialStateValues);
    }
    else
    {
    setCurrentId("");
    }
  }

  useEffect(() => {
    getFAQS();
    if (currentId === "") {
      const initialStateValues2 = {
        Problema: "",
        Descripcion: "",
        User: "Users",
        Categoria: "Hardware",
        Respuestas: [{}],
        Actualizacion: ""
      };
        setValues({ ...initialStateValues2 });
      } else {
        //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
        if (currentId !== null && currentId !== undefined) {
          getFAQById(currentId);
        }
      }
  }, [currentId]);

  const addOrEditFAQ = async (e) => {
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
        const autoid = faqRef.push().key;
        const val ={...values, "Actualizacion":today}
        if (currentId === "") {
          await faqRef.child(autoid).set(val);
        } else {
          await faqRef.child(currentId).update(val);
          setCurrentId("");
        }
        setValues(initialStateValues);
    }else
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

  return (
    <>
    <div className="container p-4">
      <div className="row">
      <div className="col-md-4 p-2">
        <h2>Agregar Bases del Conocimiento</h2>
        <form onSubmit={addOrEditFAQ} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese problema"
          value={values.Problema}
          name="Problema"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <textarea 
         type="text"
         value={values.Descripcion}
         name="Descripcion"
         placeholder="Ingrese solucion"
         className="form-control"
         onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group input-group">
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
    </div>
    <div className="form-group input-group">
      <button className="btn btn-primary btn2">
        {currentId === "" ? "Guardar" : "Actualizar"}
      </button>
      <button onClick={clean} type="reset" className="btn btn-secondary">
        Limpiar
      </button>
      </div>
    </form>
      </div>
      <div className="col-md-8 p-2 text-center">
        <div className="container">
          <h2>Lista Bases del Conocimiento</h2>
          <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Problema</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Categoria</th>
                <th scope="col">Cantidad de Respuestas</th>
                <th scope="col">Ultima Actualizacion</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Faqs.map((Faq) => (
                <tr key={Faq.id}>
                  <td>{Faq.Problema}</td>
                  <td>{Faq.Descripcion}</td>
                  <td>{Faq.Categoria}</td>
                  <td>{Faq.Respuestas===undefined? 0: Faq.Respuestas.length}</td>
                  <td>{Faq.Actualizacion}</td>
                  <td>
                    <button className="btn btn-primary buton" onClick={() => setCurrentId(Faq.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger buton" onClick={() => onDeleteFAQ(Faq.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};
export default Knowledgeemp;