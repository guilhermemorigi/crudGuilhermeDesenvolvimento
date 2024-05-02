import "./card.css";

import React, { useState } from "react";

import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        category={props.category}
        cost={props.cost}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h2 className="card-title">{props.name}</h2>
        <p className="card-id">ID: {props.id}</p>
        <p className="card-category">Categoria: {props.category}</p>
        <h3 className="card-cost">Preço: R${props.cost}</h3>
      </div>
    </div>
  );
}
