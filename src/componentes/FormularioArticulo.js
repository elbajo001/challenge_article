import React, {useState} from 'react'
// import {Formik, Field, Form} from 'formik'
import {addArticulo} from '../servicios'
import {
  makeStyles,
  Paper,
  Grid,
  Button,
  Box,
  IconButton,
  Typography,
  TextField,
  Divider,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(0),
    },
    paper: {
      padding: theme.spacing(0, 4),
      paddingBottom: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    typography: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    button: {
        display: "block",
        margin: "1rem auto",
    },
    boxTitulo: {
        position: "relative",
        '& > button': {
            position: "absolute",
            left: "-1rem",
            top: "12px",
        },
        '& > h1': {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            padding: "20px",
            height: "100%",
        },
    },
    textFieldMd: {
        marginTop: "10px",
        minWidth: "50px",
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
  }));
  
  const FormularioArticulo = () => {
    const classes = useStyles();
    const [doi, setDoi] = useState('')
    const [nombre, setNombre] = useState('')
    const [anio, setAnio] = useState('')
    const [link, setLink] = useState('')
    const [tipoPropuesta, setTipoPropuesta] = useState('')
    const [problematica, setProblematica] = useState('')
    const [retos, setRetos] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [brechas, setBrechas] = useState('')
    const [aceptado, setAceptado] = useState(false)
    // Alerta
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [msg, setMsg] = React.useState('');
    const [type, setType] = React.useState('');
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) =>  {
        switch (e.target.name) {
            case 'doi':
                setDoi(e.target.value);
                break;
            case 'nombre':
                setNombre(e.target.value);
                break;
            case 'anio':
                setAnio(e.target.value);
                break;
            case 'link':
                setLink(e.target.value);
                break;
            case 'tipoPropuesta':
                setTipoPropuesta(e.target.value);
                break;
            case 'problematica':
                setProblematica(e.target.value);
                break;
            case 'retos':
                setRetos(e.target.value);
                break;
            case 'descripcion':
                setDescripcion(e.target.value);
                break;
            case 'brechas':
                setBrechas(e.target.value);
                break;
            case 'aceptado':
                setAceptado(e.target.checked);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {/* 
        console.log(doi);
        console.log(nombre);
        console.log(anio);
        console.log(link);
        console.log(tipoPropuesta);
        console.log(problematica);
        console.log(retos);
        console.log(descripcion);
        console.log(brechas); */
        if (doi === '' || nombre === '' || anio === '' || link === '' || tipoPropuesta === '' || problematica === '' || descripcion === '') {
            setMsg('Por favor completa todos los campos')
            setType('warning')
            setOpen(true);
        } else {
            addArticulo(
                {
                    "doi": doi,
                    "nombre": nombre,
                    "anio": anio,
                    "link": link,
                    "tipo_propuesta": tipoPropuesta,
                    "problematica": problematica,
                    "retos": retos,
                    "descripcion": descripcion,
                    "brechas": brechas,
                    "aplica": aceptado
                }
            ).
            then(() => {
                setMsg('Artículo agregado correctamete')
                setType('success')
                setOpen(true);
                setDoi('');
                setNombre('');
                setAnio('');
                setLink('');
                setTipoPropuesta('');
                setProblematica('');
                setRetos('');
                setDescripcion('');
                setBrechas('');
                setAceptado(false);
            }).catch((error) => {
                console.log(error);
            })
        }
        e.preventDefault()
    }
    return (
        <>
            <Paper className={classes.paper}>
                <Box className={classes.boxTitulo}>
                    <IconButton aria-label="arrow back icon">
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Typography component="h1" variant="h6">Agregar Artículo</Typography>
                </Box>                    
                <Grid container direction="column" lg={12} >
                    <form method="post" onSubmit={handleSubmit}>
                        <Grid item xs={12} lg={6} style={{display: "flex", flexDirection: "column"}}>
                            <TextField
                                className={classes.textFieldMd}
                                label="Doi *"
                                id="input-doi"
                                placeholder="Ingrese doi del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="doi"
                                value={doi}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                className={classes.textFieldMd}
                                label="Nombre *"
                                id="input-nombre"
                                placeholder="Ingrese nombre del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                className={classes.textFieldMd}
                                label="Año *"
                                type="number"
                                id="input-año"
                                placeholder="Ingrese año de publicación del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="anio"
                                value={anio}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                className={classes.textFieldMd}
                                label="Link *"
                                id="input-link"
                                placeholder="Ingrese el link del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="link"
                                value={link}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                className={classes.textFieldMd}
                                label="Tipo de propuesta *"
                                id="input-tipo-propuesta"
                                placeholder="Tipo de propuesta del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="tipoPropuesta"
                                value={tipoPropuesta}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid item lg={12}>
                            <TextField
                                fullWidth
                                multiline
                                label="Problemática *"
                                id="input-problematica"
                                placeholder="Ingrese la problemática del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="problematica"
                                value={problematica}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                style={{marginTop: "10px"}}
                                fullWidth
                                multiline
                                label="Retos"
                                id="input-retos"
                                placeholder="Ingrese los retos del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="retos"
                                value={retos}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                style={{marginTop: "10px"}}
                                fullWidth
                                multiline
                                label="Descripción *"
                                id="input-descripcion"
                                placeholder="Ingrese la descripción del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="descripcion"
                                value={descripcion}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                style={{marginTop: "10px"}}
                                fullWidth
                                multiline
                                label="Brechas"
                                id="input-brechas"
                                placeholder="Ingrese las brechas del artículo"
                                variant="outlined"
                                size="small"
                                spellCheck="false"
                                name="brechas"
                                value={brechas}
                                onChange={(e) => handleChange(e)}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={aceptado}
                                    onChange={(e) => handleChange(e)}
                                    name="aceptado"
                                    color="primary"
                                />
                                }
                                label="Aceptado"
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.button}
                        >Agregar</Button>
                    </form>
                </Grid>
            </Paper>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                // message={msg}
                key={transition ? transition.name : ''}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}	
            >
                <Alert onClose={handleClose} severity={type}>
                    {msg}
                </Alert>          
            </Snackbar>
        </>
    )
}

export default FormularioArticulo
