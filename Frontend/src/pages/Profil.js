import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { FaUser } from 'react-icons/fa6';
import { MdEmail, MdEditNote, MdDateRange } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

import {
  Box,
  Grid,
  GridItem,
  Image,
  Flex,
  Text,
  Button,
  Textarea
} from '@chakra-ui/react';

export default function Profil() {
  const [name, setName] = useState('ime');
  const [lastname, setLastname] = useState('prezime');
  const [role, setRole] = useState('uloga');
  const [dateOfBirth, setdateOfBirth] = useState('datum rodjenja');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('broj mobitela');
  const [note, setNote] = useState('note');
  const [imageData, setImageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('/api/data', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data found');
        }
        return response.json();
      })
      .then((response) => {
        setRole(response.role.toUpperCase());
        setName(response.firstName);
        setLastname(response.lastName);
        setdateOfBirth(response.dateOfBirth);
        setEmail(response.email);
        setPhone(response.phoneNumber);
      })
      .catch((error) => {
        //izgeneriraj Toast komponentu za neuspjesan login
        console.log('Dogodila se pogreska: ', error);
      });

    console.log('email: ', email);
    fetch('/api/image/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        userEmail: email
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data found');
        }

        return response.json();
      })
      .then((response) => {
        setImageData(response);
      })
      .catch((error) => {
        console.log('Dogodila se pogreska sa slikom: ', error);
      });

    if (!isEditing) {
      fetch('/api/note/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No data found');
          }
          return response.json();
        })
        .then((response) => {
          setNote(response.content);
        })
        .catch((error) => {
          //izgeneriraj Toast komponentu za neuspjesan login
          console.log('Dogodila se pogreska: ', error);
        });
    }
  });

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    fetch('/api/note/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(note)
    })
      .then((response) => {
        setIsEditing(!isEditing);
        console.log('response: ', response);
        if (!response.ok) {
          throw new Error('No data found');
        }
      })
      .catch((error) => {
        //izgeneriraj Toast komponentu za neuspjesan login
        console.log('Dogodila se pogreska: ', error);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(6,1fr)"
        width="100%"
        height="100vh"
        fontFamily="revert-layer"
        backgroundColor="RGBA(0, 0, 0, 0.06)"
        borderRadius="xl"
      >
        <GridItem colSpan={{ base: 3, lg: 2 }}>
          <Box
            borderRadius="full"
            boxSize="25em"
            position="absolute"
            zIndex="1"
            border="2px solid RGBA(23,24,16)"
            top="20%"
            left={{ base: '6%', lg: '10%' }}
          ></Box>
          <Image
            src={imageData ? imageData.path : ''}
            alt="user_image"
            borderRadius="full"
            boxSize="25em"
            padding="1%"
            backgroundColor="white"
            position="absolute"
            zIndex="2"
            top="21%"
            left={{ base: '8%', lg: '11%' }}
            border="16px solid RGBA(23,24,16)"
          ></Image>
        </GridItem>
        <GridItem colSpan={{ base: 3, lg: 4 }} marginRight="2em">
          <Flex
            direction="column"
            align="left"
            paddingLeft={{ base: '10em', lg: '25em' }}
            marginTop={{ base: '8em', lg: '15em' }}
          >
            <Text fontSize="6xl">
              {name} {lastname}
            </Text>
            <Text display="flex" alignItems="center">
              <Box marginRight="4">
                <FaUser />
              </Box>
              {role}
            </Text>
            <Text display="flex" alignItems="center">
              <Box marginRight="4">
                <MdEmail />
              </Box>
              {email}
            </Text>
            <Text display="flex" alignItems="center">
              <Box marginRight="4">
                <FaPhoneAlt />
              </Box>
              {phone}
            </Text>
            <Text display="flex" alignItems="center">
              <Box marginRight="4">
                <MdDateRange />
              </Box>
              {dateOfBirth}
            </Text>

            <Box
              display="flex"
              alignItems="center"
              marginTop="2em"
              border="2px solid RGBA(23,24,16)"
              padding="1em"
              position="relative"
              marginRight={{ base: '0em', lg: '7em' }}
            >
              <Box position="absolute" top="-6" left="-4">
                <MdEditNote size="15%" />
              </Box>
              {isEditing ? (
                <Flex
                  direction="column"
                  alignItems="center"
                  gap="2"
                  width="100%"
                >
                  <Textarea
                    value={note ? note : 'Napiši bilješku'}
                    onChange={handleNoteChange}
                    placeholder="Edit your note here..."
                    size="lg"
                    width="100%"
                    height="6em"
                  />
                  <Button
                    mt={4}
                    colorScheme="white"
                    e
                    color="RGBA(23,24,16)"
                    type="submit"
                    variant="outline"
                    borderColor="RGBA(23,24,16)"
                    _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
                    marginTop={{ base: '1em', lg: '3em' }}
                    margin="1em"
                    onClick={handleSave}
                  >
                    Spremi
                  </Button>
                </Flex>
              ) : (
                <Text
                  marginLeft="4"
                  height="6em"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {note ? note : 'Napiši bilješku'}
                </Text>
              )}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
