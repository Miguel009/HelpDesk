import './css/faqs.css';
function Faq() {
    return (
        <div class="main">
        <div class="container-fluid">
            <h2 id="title-faq">Preguntas Frecuentes (FAQ)</h2>
        </div>
        <div class="accordion" id="faqgroup">
            <div class="card">
                <div class="card-header collapse-background" id="faq1">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target="#coll1"
                            aria-expanded="true"
                            aria-controls="coll1"
                        >
                            <i class="material-icons">text_snippet</i>
                            <p>¿En qué consiste un mantenimiento informático?</p>
                        </button>
                    </h2>
                </div>
                <div
                    id="coll1"
                    class="collapse show"
                    aria-labelledby="faq1"
                    data-parent="#faqgroup"
                >
                    <div class="card-body content">
                        Son las acciones llevadas a cabo para para cubrir las necesidades
                        o incidencias técnicas que surjan en su empresa y a la vez
                        mantener en perfecto estado el funcionamiento de todo el sistema
                        informático, tanto la parte del hardware cómo la parte del
                        software.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header collapse-background" id="faq2">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target="#coll2"
                            aria-expanded="false"
                            aria-controls="coll2"
                        >
                            <i class="material-icons">text_snippet</i>
                            <p>
                                ¿Cómo es un servicio de mantenimiento profesional y en qué se
                                diferencia este de otros servicios?
                            </p>
                        </button>
                    </h2>
                </div>
                <div
                    id="coll2"
                    class="collapse"
                    aria-labelledby="faq2"
                    data-parent="#faqgroup"
                >
                    <div class="card-body content">
                        Las personas que están detrás de este servicio deben de estar
                        constantemente actualizando sus conocimientos y dando un servicio
                        integral, ya que la informática es un mundo muy amplio y cambia
                        cada día. El servicio más importante a tener en cuenta, es la
                        prevención ante cualquier tipo de incidencia, en este sentido
                        ahorraremos en costes. Asesoramiento gratuito y presupuestos
                        detallados con cada servicio.
                        <br /><br />
                        Finalmente, un adjetivo que define un servicio profesional es la
                        proactividad, es decir, iniciativa en la búsqueda de soluciones.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header collapse-background" id="faq3">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target="#coll3"
                            aria-expanded="false"
                            aria-controls="coll3"
                        >
                            <i class="material-icons">text_snippet</i>
                            <p>¿Cómo es un mantenimiento informático preventivo?</p>
                        </button>
                    </h2>
                </div>
                <div
                    id="coll3"
                    class="collapse"
                    aria-labelledby="faq3"
                    data-parent="#faqgroup"
                >
                    <div class="card-body content">
                        Un mantenimiento preventivo consiste en la conservación de equipos
                        o instalaciones mediante realización de revisiones y reparaciones,
                        así como implantación y análisis de sistemas de seguridad y
                        automatización de copias de seguridad que garanticen su buen
                        funcionamiento y fiabilidad, para evitar el mayor número de
                        incidencias informáticas.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header collapse-background" id="faq4">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target="#coll4"
                            aria-expanded="false"
                            aria-controls="coll4"
                        >
                            <i class="material-icons">text_snippet</i>
                            <p>¿Qué es el mantenimiento correctivo?</p>
                        </button>
                    </h2>
                </div>
                <div
                    id="coll4"
                    class="collapse"
                    aria-labelledby="faq4"
                    data-parent="#faqgroup"
                >
                    <div class="card-body content">
                        Se denomina mantenimiento correctivo, a aquel que corrige los
                        defectos observados en los equipamientos o instalaciones, es la
                        forma más básica de mantenimiento y consiste en localizar averías
                        o defectos y corregirlos o repararlos. Históricamente es el primer
                        concepto de mantenimiento que se planteo, y el único hasta la
                        primera guerra mundial, dada la simplicidad de las maquinas,
                        equipamientos e instalaciones de la época, mantenimiento era
                        sinónimo de reparar aquello que estaba averiado.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header collapse-background" id="faq5">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target="#coll5"
                            aria-expanded="false"
                            aria-controls="coll5"
                        >
                            <i class="material-icons">text_snippet</i>
                            <p>¿Cuándo se debe dar mantenimiento correctivo?</p>
                        </button>
                    </h2>
                </div>
                <div
                    id="coll5"
                    class="collapse"
                    aria-labelledby="faq5"
                    data-parent="#faqgroup"
                >
                    <div class="card-body content">
                        El mantenimiento correctivo es necesario cuando alguno de los
                        componentes deja de funcionar completamente o parcialmente. El
                        mantenimiento correctivo es el proceso por el cual se le reparan
                        los daños sufridos por el desgaste, fallas eléctricas o suciedad,
                        este mantenimiento se encarga de reparar daños sufridos, como
                        puede ser una simple soldadura, un cambio de tarjeta o el cambio
                        de algún dispositivo periférico.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header collapse-background" id="faq6">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target="#coll6"
                            aria-expanded="false"
                            aria-controls="coll6"
                        >
                            <i class="material-icons">text_snippet</i>
                            <p>
                                ¿Cuáles son las medidas de seguridad para dar una manteniendo
                                correctivo?
                            </p>
                        </button>
                    </h2>
                </div>
                <div
                    id="coll6"
                    class="collapse"
                    aria-labelledby="faq6"
                    data-parent="#faqgroup"
                >
                    <div class="card-body content">
                        Las medidas de seguridad que se deben tomar en cuenta al momento
                        de efectuar el mantenimiento correctivo son:
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                Desconectar la corriente eléctrica para evitar posibles daños
                                en el equipo como descargas eléctricas.
                            </li>
                            <li class="list-group-item">
                                Agarrar los dispositivos con cuidado de las partes que no
                                afecten al equipo.
                            </li>
                            <li class="list-group-item">
                                Contar con un espacio limpio y ordenado para evitar perdida de
                                tornillos o daños en el dispositivo a cambiar.
                            </li>
                            <li class="list-group-item">
                                Contar con las herramientas necesarias para evitar daños al
                                equipo como la pulsera antiestática, desarmadores.
                            </li>
                            <li class="list-group-item">
                                Conocer que pieza vamos a reparar o a cambiar para evitar
                                mover dispositivos innecesarios.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }

  export default Faq;