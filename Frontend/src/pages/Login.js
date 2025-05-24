import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Image,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  useToast,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = () => {
    //logika za provjeru
    console.log('Email:', email);
    console.log('Password:', password);
    const data = {
      email: email,
      password: password
    };

    //slanje na backend
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No user found');
        }
        return response.json();
      })
      .then((response) => {
        const token = response.token;
        const role = response.role;
        //console.log('token: ', token);
        //console.log('role: ', role);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);
        console.log('role in login: ', localStorage.getItem('role'));
        navigate('/home');

        //izgeneriraj Toast komponentu za uspjesan login
        toast({
          title: 'Uspješna prijava!',
          description: 'Uspješno ste se prijavili.',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      })
      .catch((error) => {
        //izgeneriraj Toast komponentu za neuspjesan login
        toast({
          title: 'Neuspješna prijava!',
          description: 'Prijava nije uspješna. Provjerite unesene podatke.',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid
        justifyContent="center"
        alignItems="center"
        backgroundColor="RGBA(0, 0, 0, 0.08)"
        marginTop="5em"
      >
        <GridItem display="flex" justifyContent="center">
          <Text fontSize="2xl" textAlign="center">
            Nemaš potrebne podatke za prijavu? Kontaktiraj autoškolu putem
            kontaktnog obrasca klikom na "Kontakt".
          </Text>
        </GridItem>
      </Grid>
      <Box position="relative" width="100%" marginTop="3em" marginBottom="3em">
        <Image
          src="/images/road.jpg"
          alt="driving"
          width="100%"
          height="100%"
          objectFit="cover"
          padding=".5em"
          borderRadius="md"
          backgroundColor="RGBA(0, 0, 0, 0.08)"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          background="RGBA(0, 0, 0, 0.5)"
          padding="1em"
          color="white"
          borderRadius="md"
          width={{ base: '40%', lg: '30%' }}
          height={{ base: '60%', lg: '40%' }}
          fontSize="3em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <FormControl>
            <FormLabel>Email addresa</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Lozinka</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormHelperText color="white">
              Unesite vaše korisničke podatke.
            </FormHelperText>
          </FormControl>
          <Button
            mt={4}
            colorScheme="white"
            color="white"
            type="submit"
            variant="outline"
            borderColor="RGBA(23,24,16)"
            _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
            marginTop={{ base: '1em', lg: '3em' }}
            onClick={handleButtonClick}
          >
            Prijavi se!
          </Button>
        </Box>
      </Box>

      <Footer></Footer>
    </>
  );
}
