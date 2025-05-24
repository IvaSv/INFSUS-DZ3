import React from 'react';

import emailjs from '@emailjs/browser';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useState } from 'react';

import {
  Grid,
  Image,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  useToast,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleButtonClick = () => {
    const serviceId = 'service_cc0ja98';
    const templateId = 'template_aoshg5k';
    const publicKey = '3HNWpo6TKtLRFqEIr';

    const data = {
      from_name: name,
      from_email: email,
      to_name: 'Iva',
      message: message
    };

    emailjs
      .send(serviceId, templateId, data, publicKey)
      .then((response) => {
        //izgeneriraj Toast komponentu za uspjesno poslan upit
        toast({
          title: 'Uspješno poslan upit!',
          description: 'Uspješno ste poslali upit.',
          status: 'success',
          duration: 3000,
          isClosable: true
        });

        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((e) => {
        console.log('Error sending email: ', e);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid templateColumns="4fr 6fr" gap={6} padding="1em">
        <Box
          padding="1em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="xl">
            Imate li dodatna pitanja ili želite saznati više o našim uslugama?
            Naš tim stručnjaka spreman je odgovoriti na vaša pitanja i pružiti
            vam sve potrebne informacije.
            <br />
            <br />
            Kliknite na gumb "Pošalji" nakon ispunjavanja kontaktne forme.
            <br />
            <br />
            Veselimo se što ćemo Vam pomoći u ostvarivanju vaših ciljeva.
          </Text>
        </Box>
        <Box position="relative" width="100%">
          <Box
            textAlign="center"
            padding="1em"
            color="RGBA(23,24,16)"
            borderRadius="md"
            width={{ base: '100%', lg: '100%' }}
            height={{ base: '100%', lg: '100%' }}
            fontSize="3em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="RGBA(0, 0, 0, 0.06)"
          >
            <FormControl>
              <Stack spacing={1}>
                <FormLabel>Ime</FormLabel>
                <Input
                  type="name"
                  value={name}
                  onChange={handleNameChange}
                  borderColor="RGBA(23,24,16)"
                />
              </Stack>
            </FormControl>

            <FormControl>
              <Stack spacing={1}>
                <FormLabel>Email addresa</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  borderColor="RGBA(23,24,16)"
                />
              </Stack>
            </FormControl>

            <FormControl>
              <Stack spacing={1}>
                <FormLabel>Poruka</FormLabel>
                <Textarea
                  type="message"
                  value={message}
                  onChange={handleMessageChange}
                  height="8em"
                  borderColor="RGBA(23,24,16)"
                />
              </Stack>
            </FormControl>

            <Button
              mt={4}
              colorScheme="white"
              color="black"
              type="submit"
              variant="outline"
              borderColor="RGBA(23,24,16)"
              _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
              marginTop={{ base: '1em', lg: '3em' }}
              onClick={handleButtonClick}
            >
              Pošalji!
            </Button>
          </Box>
        </Box>
      </Grid>
      <Footer></Footer>
    </>
  );
}
