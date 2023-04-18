"use client";
import React from 'react';
import Link from 'next/link'

const Page = () => {
    return (
        <div className="text-center hidden-xs hidden-print">
      <div>
        <h2>Menu Principal</h2>
      </div>
      <div>
        <Link
          className="btn btn-rounded btn-block btn-info text-u-c font-bold"
          href="/pago"
          style={{ marginLeft: "10px" }}
          // onClick={() => setIsOpenPagos(!isOpenPagos)}
        >
          Pagar
        </Link>
        <Link
          className="btn btn-rounded btn-block btn-info text-u-c font-bold"
          href="/users"
          style={{ marginLeft: "10px" }}
          // onClick={() => setIsOpenUser(!isOpenUser)}
        >
          Lista de Usuario
        </Link>
        {/* <Link
          className="btn btn-rounded btn-block btn-info text-u-c font-bold"
          to="/agregado"
          style={{ marginLeft: "10px" }}
          // onClick={() => setIsOpenUser(!isOpenUser)}
        >
          Agregado
        </Link> */}
      </div>
    </div>
    );
}

export default Page;
