import React from 'react';

import { NavLink } from 'react-router-dom';
import {
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Box,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';

import { ArrowRightIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';

export default function Footer() {
  return (
    <Grid
      templateColumns="repeat(5,1fr)"
      width="100%"
      fontFamily="revert-layer"
      backgroundColor="RGBA(23,24,16)"
    >
      <GridItem
        colSpan={2}
        minHeight={{ base: '50vh', lg: '100vh' }}
        position="relative"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Image
            src="/images/LogoBlack.png"
            alt="driving"
            width="80%"
            height="auto"
            objectFit="contain"
            margin="4em"
          />
          <Text
            margin="2em"
            padding="2em"
            color="white"
            borderRadius="md"
            textAlign="start"
            fontSize="1.2em"
          >
            Bez obzira jeste li početnik ili iskusni vozač, Vožnja + će vam
            pomoći da razvijete sigurne i odgovorne vozačke navike. Sa
            intuitivnim sučeljem i bogatim setom alata, možete pratiti svoj
            napredak, identificirati slabosti i raditi na njihovom poboljšanju.
          </Text>
        </Box>
      </GridItem>

      <GridItem
        colSpan={3}
        minHeight={{ base: '50vh', lg: '100vh' }}
        p={{ base: '20px', lg: '30px' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Heading color="white" fontSize="3em">
            Kontaktirajte nas!
          </Heading>
          <List
            color="white"
            alignItems="center"
            justifyContent="center"
            paddingRight="3em"
            paddingLeft="3em"
            fontSize="1.5em"
            marginTop="3em"
          >
            <ListItem
              margin=".em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/">
                <ListIcon as={ArrowRightIcon} color="white" marginRight="2em" />
                123 Anywhere St., Any City, ST 12345
              </NavLink>
            </ListItem>
            <ListItem
              margin=".5em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/login">
                <ListIcon as={EmailIcon} color="white" marginRight="1em" />
                hello@reallygreatsite.com
              </NavLink>
            </ListItem>
            <ListItem
              margin=".5em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/contact">
                <ListIcon as={PhoneIcon} color="white" marginRight="1em" />
                +123-456-7890
              </NavLink>
            </ListItem>
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
}
