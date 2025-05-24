import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';

import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  Box,
  StepTitle,
  StepDescription,
  StepSeparator,
  GridItem,
  Grid,
  Text,
  Flex,
  ModalBody,
  ModalHeader,
  Modal,
  ModalContent,
  useDisclosure,
  ModalCloseButton
} from '@chakra-ui/react';

import { MdDateRange, MdEditNote } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';

export default function Progress() {
  const [stepsA, setStepsA] = useState([]);
  const [stepsB, setStepsB] = useState([]);
  const [drivingHours, setDrivingHours] = useState([]);
  const [drivingHoursA, setDrivingHoursA] = useState([]);
  const [drivingHoursB, setDrivingHoursB] = useState([]);

  const [drivingHoursALength, setDrivingHoursALength] = useState(0);
  const [drivingHoursBLength, setDrivingHoursBLength] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState(null);
  const [backendData, setBackendData] = useState(null);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('/stepsA.json')
      .then((response) => response.json())
      .then((data) => setStepsA(data))
      .catch((error) => console.error('Error fetching the steps:', error));
  }, []);

  useEffect(() => {
    fetch('/stepsB.json')
      .then((response) => response.json())
      .then((data) => setStepsB(data))
      .catch((error) => console.error('Error fetching the steps:', error));
  }, []);

  useEffect(() => {
    fetch('/api/driving_hours/getMy', {
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
        setDrivingHours(response);
        setDrivingHoursA(drivingHours.filter((d) => d.field === 'V'));
        setDrivingHoursB(drivingHours.filter((d) => d.field === 'C'));

        setDrivingHoursALength(drivingHoursA.length);
        setDrivingHoursBLength(drivingHoursB.length);
      })
      .catch((error) => {
        console.log('Dogodila se pogreska u progr: ', error);
      });
  });

  const handleStepClickA = (index) => {
    const clickedStepData = stepsA[index];
    setModalData(clickedStepData);
    setBackendData(drivingHoursA[index]);
    onOpen();
  };

  const handleStepClickB = (index) => {
    const clickedStepData = stepsB[index];
    setModalData(clickedStepData);
    setBackendData(drivingHoursB[index]);
    onOpen();
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(4,1fr)"
        justifyContent="center"
        alignItems="center"
      >
        <GridItem
          colSpan={{ base: 3, lg: 2 }}
          display="flex"
          justifyContent="center"
          backgroundColor="RGBA(0, 0, 0, 0.06)"
          margin="1em"
          borderRadius="full"
        >
          <Text fontSize="2xl">
            Želiš vidjeti bilješke sa sata? Klik na točkicu!
          </Text>
        </GridItem>
        <GridItem
          colSpan="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="RGBA(0, 0, 0, 0.06)"
          margin="1em"
          padding="3em"
          borderRadius="md"
        >
          <Flex direction="column" alignItems="center">
            <Text fontSize="3xl" fontWeight="bold">
              Sadržaj osposobljavanja na prometnom vježbalištu
            </Text>
            <Stepper
              index={drivingHoursALength} //kasnije ce ovo biti svi sati koji su odradjeni!
              orientation="vertical"
              gap="0"
              marginTop="3em"
              paddingLeft="40%"
              colorScheme="green"
            >
              {stepsA.map((step, index) => (
                <Step
                  key={index}
                  cursor="pointer"
                  onClick={() => handleStepClickA(index)}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box key={index} flexShrink="0" width="60%">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="2xl"
                  >
                    <ModalContent>
                      <ModalHeader>
                        {modalData ? modalData.title : ''}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Grid
                          templateColumns="repeat(1, 1fr)"
                          gap={4}
                          marginBottom="2em"
                        >
                          <GridItem>
                            <Flex
                              direction="column"
                              align="left"
                              marginTop="2em"
                              marginLeft="2em"
                            >
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdDateRange />
                                </Box>
                                {backendData ? backendData.date : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <FaCheck />
                                </Box>
                                {backendData ? backendData.status : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdEditNote />
                                </Box>
                                {backendData ? backendData.note : ''}
                              </Text>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Text fontSize="3xl" fontWeight="bold" marginTop="2em">
              Sadržaj osposobljavanja na javnoj cesti
            </Text>
            <Stepper
              index={drivingHoursBLength}
              orientation="vertical"
              gap="0"
              marginTop="3em"
              paddingLeft="40%"
              colorScheme="green"
            >
              {stepsB.map((step, index) => (
                <Step
                  key={index}
                  cursor="pointer"
                  onClick={() => handleStepClickB(index)}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box key={index} flexShrink="0" width="60%">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="2xl"
                  >
                    <ModalContent>
                      <ModalHeader>
                        {modalData ? modalData.title : ''}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Grid
                          templateColumns="repeat(1, 1fr)"
                          gap={4}
                          marginBottom="2em"
                        >
                          <GridItem>
                            <Flex
                              direction="column"
                              align="left"
                              marginTop="2em"
                              marginLeft="2em"
                            >
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdDateRange />
                                </Box>
                                {backendData ? backendData.date : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <FaCheck />
                                </Box>
                                {backendData ? backendData.status : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdEditNote />
                                </Box>
                                {backendData ? backendData.note : ''}
                              </Text>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Flex>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
