import { db } from "../firebase/firebase";
import React, {useState } from "react";
import Swal from "sweetalert2"

function Register() {
  const userRef = db.ref('users');
    const usuario = {
      Email:"",
      password: "",
      confirmpassword: ""
    };
    const [values, setValues] = useState(usuario);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
    const exist = (existe)=>{
      if (existe !== undefined) {
        Swal.fire({
          title: 'Error!',
          text: 'El usuario ya existe',
          icon: 'error',
          confirmButtonText: 'Entendido'
          })
      }
      else
      {
        var autoID = userRef.push().key
            userRef.child(autoID).set({
                    Email: values.Email,
                    Passw: values.password
                });
            Swal.fire({
                title: 'Guardado!',
                text: 'Registrado Correctamente',
                icon: 'success',
                confirmButtonText: 'Yes!'
                })
      }
    }
    const validarexiste = (correo)=>{
      userRef.orderByChild('Email').equalTo(correo).once('value', snapshot => {
        exist(snapshot.val());
    });
    }
    const handleSubmit =(e) => {
      e.preventDefault();
      if (values.Email.trim() !== "" && values.password.trim() !== "" && values.confirmpassword.trim() !== "") {
        if (values.confirmpassword===values.password) {
            validarexiste(values.Email.trim())
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Las contraseñas no son iguales',
                icon: 'error',
                confirmButtonText: 'Entendido'
                })
        }
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

    return (
        <div className="container">
        <div className="row">
            <div className="col col-lg-8 col-sm-12 col-sm-12 offset-lg-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="Email">Email address</label>
                      <input type="email" className="form-control" name="Email" aria-describedby="emailHelp" onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Contraseña</label>
                      <input type="password" className="form-control" name="password"  onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confirmar Contraseña</label>
                        <input type="password" className="form-control" name="confirmpassword" onChange={handleInputChange}/>
                      </div>
                    <button type="submit" className="btn btn-primary flag_background">Registrar</button>
                  </form>
            </div>
        </div>
    </div>
    );
  }
  
  export default Register;