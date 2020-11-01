import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
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
    Respuestas: [{}]
  };
  const [values, setValues] = useState(initialStateValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const getFAQById = async (id) => {
    faqRef.orderByKey().equalTo(id).on('value', snapshot => {
        snapshot.forEach(function(childSnapshot) {
            setValues({ ...childSnapshot.val() });
          });
    });
  };
  const getFAQS = async () => {
    faqRef.orderByKey().on('value', snapshot => {
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

  useEffect(() => {
    getFAQS();
    if (currentId === "") {
        setValues({ ...initialStateValues });
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
      if (currentId === "") {
        const autoid = faqRef.push().key
        faqRef.child(autoid).set(values);
      } else {
        faqRef.child(currentId).update(values);
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
    setValues(initialStateValues);
  };

  return (
    <>
    <div className="container p-4">
      <div className="row">
      <div className="col-md-4 p-2">
        <h2>Agregar FAQS</h2>
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
      <button className="btn btn-primary btn-block buton">
        {currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
      </div>
      <div className="col-md-8 p-2 text-center">
        <div className="container">
          <h2>Lista FAQS</h2>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Problema</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Categoria</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Faqs.map((Faq) => (
                <tr key={Faq.id}>
                  <td>{Faq.Problema}</td>
                  <td>{Faq.Descripcion}</td>
                  <td>{Faq.Categoria}</td>
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
    </>
  );
};
export default Knowledgeemp;