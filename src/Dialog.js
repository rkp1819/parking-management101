import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
export default function AlertDialog(props) {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const [registrationId, setRegistrationId] = React.useState("");

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!props.occupied ? " Park your vehicle here?. " : " Checking out? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please provide the Vehicle Registration Id.
          </DialogContentText>
          <TextField
            id="registrationId"
            value={registrationId}
            label="Registration Id "
            required
            onChange={(event) => {
              let val = event.target.value;
              setRegistrationId(val);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRegistrationId("");
              handleClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              let val = registrationId;
              setRegistrationId("");
              if (val) props.makeAmove(val);
            }}
            color="primary"
            autoFocus
          >
            {props.occupied ? "Checkout" : "Park"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
