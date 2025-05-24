import React from 'react';

import { NavLink } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Grid, GridItem, Image, Box, Button, Text } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

export default function Info() {
  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(5,1fr)"
        width="100%"
        fontFamily="revert-layer"
      >
        <GridItem
          colSpan={{ base: '5', lg: '5' }}
          maxH={{ base: '100vh', lg: '100vh' }}
          position="relative"
        >
          <Box
            bg="RGBA(0, 0, 0, 0.06)"
            width="100%"
            height="100%"
            borderRadius="1.5em"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="xl" padding="4em">
              Autoškola "Vožnja +" nije samo obrazovna institucija: to je simbol
              pouzdanosti, kvalitete i posvećenosti sigurnosti u prometu već
              više od dva desetljeća. Naša povijest obiluje uspjesima, izazovima
              i kontinuiranim prilagodbama kako bismo osigurali da naši
              polaznici dobiju najbolju moguću obuku.
              <br />
              <br />
              Kroz godine, naša autoskola postala je sinonim za vrhunsku obuku
              vozačkih vještina i prometne sigurnosti. Osnovana s jasnim ciljem
              - pružiti vrhunsku obuku i stvoriti sigurne i odgovorne vozače -
              postali smo priznata institucija koja je iznjedrila mnoge vozače
              koji voze s povjerenjem i sigurnošću.
              <br />
              <br />
              Neprestano se prilagođavamo promjenjivim potrebama i zahtjevima
              suvremenog prometa. Naša obuka se kontinuirano usavršava kako
              bismo osigurali da naši polaznici dobiju najnovije informacije,
              tehnike i vještine potrebne za sigurno upravljanje vozilima u
              različitim prometnim situacijama.
              <br />
              <br />
              Ponosimo se našom prošlošću i tradicijom, ali istovremeno gledamo
              prema budućnosti s entuzijazmom i predanošću. Uvijek težimo biti
              korak ispred, uvodeći nove metode obuke, tehnologije i pristupe
              kako bismo osigurali da naši vozači budu najbolje pripremljeni za
              izazove na cestama.
              <br />
              <br />
              Autoskola "Sigurna Vožnja" ostaje predana svojoj misiji -
              osposobiti sigurne, odgovorne i samostalne vozače koji će
              doprinijeti sigurnosti i kvaliteti života na cestama.
            </Text>
          </Box>
        </GridItem>

        <GridItem
          colSpan={{ base: '3', lg: '3' }}
          minHeight={{ base: '25vh', lg: '50vh' }}
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Image src="/images/teacherStudent.png" alt="teacher-student"></Image>
        </GridItem>
        <GridItem
          colSpan={{ base: '2', lg: '2' }}
          minHeight={{ base: '25vh', lg: '50vh' }}
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingRight="2em"
        >
          <Text fontSize="xl">
            Imate li dodatna pitanja ili želite saznati više o našim uslugama?
            Naš tim stručnjaka spreman je odgovoriti na vaša pitanja i pružiti
            vam sve potrebne informacije.
            <br />
            <br />
            Kliknite na gumb "Pošalji upit".
            <br />
            <br />
            Veselimo se što ćemo Vam pomoći u ostvarivanju vaših ciljeva.
          </Text>
          <NavLink to="/contact">
            <Button
              leftIcon={<EmailIcon />}
              mt={4}
              border="1px solid black"
              marginTop="2em"
              marginBottom="2em"
              backgroundColor="RGBA(0, 0, 0, 0.06)"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.10)'
              }}
            >
              Pošalji upit!
            </Button>
          </NavLink>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
