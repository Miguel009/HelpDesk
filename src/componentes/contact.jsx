function Contac() {
    return (
        <div className="main">
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-9">
                    <div className="content_contact">
                        <div className="row">
                            <div className="col-10 offset-1">
                                <h4>Dejanos un mensaje</h4>
                            </div>
                        </div>
                    </div>
                    <form className="form_content_contact">
                        <div className="row">
                            <div className="form-group col-10 offset-1">
                                <label htmlFor="formGroupExampleInput" class="label_contact">Ingresa tu nombre y apellido</label>
                                <input type="text" className="form-control form_text_label" id="formGroupExampleInput" placeholder="Nombre y apellido"/>
                            </div>
                            <div className="form-group col-10 offset-1">
                                <label htmlFor="formGroupExampleInput2" class="label_contact">Ingresa tu número de contacto</label>
                                <input type="text" className="form-control form_text_label" id="formGroupExampleInput2" placeholder="Número de contacto"/>
                            </div>
                            <div className="form-group col-10 offset-1">
                                <label htmlFor="exampleInputEmail1" class="label_contact">Ingresa tu correo electrónico</label>
                                <input type="email" className="form-control form_text_label" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-lg-3">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.1970402687566!2d-89.23323728517003!3d13.706512890376738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633015b90a41cf%3A0x2f3e64c79d7fae09!2sFlacso%20El%20Salvador!5e0!3m2!1ses!2ssv!4v1602735926666!5m2!1ses!2ssv" 
                        className="map_contact"
                        height="450" 
                        frameBorder="0" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        aria-hidden="false" 
                        tabIndex="0">
                    </iframe>
                    <p className="label_info_contact">Número de contacto: +503 2255-5555</p>
                    <p className="label_info_contact">Correo: help-desk@helpdesk.com</p>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default Contac;