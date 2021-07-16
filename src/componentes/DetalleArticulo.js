import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {getArticulo} from '../servicios'
import {
    makeStyles,
    Paper,
    Grid,
    Button,
    Box,
    IconButton,
    Typography,
    Divider,
  } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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
    divider: {
        marginBottom: theme.spacing(1),
    },
    boxGray: {
        backgroundColor: "#2121",
        borderRadius: "4px",
        padding: ".5rem",
        marginBottom: 6,
    },
    link: {
        textDecoration: "none",
        '&:visited': {
            color: theme.palette.primary.main,
        }
    },
  }));
  

const DetalleArticulo = () => {
    const classes = useStyles();
    const {id} = useParams();
    const [articulo, setArticulo] = useState([])

    const fetchData = async () => {
        const response = await getArticulo(id);
        setArticulo(response.data)
    };

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <>
            <Paper className={classes.paper}>
                <Box className={classes.boxTitulo}>
                    <IconButton aria-label="arrow back icon">
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Typography component="h1" variant="h6">{articulo.nombre}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Typography component="p" style={{fontWeight: "500"}}>
                            DOI 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography component="p">
                            {articulo.doi}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Nombre 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography component="p">
                            {articulo.nombre}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Año 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography component="p">
                            {articulo.anio}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Link 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography component="a" target="_blank" color="primary" href={articulo.link} className={classes.link}>
                            {articulo.link}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Tipo de propuesta 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography component="p">
                            {articulo.tipo_propuesta}
                        </Typography>
                    </Grid>
                </Grid>
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Problemática
                        </Typography>
                        <Box>
                            <FileCopyIcon fontSize="small" />
                            <CreateIcon fontSize="small" style={{marginLeft: "4px"}}/>
                        </Box>
                    </Grid>
                </Box>
                <Typography className={classes.boxGray}>
                    {articulo.problematica}
                </Typography>
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Retos
                        </Typography>
                        <Box>
                            <FileCopyIcon fontSize="small" />
                            <CreateIcon fontSize="small" style={{marginLeft: "4px"}}/>
                        </Box>
                    </Grid>
                </Box>
                <Typography className={classes.boxGray}>
                    {articulo.retos === "" ? "No existen retos" : articulo.retos}
                </Typography>
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Descripción
                        </Typography>
                        <Box>
                            <FileCopyIcon fontSize="small" />
                            <CreateIcon fontSize="small" style={{marginLeft: "4px"}}/>
                        </Box>
                    </Grid>
                </Box>
                <Typography className={classes.boxGray}>
                    {articulo.descripcion}
                </Typography>
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography component="p" style={{fontWeight: "500"}}>
                            Brechas
                        </Typography>
                        <Box>
                            <FileCopyIcon fontSize="small" />
                            <CreateIcon fontSize="small" style={{marginLeft: "4px"}}/>
                        </Box>
                    </Grid>
                </Box>
                <Typography className={classes.boxGray}>
                    {articulo.brechas === "" ? "No existen brechas" : articulo.brechas}
                </Typography>
            </Paper>
        </>
    )
}


export default DetalleArticulo
