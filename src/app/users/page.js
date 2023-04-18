"use client";
import api from '@/services/api';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";


const Users = () => {

    const [cedula, setCedula] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ciSelect, setCiSelect] = useState("");

  const baseURL = "https://multipay.encom.com.py/api/users";
  const body = {
    ci: cedula,
    cellphone: phone,
    email,
  };

  useEffect(() => {
    api
      .get(baseURL)
      .then((response) => {
        // console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function createUser() {
    const url = "https://multipay.encom.com.py/api/users";
    api
      .post(url, body)
      .then((response) => {
        // console.log(response);
        setCedula("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addCard(use) {
    const url = "https://multipay.encom.com.py/api/cards";
    const body = {
      ci: use.ci,
      cellphone: use.cellphone,
      email: use.email,
      status_url: "https://prueba.encom.com.py/agregado",
    };
    api
      .post(url, body)
      .then((response) => {
        console.log(response);
        Bancard.Cards.createForm(
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

  function viewCards(ci) {
    const url = `https://multipay.encom.com.py/api/cards/${ci}`;

    api
      .get(url)
      .then((response) => {
        // console.log(response);
        setCard(response.data.cards);
        setCiSelect(ci);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCard(use) {
    // console.log(use.alias_token);

    Swal.fire({
      title: "Desvincular Tarjeta",
      text: "¿Seguro que quieres desvincular esta tarjeta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ACEPTAR!",
      cancelButtonText: "CANCELAR",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const url = `https://multipay.encom.com.py/api/cards/${ciSelect}`;
          let alias_token = use.alias_token;
          api
      .post(url, {
        "_method": "DELETE",
        "alias_token": alias_token,
      })
      .then((response) => {
        // console.log(response);
          viewCards(ciSelect)
      })
      .catch((error) => {
        console.log(error);
      });
        } catch (error) {
          console.log(error);
        }
      }
    });

    
  }

    return (
        <div className='text-center' style={{ width: "80%", marginTop: "50px" }}>
      <div>
        <Link
          href="/inicio"
          className="btn btn-rounded btn-block btn-info text-u-c font-bold text-center"
        >
          Regresar al inicio
        </Link>
      </div>
      <div className='pt-2'>
        <button
          type="button"
          className="btn btn-rounded btn-block btn-info text-u-c font-bold text-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setIsOpenModal(true)}
        >
          Crear usuario
        </button>
      </div>
      <div style={{ marginTop: "50px" }}>
        <h1>Lista de Usuarios</h1>
        {users && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">CI</th>
                <th scope="col">Telefono</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((use) => (
                <tr style={{ borderBottomStyle: "hidden" }} key={use.id}>
                  <td className="text-s-t pointer">
                    {new Intl.NumberFormat("de-DE").format(use.ci)}
                  </td>
                  <td className="text-s-t pointer">{use.cellphone}</td>
                  <td className="text-s-t pointer">{use.email}</td>
                  <td className="text-s-t pointer">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={() => addCard(use)}
                      style={{ backgroundColor: "black" }}
                    >
                      Añadir tarjeta
                    </button>
                  </td>
                  <td className="text-s-t pointer">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal3"
                      onClick={() => viewCards(use.ci)}
                      style={{ backgroundColor: "black" }}
                    >
                      Ver tarjetas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {isOpenModal && (
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
                  Agregar Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form id="entityForm">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control name mt-2"
                      // placeholder={valueInput.name}
                      // value={newName}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">
                      Documento de identidad
                    </label>
                    <input
                      type="text"
                      name="ulid"
                      className="form-control name mt-2"
                      // placeholder={valueInput.lid}
                      // value={newLid}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Telefono</label>
                    <input
                      type="text"
                      className="form-control name mt-2"
                      // placeholder={valueInput.phone}
                      // value={newPhone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer justify-content-center ps-0">
                    <button
                      type="button"
                      className={`btn btn-rounded btn-block btn-info text-u-c font-bold text-center`}
                      onClick={createUser}
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AÑADIR TARJETA*/}
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Agregar Tarjeta al Usuario
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

      {/* MODAL LISTAR TARJETA */}
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Listas de Tarjetas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Brand</th>
                    <th scope="col">Numero de tarjeta</th>
                    <th scope="col">Typo</th>
                    <th scope="col">Vencimiento</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {card.length !== 0 ? (
                    card.map((use) => (
                      <tr
                        style={{ borderBottomStyle: "hidden" }}
                        key={use.card_id}
                      >
                        <td className="text-s-t pointer">{use.card_brand}</td>
                        <td className="text-s-t pointer">
                          {use.card_masked_number}
                        </td>
                        <td className="text-s-t pointer">{use.card_type}</td>
                        <td className="text-s-t pointer">
                          {use.expiration_date}
                        </td>
                        <td className="text-s-t pointer">
                          <button
                            onClick={() => deleteCard(use)}
                            style={{ backgroundColor: "black" }}
                          >
                            Eliminar Tarjeta
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ borderBottomStyle: "hidden" }}>
                      <td colSpan="4" className="text-s-t pointer">
                        No hay tarjeta...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Users;
