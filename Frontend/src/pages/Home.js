import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Grid, GridItem, Image, Text, Button, Box } from '@chakra-ui/react';

export default function Home() {
  const token = sessionStorage.getItem('token');

  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(5,1fr)"
        bg="RGBA(0, 0, 0, 0.06)"
        width="100%"
        fontFamily="revert-layer"
      >
        <GridItem
          colSpan={{ base: '5', lg: '3' }}
          minHeight={{ base: '50vh', lg: '100vh' }}
          position="relative"
        >
          <Box position="relative" width="100%" marginTop="3em" padding="2em">
            <Image
              src="/images/driving.jpg"
              alt="driving"
              width="100%"
              height="100%"
              objectFit="cover"
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
              width="95%"
              fontSize="3em"
            >
              <Text fontSize="xl">Sigurna vožnja, sretno putovanje.</Text>
            </Box>
          </Box>
        </GridItem>

        <GridItem
          colSpan={{ base: '5', lg: '2' }}
          minHeight={{ base: '50vh', lg: '100vh' }}
          p={{ base: '20px', lg: '30px' }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text
            marginTop="3em"
            padding="2em"
            bg="RGBA(0, 0, 0, 0.08)"
            borderRadius="md"
            fontSize="1.2em"
          >
            Dobrodošli u Vožnja +, inovativnu internetsku aplikaciju za praćenje
            i unaprjeđenje vaše vozačke obuke!
            <br />
            <br />
            Ova moderna platforma pruža sveobuhvatno iskustvo, olakšavajući
            instruktorima i polaznicima vozačkih škola organizaciju, praćenje i
            unaprjeđenje vozačkih vještina.
            <br />
            <br />
            Bez obzira jeste li početnik ili iskusni vozač, Vožnja + će vam
            pomoći da razvijete sigurne i odgovorne vozačke navike. Sa
            intuitivnim sučeljem i bogatim setom alata, možete pratiti svoj
            napredak, identificirati slabosti i raditi na njihovom poboljšanju.
            <br />
            <br />
            Pridružite se našoj zajednici i započnite svoje putovanje prema
            sigurnijoj vožnji danas!
          </Text>

          {token === null ? (
            <NavLink to="/login">
              <Button
                mt={4}
                size="md"
                border="1px solid black"
                marginTop="5em"
                marginBottom="5em"
                backgroundColor="RGBA(0, 0, 0, 0.06)"
                _hover={{
                  backgroundColor: 'RGBA(0, 0, 0, 0.10)'
                }}
              >
                Započnimo!
              </Button>
            </NavLink>
          ) : (
            <></>
          )}
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
