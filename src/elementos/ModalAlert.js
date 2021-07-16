import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalAlert = ({open, onClose, setResponseModal, nombreArticulo}) => {
    const handleDelete = () => {
        setResponseModal(true)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Eliminar artículo</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Estás seguro que quieres eliminar <strong>{nombreArticulo}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                No, cancelar
            </Button>
            <Button onClick={() => handleDelete()} color="primary" autoFocus>
                Sí, eliminar
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalAlert
