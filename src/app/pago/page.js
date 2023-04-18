"use client";
import api from '@/services/api';
import Link from 'next/link';
import React, {useState} from 'react';


const Page = () => {
  const [amount, setAmount] = useState("");

  const baseURL = "https://multipay.encom.com.py/api/payments/occasional";
  const body = {
    amount,
    currency: "PYG",
  };

  function pagado() {

    api
      .post(baseURL, body)
      .then((response) => {
        Bancard.Checkout.createForm(
          "iframe-container",
          response.data.process_id, // PROCESS_ID
          {
            "form-background-color": "#001b60",
            "button-background-color": "#4faed1",
            "button-text-color": "#fcfcfc",
            "button-border-color": "#dddddd",
            "input-background-color": "#fcfcfc",
            "input-text-color": "#111111",
            "input-placeholder-color": "#111111",
          }
        );


      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <>
      <div className="container">
        <div className='text-center'>
        <Link
          href="/inicio"
          className="btn btn-rounded btn-block btn-info font-bold text-center"
        >
          Regresar al inicio
        </Link>
        </div>
        
        <div className="col text-center font-18 p-4">
          <input
            style={{ color: "#red" }}
            type="text"
            placeholder="Ingresa monto"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='text-center'>
        <button
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={pagado}
          style={{ color: "#fff", background: "#000" }}
        >
          Pagar
        </button>
        </div>
        
      </div>

      {/* MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Pagos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                style={{ height: "100%", width: "100%", margin: "auto" }}
                id="iframe-container"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
