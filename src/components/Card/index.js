import React from 'react';
import './style.css';


function Card(props) {

  return (
    <div className="card">
      <p>{props.name}</p>
      <p>{props.age} years old</p>
      <p>{props.email}</p>
      {props.img ? <img src={props.img} alt={props.name}/> : null}
    </div>
  );
}

export default Card;

