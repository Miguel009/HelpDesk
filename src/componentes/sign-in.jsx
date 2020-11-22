import { db } from "../firebase/firebase";
import React, { useState } from "react";
import Swal from "sweetalert2"
function SignIn() {
  const userRef = db.ref('users');
  const usuario = {
    Email: '',
    Passw: ''
  }
  const [values, setValues] = useState(usuario);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var usr = { Key: '', Email: '', Passw: '' };
    userRef.orderByChild('Email').equalTo(values.Email).on('child_added', snapshot => {
      usr = snapshot.val();
      console.log(usr);
      if (usr['Passw'] === values.Passw) {
        Swal.fire({
          title: 'Bienvenido ' + usr.Email + '!',
          text: 'Inicio Correctamente',
          icon: 'success',
          confirmButtonText: 'Entendido'
        }).then((result) => {
          var user = {
            email: values.Email,
            key: snapshot.key
          }
          if (result.isConfirmed) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "./index.html";
          } else if (result.isDenied) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "./index.html";
          }
        })
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'Correo o Usuario no existe',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })
      }
    });
  };


  return (
    <div className="main">
      <h2 id="title-faq">Iniciar sesión</h2>
      <div className="container margin-footer">
        <div className="row">
          <div className="col col-lg-8 col-sm-12 col-sm-12 offset-lg-2">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo</label>
                <input type="email" className="form-control" id="Email" name="Email" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Contraseña</label>
                <input type="password" name="Passw" onChange={handleInputChange} className="form-control" id="password" />
              </div>
              <button type="submit" className="btn btn-primary flag_background" id="signin">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;