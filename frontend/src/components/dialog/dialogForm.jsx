import React, { useState } from "react";

import Axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function CustomDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    cost: props.cost,
    category: props.category,
  });

  const handleChangeValues = (e) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", editValues)
      .then(() => {
        props.setListCard((prevListCard) =>
          prevListCard.map((value) =>
            value.id === editValues.id ? editValues : value
          )
        );
      })
      .catch((error) => {
        console.error("Error editing game:", error);
      })
      .finally(() => {
        handleClose();
      });
  };

  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
      .then(() => {
        props.setListCard((prevListCard) =>
          prevListCard.filter((value) => value.id !== editValues.id)
        );
      })
      .catch((error) => {
        console.error("Error deleting game:", error);
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="modal"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="ID"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do Jogo"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Preço"
            defaultValue={props.cost}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria"
            defaultValue={props.category}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="secondary" onClick={handleDeleteGame}>
            Excluir
          </Button>
          <Button color="primary" onClick={handleEditGame}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
