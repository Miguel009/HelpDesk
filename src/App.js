import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./componentes/chat"
import Contac from "./componentes/contact"
import Developers from "./componentes/developers"
import Faq from "./componentes/faq"
import Knowledge from "./componentes/knowledge"
import Register from "./componentes/register"
import SignIn from "./componentes/sign-in"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
global.jQuery = require('jquery');
require('bootstrap');
function App() {
  return (
    <Router>
      <div>
    <nav className="navbar navbar-expand-lg navcolor_main sticky-top navbar_main">
     <a className="navbar-brand nvb_main_logo" href="/"></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="material-icons">menu</i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link "href="chat">Chat</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="faq">FAQ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="knowledge">Base de Conocimiento</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="developers">Desarrolladores</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="contact">Contactos y Contactanos</a>
                </li>
            </ul>
            <li className="nav-item active nav_li_main">
                <a className="nav-link" data-toggle="modal" data-target="#exampleModal">Iniciar sesión</a>
            </li>
            <li className="nav-item nav_li_main">
                <a className="btn text-white flag_background" id="buton-menu" href="#">Registrarme</a>
            </li>
        </div>
    </nav>
    <div class="banner_welcome">
        <div class="col-md-6">
            <h2>Siempre para ayudar</h2>
            <p class="text-justify">
                Así como creemos totalmente en el producto que brindamos, de la misma forma aspiramos a darte el servicio de soporte que, como nuestro cliente, tu te mereces. Help-desk es nuestra plataforma de auxilio para aquellos usuarios que se han topado con algún contratiempo durante las sesiones de uso de nuestro software
            </p>
        </div>
    </div>
    <Switch>
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
      <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 row_mn_main order-md-2">
                    <div class="banner_sm col-sm-12">Últimas actualizaciones</div>
                    <li class="pb_cont">
                        <img src="./img/avatar.png" alt=""/>
                        <div class="pb_data col-auto mr-auto align-self-center">
                            <h6>¿Pregunta #1 ......... ?</h6>
                            <span class="sm_user"><span class="align-middle">@Usuario1</span></span>
                            <span class="sm_desc"><i class="material-icons align-middle">event</i><span
                                    class="align-middle"> Última
                                    actualización: 30/8/2020</span></span>
                        </div>
                        <div class="flag_rpl flag_green col-auto">
                            <span class="">10</span><span class="flag_rpl_sub">Respuestas</span>
                        </div>
                    </li>
                    <li class="pb_cont">
                        <img src="./img/avatar.png" alt=""/>
                        <div class="pb_data col-auto mr-auto align-self-center">
                            <h6>¿Pregunta #1 ......... ?</h6>
                            <span class="sm_user"><span class="align-middle">@Usuario1</span></span>
                            <span class="sm_desc"><i class="material-icons align-middle">event</i><span
                                    class="align-middle"> Última
                                    actualización: 30/8/2020</span></span>
                        </div>
                        <div class="flag_rpl flag_green col-auto">
                            <span class="">10</span><span class="flag_rpl_sub">Respuestas</span>
                        </div>
                    </li>
                    <li class="pb_cont">
                        <img src="./img/avatar.png" alt=""/>
                        <div class="pb_data col-auto mr-auto align-self-center">
                            <h6>¿Pregunta #1 ......... ?</h6>
                            <span class="sm_user"><span class="align-middle">@Usuario1</span></span>
                            <span class="sm_desc"><i class="material-icons align-middle">event</i><span
                                    class="align-middle"> Última
                                    actualización: 30/8/2020</span></span>
                        </div>
                        <div class="flag_rpl flag_green col-auto">
                            <span class="">10</span><span class="flag_rpl_sub">Respuestas</span>
                        </div>
                    </li>
                    <li class="pb_cont">
                        <img src="./img/avatar.png" alt=""/>
                        <div class="pb_data col-auto mr-auto align-self-center">
                            <h6>¿Pregunta #1 ......... ?</h6>
                            <span class="sm_user"><span class="align-middle">@Usuario1</span></span>
                            <span class="sm_desc"><i class="material-icons align-middle">event</i><span
                                    class="align-middle"> Última
                                    actualización: 30/8/2020</span></span>
                        </div>
                        <div class="flag_rpl flag_green col-auto">
                            <span class="">10</span><span class="flag_rpl_sub">Respuestas</span>
                        </div>
                    </li>
                    <li class="pb_cont">
                        <img src="./img/avatar.png" alt=""/>
                        <div class="pb_data col-auto mr-auto align-self-center">
                            <h6>¿Pregunta #1 ......... ?</h6>
                            <span class="sm_user"><span class="align-middle">@Usuario1</span></span>
                            <span class="sm_desc"><i class="material-icons align-middle">event</i><span
                                    class="align-middle"> Última
                                    actualización: 30/8/2020</span></span>
                        </div>
                        <div class="flag_rpl flag_green col-auto">
                            <span class="">10</span><span class="flag_rpl_sub">Respuestas</span>
                        </div>
                    </li>
                    <li class="pb_cont">
                        <img src="./img/avatar.png" alt=""/>
                        <div class="pb_data col-auto mr-auto align-self-center">
                            <h6>¿Pregunta #1 ......... ?</h6>
                            <span class="sm_user"><span class="align-middle">@Usuario1</span></span>
                            <span class="sm_desc"><i class="material-icons align-middle">event</i><span
                                    class="align-middle"> Última
                                    actualización: 30/8/2020</span></span>
                        </div>
                        <div class="flag_rpl flag_green col-auto">
                            <span class="">10</span><span class="flag_rpl_sub">Respuestas</span>
                        </div>
                    </li>

                    <div class="float-right">
                        ¿Buscas algo en concreto? <a href="#" class="ml-md-3">¡Explora
                            con nosotros!</a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="row justify-content-center">
                        <div class="banner_sm col-sm-12">Categorías</div>
                        <ul class="list-group col-4 category_cont" id="home_category_1">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">chat</i>
                                <span>Categoria #1</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_2">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">accessible</i>
                                <span>Categoria #2</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_3">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">build_circle</i>
                                <span>Categoria #1</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_4">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">bug_report</i>
                                <span>Categoria #2</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_5">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">privacy_tip</i>
                                <span>Categoria #1</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_6">
                            <li class="card_icon" aria-disabled="true"><i
                                    class="material-icons">remove_shopping_cart</i>
                                <span>Categoria #2</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_7">
                            <li class="card_icon" aria-disabled="true"><i
                                    class="material-icons">supervised_user_circle</i>
                                <span>Categoria #1</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category8">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">touch_app</i>
                                <span>Categoria #2</span>
                            </li>
                        </ul>
                        <ul class="list-group col-4 category_cont" id="home_category_9">
                            <li class="card_icon" aria-disabled="true"><i class="material-icons">equalizer</i>
                                <span>Categoria #2</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </Route>
    </Switch>
    <footer>
        <div class="sec_footer">
            <span>© 2020 Help Desk | Todos los derechos reservados. Creada con el apoyo de la Universidad Don
                Bosco</span>.
        </div>
    </footer>
    </div>
    </Router>
  
  );
}

export default App;
