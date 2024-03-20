import React, {useEffect} from 'react';
import css from './Header.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux";
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';

const Header = () => {

    const {currentUser} = useAppSelector(state => state.auth);
    const access=authService.getAccessToken();
    const dispatch=useAppDispatch();
    const navigate=useNavigate()


    useEffect(()=>{
        if (access && !currentUser){
        dispatch(authActions.me())
        }
    },[])


    return (
        <AppBar position="static" color={'inherit'}>
            <Container maxWidth="xl" sx={
                {
                    'display':'flex',
                    'justifyContent':'space-between'
                }
            }>
                <Toolbar disableGutters>

                    <Typography
                        variant="h5"
                        noWrap

                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',

                        }}
                    >
                        CARS
                    </Typography>
                </Toolbar>
                <Toolbar>
                        <Button

                           color={'inherit'}
                           onClick={()=>navigate('/login')}
                        >
                            Login

                        </Button>
                    <Button

                           color={'inherit'}
                           onClick={()=>navigate('/register')}
                        >
                            Register

                        </Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export {Header};