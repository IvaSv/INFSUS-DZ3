import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { FaUser } from 'react-icons/fa6';
import { CiMail } from 'react-icons/ci';

import { Grid, GridItem, Flex, Image, Text, Box } from '@chakra-ui/react';

export default function Candidates() {
  const [users, setUsers] = useState(null);
  const [roleSearch, setRoleSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setRoleSearch('kandidat');
    sessionStorage.setItem('roleSearch', roleSearch);
    console.log(roleSearch);

    fetch('/api/data/getAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Role: roleSearch
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data found');
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        console.log(response);
        setUsers(response);
      })
      .catch((error) => {
        console.log('Dogodila se pogreska pri dohvatu: ', error);
      });
  });

  const handleClickOnUser = (email) => {
    sessionStorage.setItem('studentEmail', email);
    navigate('/studentProgress');
    console.log('click!');
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid templateColumns="repeat(4,1fr)">
        {users &&
          users.map((user, index) => (
            <GridItem
              colSpan={{ base: 2, lg: 1 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="RGBA(0, 0, 0, 0.06)"
              margin="1em"
              padding="1em"
              borderRadius="md"
            >
              <Flex direction="column" alignItems="center">
                <Image
                  src={user.imageDTO ? user.imageDTO.path : ''}
                  alt="user_image"
                  boxSize="25em"
                  padding="1%"
                  marginBottom="3em"
                  _hover={{
                    cursor: 'pointer'
                  }}
                  onClick={() => handleClickOnUser(user.email)}
                ></Image>
                <Text fontSize="xl" display="flex" alignItems="center">
                  <Box marginRight="4">
                    <FaUser />
                  </Box>
                  {user.role.toUpperCase()}
                </Text>
                <Text
                  fontSize="3xl"
                  _hover={{
                    cursor: 'pointer'
                  }}
                  onClick={() => handleClickOnUser(user.email)}
                >
                  {user.firstName} {user.lastName}
                </Text>

                <Text fontSize="xl" display="flex" alignItems="center">
                  <Box marginRight="4">
                    <CiMail />
                  </Box>
                  {user.email}
                </Text>
              </Flex>
            </GridItem>
          ))}
      </Grid>
      <Footer></Footer>
    </>
  );
}
