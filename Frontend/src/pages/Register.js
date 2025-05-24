import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  useToast,
  Grid,
  GridItem,
  Textarea
} from '@chakra-ui/react';

export default function Register() {
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const [note, setNote] = useState('');
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);

  const [noteForm, setNoteForm] = useState({
    note: '',
    userId: ''
  });

  const resetForm = () => {
    setFormData({
      role: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      phoneNumber: ''
    });
    setNote('');
    setImage(null);
    setUserId(null);
    setNoteForm({
      note: '',
      userId: ''
    });
  };

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImage(files[0]);
    } else if (name === 'note') {
      setNote(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('image: ', image);
    console.log('note: ', note);
    console.log('data: ', formData);

    try {
      const token = sessionStorage.getItem('token');
      console.log('token sent: ' + token);

      //post user
      console.log('form role: ', formData.role);
      const registerResponse = await fetch('/api/data/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(formData)
      });

      if (!registerResponse.ok) {
        throw new Error('User registration failed');
      }

      const userIdResponse = await registerResponse.json();
      setUserId(userIdResponse);
      console.log('userId: ', userIdResponse);

      //post note
      if (note === '') {
        setNote('Napiši bilješku');
      }

      const noteForm = {
        note: note,
        userId: userIdResponse
      };

      console.log('note before: ', note);
      console.log('noteform: ', noteForm);

      const noteResponse = await fetch('/api/note/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(noteForm)
      });

      if (!noteResponse.ok) {
        throw new Error('Note submission failed');
      }

      //post image
      const imageForm = new FormData();
      imageForm.append('file', image);
      imageForm.append('type', 'image');
      imageForm.append('email', formData.email);

      const imageResponse = await fetch('/api/image/upload', {
        method: 'POST',
        headers: { Authorization: token },
        body: imageForm
      });

      if (!imageResponse.ok) {
        throw new Error('Image upload failed');
      }

      toast({
        title: 'Korisnik registriran.',
        description: 'Korisnik je uspješno registriran.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });

      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="1fr"
        justifyContent="center"
        alignItems="center"
        margin="3em"
      >
        <GridItem backgroundColor="RGBA(0, 0, 0, 0.06)">
          <VStack
            as="form"
            w="full"
            maxW="xl"
            mx="auto"
            mt={6}
            mb={6}
            onSubmit={handleSubmit}
            padding="2em"
          >
            <FormControl isRequired>
              <FormLabel htmlFor="role">Uloga</FormLabel>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                border="1px solid black"
              >
                <option value="" disabled>
                  Izaberite ulogu
                </option>
                <option value="kandidat" name="role">
                  kandidat
                </option>
                <option value="instruktor" name="role">
                  {' '}
                  instruktor
                </option>
                <option value="administrator" name="role">
                  administrator
                </option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="firstName">Ime</FormLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                border="1px solid black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="lastName">Prezime</FormLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                border="1px solid black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="dateOfBirth">Datum rođenja</FormLabel>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                border="1px solid black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                border="1px solid black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Lozinka</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                border="1px solid black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="phoneNumber">Broj mobitela</FormLabel>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                border="1px solid black"
              />
            </FormControl>

            <FormControl p={2} borderRadius="md">
              <FormLabel htmlFor="note" borderRadius="md">
                Bilješka
              </FormLabel>
              <Textarea
                id="note"
                name="note"
                value={note}
                onChange={handleChange}
                borderRadius="md"
                border="1px solid black"
              />
            </FormControl>

            <FormControl p={2} borderRadius="md" isRequired>
              <FormLabel htmlFor="image" borderRadius="md">
                Korisnička fotografija
              </FormLabel>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                borderRadius="md"
              />
            </FormControl>

            <Button
              mt={4}
              colorScheme="white"
              color="RGBA(23,24,16)"
              type="submit"
              variant="outline"
              borderColor="RGBA(23,24,16)"
              _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
              marginTop={{ base: '1em', lg: '3em' }}
              margin="1em"
              width="full"
            >
              Registriraj korisnika
            </Button>
          </VStack>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
