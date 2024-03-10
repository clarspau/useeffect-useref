import React, { useState } from 'react';
import './Card.css';


/** Card: renders a single card. */

function Card({ name, image }) {
     // get these once; it will never be updated for the same card

     const [{ angle, x, y }] = useState({
          angle: Math.random() * 90 - 45,
          x: Math.random() * 40 - 20,
          y: Math.random() * 40 - 20
     });

     const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

     return <img
          className="Card"
          alt={name}
          src={image}
          style={{ transform }}
     />;
}

export default Card;