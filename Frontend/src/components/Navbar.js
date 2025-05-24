import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  List,
  Grid,
  GridItem,
  ListItem,
  ListIcon,
  Box,
  Image,
  Flex
} from '@chakra-ui/react';

export default function Navbar() {
  //svaka komponenta/ekran treba znati koju ulogu ima trenutni korisnik
  const role = sessionStorage.getItem('role');
  console.log('role u navbaru: ', role);

  const listaAnoniman = ['Početna', 'Prijava', 'Info', 'Kontakt'];

  const listaKandidat = ['Početna', 'Info', 'Profil', 'Napredak', 'Odjava'];

  const listaInstruktor = ['Početna', 'Info', 'Profil', 'Kandidati', 'Odjava'];

  const listaAdministrator = [
    'Početna',
    'Info',
    'Profil',
    'Instruktori',
    'Kandidati',
    'Registriraj',
    'Odjava'
  ];

  const putanje = {
    Početna: '/home',
    Prijava: '/login',
    Info: '/info',
    Kontakt: '/contact',
    Profil: '/profil', //tu cu trebat neki id slati
    Napredak: '/progress', //isto id
    Odjava: '/logout',
    Kandidati: '/candidates', //isto id
    Instruktori: '/instructors',
    Registriraj: '/register'
  };

  let lista;
  if (role === 'kandidat') {
    lista = listaKandidat;
  } else if (role === 'instruktor') {
    lista = listaInstruktor;
  } else if (role === 'administrator') {
    lista = listaAdministrator;
  } else {
    lista = listaAnoniman;
  }

  return (
    <Grid
      templateColumns="repeat(6,1fr)"
      as="nav"
      p="10px"
      alignItems="center"
      justifyContent="space-between"
      paddingBottom="1em"
      fontFamily="revert-layer"
    >
      <GridItem
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/images/Logo.png"
          alt="Logo"
          minWidth="20em"
          minHeight="10em"
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, lg: 4, xl: 5 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box borderRadius="full" bg="RGBA(0, 0, 0, 0.06)">
          <List
            display="flex"
            color="black"
            fontSize="1.5em"
            alignItems="center"
            justifyContent="center"
            paddingRight="5em"
            paddingLeft="5em"
          >
            {lista.map((stavka) => (
              <ListItem
                key={stavka}
                margin=".5em"
                padding=".5em"
                _hover={{
                  backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                  borderRadius: 'full'
                }}
              >
                <NavLink
                  to={putanje[stavka]}
                  display="flex"
                  alignItems="center"
                >
                  <ListIcon
                    as={ArrowRightIcon}
                    color="black"
                    marginRight="2em"
                  />
                  <Flex alignItems="center">{stavka}</Flex>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
}
