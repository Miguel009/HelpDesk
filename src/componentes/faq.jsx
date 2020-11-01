import './css/faqs.css';
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
function Faq() {
    const faqRef = db.ref('FAQS');
    const [Faqs, setFaqs] = useState([]);
    let FaqNum = 0;
    const getFAQS = async () => {
        faqRef.orderByKey().on('value', snapshot => {
            let docs=[];
            FaqNum=0;
            snapshot.forEach(function(childSnapshot) {
              docs.push({ ...childSnapshot.val(), id: childSnapshot.key, num: FaqNum});
              FaqNum++;
            });
            setFaqs(docs);
          });
      };

    useEffect(() => {
    getFAQS();
    }, []);
    return (
        <div className="main">
        <div className="container-fluid">
            <h2 id="title-faq">Preguntas Frecuentes (FAQ)</h2>
        </div>
        <div className="accordion" id="faqgroup">
        {
        Faqs.map((Faq) => (
            <div className="card" key={Faq.id}>
                <div className="card-header collapse-background" id={"Faq"+Faq.num}>
                    <h2 className="mb-0">
                        <button
                            className="btn btn-link btn-block text-left collapse-header"
                            type="button"
                            data-toggle="collapse"
                            data-target={"#coll"+Faq.num}
                            aria-expanded="false"
                            aria-controls={"coll"+Faq.num}
                        >
                            <i className="material-icons">text_snippet</i>
                            <p>{Faq.Problema}</p>
                        </button>
                    </h2>
                </div>
                <div
                    id={"coll"+Faq.num}
                    className="collapse"
                    aria-labelledby={"Faq"+Faq.num}
                    data-parent="#faqgroup"
                >
                    <div className="card-body content">
                        {Faq.Solucion}
                    </div>
                </div>
            </div>
        )
        )}
        </div>
        </div>
    );
  }

  export default Faq;