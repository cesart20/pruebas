"use client";
import React, {useState} from 'react';
import PinInput from "react-pin-input";
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter();
  const [pins, setPins] = useState("");

  function verificacion(pin) {
    if (pin === "1234") {
      return router.push("/inicio");
    } else {
      alert("Pin incorrecto introduzca: 1234");
      pins.clear();
    }
  }


  return (
    <div className="App">
      <div>
        <div>
          <div>
            <h1>Iniciar Sesion</h1>

            <div id="lockCircles" className="col-xs-12 no-padder m-b animated">
              <PinInput
                length={4}
                focus
                ref={(n) => {
                  setPins(n);
                }}
                secret
                onComplete={(value) => verificacion(value)}
                type="numeric"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

