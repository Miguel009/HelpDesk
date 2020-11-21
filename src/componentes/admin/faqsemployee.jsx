import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2"

const Faqsemployee = () => {
const faqRef = db.ref('FAQS');
  const [Faqs, setFaqs] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const initialStateValues = {
    Problema: "",
    Solucion: ""
  };
  const [values, setValues] = useState(initialStateValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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
  const getFAQById = async (id) => {
    const faqRef1 = db.ref('FAQS');
    faqRef1.orderByKey().equalTo(id).on('value', snapshot => {
        snapshot.forEach(function(childSnapshot) {
            setValues({ ...childSnapshot.val() });
          });
    });
  };
  const getFAQS = async () => {
    const faqRef2 = db.ref('FAQS');
    faqRef2.orderByKey().on('value', snapshot => {
        let docs=[];
        snapshot.forEach(function(childSnapshot) {
          docs.push({ ...childSnapshot.val(), id: childSnapshot.key });
        });
        setFaqs(docs);
      });
  };

  const onDeleteFAQ = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: 'btn btn-success btn2',
          cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
          title: '¿Esta seguro que quiere eliminar este pregunta?',
          showCancelButton: true,
          confirmButtonText: `Si`,
          cancelButtonText: 'No'
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await faqRef.child(id).remove();
              Swal.fire({
                  title: 'Sesion Cerrada!',
                  text: 'Gracias!',
                  icon: 'success',
                  confirmButtonText: 'Ok!'
                  })
          } else {
            Swal.fire('Ninguna accion tomada', '', 'info')
          }
        })
  };

  useEffect(() => {
    getFAQS();
    if (currentId === "") {
      const initialStateValues2 = {
        Problema: "",
        Solucion: ""
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

      if (currentId === "") {
        const autoid = faqRef.push().key
        faqRef.child(autoid).set(values);
      } else {
        faqRef.child(currentId).update(values);
        setCurrentId("");
      }         
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
         value={values.Solucion}
         name="Solucion"
         placeholder="Ingrese solucion"
         className="form-control"
         onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="btn btn-primary btn-block buton">
        {currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
      </div>
      <div className="col-md-8 p-2 text-center">
        <div className="container">
          <h2>Lista FAQS</h2>
          <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Problema</th>
                <th scope="col">Solucion</th>
                <th scope="col">Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Faqs.map((Faq) => (
                <tr key={Faq.id}>
                  <td>{Faq.Problema}</td>
                  <td>{Faq.Solucion}</td>
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
export default Faqsemployee;