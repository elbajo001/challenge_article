import React, { useState, useEffect } from 'react'
import {getArticulos, deleteArticulo} from '../servicios'
import {
  makeStyles,
  CssBaseline,
  Paper,
  Grid,
  Button,
  Snackbar,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FormularioArticulo from './FormularioArticulo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";
import DetalleArticulo from './DetalleArticulo';
import MuiAlert from '@material-ui/lab/Alert';
import ModalAlert from '../elementos/ModalAlert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(0),
  },
  typography: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  grid: {
    margin: theme.spacing(1), 
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: "6px auto",
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    textAlign: "left",
  },
  panel: {
    maxHeight: "10rem",
    overflowY: "auto",
    padding: theme.spacing(1),
    textAlign: 'left',
    whiteSpace: 'nowrap',
    margin: theme.spacing(1),
  },
  table: {
    width: "100%",
  },
  tableContainer: {
    margin: "8px",
    width: "auto",
    padding: "0 8px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    '&:hover': {
      fontWeight: "bold",
    },
  },
  icon: {
    fill: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    '&:hover': {
      fill: theme.palette.text.primary,
    },
  },
  iconSelect: {
    '& > * > svg': {
      visibility : "hidden",
      overflow: "hidden",
      opacity: 0,
    },
    '&:hover *': {
      visibility : "visible",
      opacity: 1,
    }
  },
}));

const ListaArticulos = ({match, location, history}) => {
    const classes = useStyles()
    // const history = useHistory()
    const [articulos, setArticulos] = useState([])
    const [idArticulo, setIdArticulo] = useState(null)
    const [nombreArticulo, setNombreArticulo] = useState('')
    const [articuloEliminado, setArticuloEliminado] = useState(false)

    // Alerta
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [msg, setMsg] = React.useState('');
    const [type, setType] = React.useState('');
    
    const handleClose = () => {
      setOpen(false);
    };  

    // Modal
    const [openModal, setOpenModal] = React.useState(false);
    const [responseModal, setResponseModal] = React.useState(false);
    
    const handleCloseModal = () => {
      setOpenModal(false);
      console.log(articuloEliminado)
    };  

    const fetchData = async () => {
      const response = await getArticulos();
      setArticulos(response.data)
    };
    
    useEffect(() => {
      fetchData()
    }, [articulos])
    
    useEffect(() => {
      if (responseModal) {
        /* deleteArticulo(idArticulo)
        .then(() => {
          handleCloseModal()
          setMsg('Articulo eliminado satisfactoriamente')
          setType('success')
          setOpen(true)
          setResponseModal(false)
          setArticuloEliminado(true)
        }) */
        setResponseModal(false)
        handleCloseModal()
        setArticuloEliminado(!articuloEliminado)
      }
    }, [responseModal])

    const handleDeleteArticulo = (id, nombre) => {
      setOpenModal(true)
      setIdArticulo(id)
      setNombreArticulo(nombre)
    }

    return (
      <Router>
        <Grid container spacing={0}>
          <CssBaseline />
          <Grid item xs={12} md={3}>
            <Link to="/" style={{color: "#fff", textDecoration: "none"}}>
              <Button
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AddIcon />}
              >
                Agregar artículo
              </Button>
            </Link>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{width: "20px"}}>Id</TableCell>
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="right"><DeleteIcon fontSize="small" className={classes.icon}/></TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articulos.map((articulo) => (
                    <TableRow key={articulo.id} className={classes.iconSelect}>
                      <TableCell align="center" size="small" component="th" scope="row">
                        {articulo.id}
                      </TableCell>
                      <TableCell align="left" size="small">
                        <Link className={classes.link} to={"/articulo/"+articulo.id}>{articulo.nombre}</Link>
                      </TableCell>
                      <TableCell size="small">
                        <DeleteIcon fontSize="small" className={classes.icon} onClick={() => handleDeleteArticulo(articulo.id, articulo.nombre)}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item container xs={12} md={9} >
            <Grid item xs={12} lg={12}>
              <Switch>
                <Route exact path="/articulo/:id">
                    {articuloEliminado ? <Redirect to="/"/> : <DetalleArticulo />}
                </Route>
                <Route path="/">
                  <FormularioArticulo />
                </Route>
              </Switch>
            </Grid> 
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          onClose={handleClose}
          key={transition ? transition.name : ''}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}	
        >
          <Alert onClose={handleClose} severity={type}>
              {msg}
          </Alert>          
        </Snackbar>
        <ModalAlert 
          open={openModal}
          onClose={handleCloseModal}
          setResponseModal={setResponseModal}
          nombreArticulo={nombreArticulo}
        />
      </Router>
    )
}

export default ListaArticulos
