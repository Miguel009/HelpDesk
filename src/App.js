import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./componentes/chat"
import Contac from "./componentes/contact"
import Developers from "./componentes/developers"
import Faq from "./componentes/faq"
import Knowledge from "./componentes/knowledge"
import Register from "./componentes/register"
import SignIn from "./componentes/sign-in"
import Faqsemployee from "./componentes/admin/faqsemployee"
import Knowledgeemp from "./componentes/admin/knowledgeemp"
import LastUpdates from "./componentes/lastupdates"
import ChatEmployee from "./componentes/admin/chatemployee"
import AdminSignIn from "./componentes/admin/signadmin"
import Swal from "sweetalert2";
import { db } from "./firebase/firebase";
import React, {useState } from "react";
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
global.jQuery = require('jquery');
require('bootstrap');
function App() {
    const contra = {
        contraseña:'',
        contraseñaN: '',
        contraseñaN2: ''
      }
      const [values, setValues] = useState(contra);
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };
        var user = JSON.parse(localStorage.getItem("user"));
        var admin = JSON.parse(localStorage.getItem("admin"));
        var users = "";
        if (user == null) {
            users="Users"
        }
        else
        {
        var partes = user.email.split("@")
            users=partes[0]
        }
        function Sesiones(e) {
          e.preventDefault();
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success btn2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: '¿Deseas Cerrar Sesion?',
                showCancelButton: true,
                confirmButtonText: `Si`,
                cancelButtonText: 'No'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Sesion Cerrada!',
                        text: 'Gracias!',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.clear();
                                window.location.href = "/";
                            } else if (result.isDenied) {
                                localStorage.clear();
                                window.location.href = "/";
                            }
                        })
                } else {
                  Swal.fire('Sesion no cerrada', '', 'info')
                }
              })
        }

        function actualizar(e){
            e.preventDefault();
            const userRef = db.ref('users');
            var userss = {
                Email: user.email,
                Passw: values.contraseñaN
            }
            console.log(values);
            userRef.orderByKey().equalTo(user.key).on('child_added', snapshot => {
                if (values.contraseña.trim() !== "" && values.contraseñaN.trim() !== "" && values.contraseñaN2.trim() !== "")
                {
                    if (values.contraseña === snapshot.val().Passw) {
    
                        if (values.contraseñaN===values.contraseñaN2 && values.contraseñaN !== values.contraseña) {
                            userRef.child(user.key).update(userss);
                            Swal.fire({
                                title: 'Hecho!',
                                text: 'Cambio hecho Correctamente',
                                icon: 'success',
                                confirmButtonText: 'Yes!'
                                })
                        }
                        else
                        {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Error al autenticar la contraseña',
                                icon: 'error',
                                confirmButtonText: 'Entendido'
                                })
                        }
                    }
                    else{
                       Swal.fire({
                           title: 'Error!',
                           text: 'Contraseña antigua incorrecta',
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
           });
        }


  return (
    <Router>
      <div>
    <nav className="navbar navbar-expand-lg navcolor_main sticky-top navbar_main">
     <Link className="navbar-brand nvb_main_logo" to="/"></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="material-icons">menu</i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

                {
                admin==null?
                <>
                <li className="nav-item">
                    <NavLink to="chat" className="nav-link">Chat</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="faq" className="nav-link">FAQ</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="knowledge" className="nav-link">Base de Conocimiento</NavLink>
                </li>
                <li className="nav-item">
                   <NavLink to="developers" className="nav-link">Desarrolladores</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="contact" className="nav-link">Contactos y Contactanos</NavLink>
                </li>
                </>
                :
                <>
                <li className="nav-item">
                <NavLink to="chatemployee" className="nav-link">Chat</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="knowledgeemp" className="nav-link">Base de Conocimiento</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="faqsemployee" className="nav-link">FAQ</NavLink>
                </li>
                </>
                }

            </ul>
            <li className="nav-item nav_li_main">
                {
                    admin==null?
                    user == null ? <NavLink className="nav-link" to="/sign-in">Iniciar sesión</NavLink>
                : <a className="nav-link" data-toggle="modal" data-target="#exampleModal">{users}</a>
                :<a className="nav-link" data-toggle="modal" data-target="#exampleModal">{admin.email}</a>
                }
            </li>
            <li className="nav-item nav_li_main">
                {
                    admin==null?
                    user == null? <NavLink className="btn text-white flag_background" id="buton-menu" href="#" to="/register">Registrarme</NavLink>
                    : <a className="btn text-white flag_background" id="buton-menu" onClick={Sesiones}>Cerrar Sesion</a>
                    :<a className="btn text-white flag_background" id="buton-menu" onClick={Sesiones}>Cerrar Sesion</a>
                }
                
            </li>
        </div>
    </nav>
    <div className="banner_welcome">
        <div className="col-md-6">
            <h2>Siempre para ayudar</h2>
            <p className="text-justify">
                Así como creemos totalmente en el producto que brindamos, de la misma forma aspiramos a darte el servicio de soporte que, como nuestro cliente, tu te mereces. Help-desk es nuestra plataforma de auxilio para aquellos usuarios que se han topado con algún contratiempo durante las sesiones de uso de nuestro software
            </p>
        </div>
    </div>
    <Switch>
    <Route path="/Admin">
          <AdminSignIn/>
    </Route>
    <Route path="/faqsemployee">
          <Faqsemployee/>
    </Route>
      <Route path="/knowledgeemp">
          <Knowledgeemp/>
      </Route>
      <Route path="/chatemployee">
          <ChatEmployee/>
      </Route>
      <Route path="/knowledgeemp">
          <Knowledgeemp/>
      </Route>
      <Route path="/chat">
          <Chat/>
      </Route>
      <Route path="/faq">
          <Faq/>
      </Route>
      <Route path="/knowledge">
          <Knowledge/>
      </Route>
      <Route path="/developers">
          <Developers/>
      </Route>
      <Route path="/contact">
          <Contac/>
      </Route>
      <Route path="/sign-in">
          <SignIn/>
      </Route>
      <Route path="/register">
          <Register/>
      </Route>
      <Route path="/">
      <div className="main">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 row_mn_main order-md-2">
                    <div className="banner_sm col-sm-12">Últimas actualizaciones</div>
                    <LastUpdates/>
                    <div className="float-right">
                        ¿Buscas algo en concreto? <a href="#" className="ml-md-3">¡Explora
                            con nosotros!</a>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row justify-content-center">
                        <div className="banner_sm col-sm-12">Categorías</div>
                        <ul className="list-group col-4 category_cont" id="home_category_1">
                            <li className="card_icon" ><i className="material-icons">keyboard</i>
                                <span>Hardware</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_2">
                            <li className="card_icon" ><i className="material-icons">api</i>
                                <span>Software</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_3">
                            <li className="card_icon" ><i className="material-icons">build_circle</i>
                                <span>Mantenimiento</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_4">
                            <li className="card_icon" ><i className="material-icons">laptop</i>
                                <span>Ordenadores Completos</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_5">
                            <li className="card_icon" ><i className="material-icons">add_box</i>
                                <span>Modding</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_6">
                            <li className="card_icon" ><i
                                    className="material-icons">sports_esports</i>
                                <span>Juegos</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_7">
                            <li className="card_icon" ><i
                                    className="material-icons">ad_units</i>
                                <span>Moviles</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category8">
                            <li className="card_icon" ><i className="material-icons">outlet</i>
                                <span>Electronica de Consumo</span>
                            </li>
                        </ul>
                        <ul className="list-group col-4 category_cont" id="home_category_9">
                            <li className="card_icon" ><i className="material-icons">signal_wifi_4_bar</i>
                                <span>Internet y Conectividad</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </Route>
    </Switch>
    <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
        <div className='modal-content'>
            <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>Actualizar Contraseña</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
            </button>
            </div>
            <div className='modal-body'>
            <form>
                <div className='form-group'>
                <label htmlFor='recipient-name' className='col-form-label'>Email:</label>
                <input type='email' className='form-control' id='emails' value={user==null ? "": user.email} disabled/>
            </div>
            <div className='form-group'>
            <label htmlFor='recipient-name' className='col-form-label'>Contraseña antigua:</label>
            <input type='password' className='form-control' name='contraseña' onChange={handleInputChange}/>
                </div>
                <div className='form-group'>
                <label htmlFor='recipient-name' className='col-form-label'>Contraseña nueva:</label>
                <input type='password' className='form-control' name='contraseñaN' onChange={handleInputChange}/>
                </div>
                <div className='form-group'>
                <label htmlFor='recipient-name' className='col-form-label'>Contraseña nueva repeticion:</label>
                <input type='password' className='form-control' name='contraseñaN2' onChange={handleInputChange}/>
                </div>
            </form>
            </div>
            <div className='modal-footer'>
                <button type='button' id='enviars' className='btn btn-success' onClick={actualizar}>Enviar</button>
            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
            </div>
        </div>
        </div>
    </div>
    <footer>
        <div className="sec_footer">
            <span>© 2020 Help Desk | Todos los derechos reservados. Creada con el apoyo de la Universidad Don
                Bosco</span>.
        </div>
    </footer>
    </div>
    </Router>
  
  );
}

export default App;
