import React from "react";


const Rules = () => {
  const rules = [
    {
      id: 1,
      text: "Regla 1: Aparcar correctamente, en una única plaza de aparcamiento, sin juntar varios vehículos y sin pasar varias noches en el mismo lugar. Mantén una distancia de cortesía y saludo a otros viajeros.",
      img: "https://vantrackblog.com/wp-content/uploads/2022/07/dolomitas-en-furgoneta-o-autocaravana-768x513.webp"
    },
    {
      id: 2,
      text: "Regla 2: Me presento cuando llego, respeto a los animales y el ritmo de vida del lugar. Pido permiso antes de desempacar mis instalaciones al aire libre (incluyendo la barbacoa) y llevar a mis mascotas afuera.",
      img: "https://images1.autocasion.com/actualidad/wp-content/uploads/2023/12/Flowcamper-Fellschnute-dog-campervan-9-1140x570-1.jpg"
    },
    {
      id: 3,
      text: "Regla 3: Evito acampar en la vía pública. No pongo accesorios en el exterior (calzos de ruedas, toldo, mesa, tienda de campaña...) ni dañar la imagen de los viajeros nómadas.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSW_dWXOGFO7kJ4PttzMTNfwSzocDD4Arm4g&s"
    },
    {
      id: 4,
      text: "Regla 4: Dreno mis aguas negras y grises exclusivamente en áreas reservadas a estos servicios, nunca en la naturaleza. ¡Miles de lugares específicos existen en la aplicación! Y participo en los costos de cualquier servicio pagado.",
      img: "https://yescapa.twic.pics/blog/media/images/1-aguas-ac.max-2000x2000.jpg?twic=v1/focus=auto/cover=1200x630"
    },
  ];

  return (
    <div className="rules-container">
      <h1 className="rules-title">PROTEGEMOS LA NATURALEZA</h1>
      <div className="rules-cards">
        {rules.map((rule) => (
          <div className="rule-card" key={rule.id}>
            <img src={rule.img} alt={`Regla ${rule.id}`} className="rule-image" />
            <p className="rule-text">{rule.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
