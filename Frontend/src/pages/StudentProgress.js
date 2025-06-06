import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  ModalCloseButton,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  useToast
} from '@chakra-ui/react';

import { MdDateRange, MdEditNote } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

export default function StudentProgress() {
  const [stepsA, setStepsA] = useState([]);
  const [stepsB, setStepsB] = useState([]);
  const [drivingHours, setDrivingHours] = useState([]);
  const [drivingHoursA, setDrivingHoursA] = useState([]);
  const [drivingHoursB, setDrivingHoursB] = useState([]);
  const [drivingHoursC, setDrivingHoursC] = useState([]);

  const [drivingHoursALength, setDrivingHoursALength] = useState(0);
  const [drivingHoursBLength, setDrivingHoursBLength] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose
  } = useDisclosure();

  const {
    isOpen: isFieldModalOpen,
    onOpen: onFieldModalOpen,
    onClose: onFieldModalClose
  } = useDisclosure();

  const [fields, setFields] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [fieldForm, setFieldForm] = useState({ name: '', description: '' });

  const [modalData, setModalData] = useState(null);
  const [backendData, setBackendData] = useState(null);
  const navigate = useNavigate();

  const [noteInput, setNoteInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    field: '',
    date: '',
    status: '',
    note: '',
    email: ''
  });

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
    fetch('/api/driving_hours/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        StudentEmail: sessionStorage.getItem('studentEmail')
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data found');
        }
        return response.json();
      })
      .then((response) => {
        setDrivingHours(response);

        const A = drivingHours.filter((d) => d.field === 'V');
        const B = drivingHours.filter((d) => d.field === 'C');
        const C = drivingHours.filter(
          (d) => d.field !== 'V' && d.field !== 'C'
        );

        setDrivingHoursA(A);
        setDrivingHoursB(B);
        setDrivingHoursC(C);

        setDrivingHoursALength(drivingHoursA.length);
        setDrivingHoursBLength(drivingHoursB.length);
      })
      .catch((error) => {
        console.log('Dogodila se pogreska u progr: ', error);
      });
  });

  const fetchFields = async () => {
    try {
      const res = await fetch('/api/fields/getAll', {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setFields(data);
      } else {
        console.error('Expected array from /api/fields but got:', data);
        setFields([]);
      }
    } catch (err) {
      console.error('Error fetching fields:', err);
      setFields([]);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleStepClickA = (index) => {
    const clickedStepData = stepsA[index];
    setModalData(clickedStepData);
    setBackendData(drivingHoursA[index]);
    setNoteInput(drivingHoursA[index]?.note || '');
    setIsEditing(false);
    onOpen();
  };

  const handleStepClickB = (index) => {
    const clickedStepData = stepsB[index];
    setModalData(clickedStepData);
    setBackendData(drivingHoursB[index]);
    onOpen();
  };

  const resetForm = () => {
    setFormData({ field: '', date: '', status: '', note: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Logika za slanje forme na backend
    try {
      console.log('form:', formData);
      const response = await fetch('/api/driving_hours/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onSecondModalClose();
      resetForm();
      toast({
        title: 'Uspješno spremljena bilješka!',
        description: 'Uspješno ste spremili novu bilješku.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error('Neuspješno spremanje bilješke na poslužitelj', error);
      resetForm();
      toast({
        title: 'Neuspješno spremljena bilješka!',
        description: 'Niste uspješno spremili novu bilješku.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleNoteUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // ili gdje god ga držiš

      console.log('Note update: ', noteInput);
      const res = await fetch(`/api/driving_hours/update/${backendData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ note: noteInput })
      });

      if (res.ok) {
        setIsEditing(false);
        onClose();
        // (opcionalno) ponovno dohvaćanje podataka ako treba
      } else {
        console.error('Greška kod spremanja bilješke');
      }
    } catch (err) {
      console.error('Greška u fetch zahtjevu:', err);
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>{modalData ? modalData.title : ''}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid gap={4} marginBottom="2em">
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
                    {backendData?.date || ''}
                  </Text>
                  <Text display="flex" alignItems="center">
                    <Box marginRight="4">
                      <FaCheck />
                    </Box>
                    {backendData?.status || ''}
                  </Text>
                  <Text display="flex" alignItems="center" mb={2}>
                    <Box marginRight="4">
                      <MdEditNote />
                    </Box>
                    {isEditing ? (
                      <Textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                      />
                    ) : (
                      backendData?.note || ''
                    )}
                  </Text>
                  {backendData &&
                    (!isEditing ? (
                      <Button
                        onClick={() => {
                          setIsEditing(true);
                          setNoteInput(backendData.note || '');
                        }}
                      >
                        Uredi bilješku
                      </Button>
                    ) : (
                      <Button colorScheme="green" onClick={handleNoteUpdate}>
                        Spremi
                      </Button>
                    ))}
                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Grid
        templateColumns="repeat(2,1fr)"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <GridItem colSpan={4} margin="1em" gap={4}>
          <Button
            m={4}
            colorScheme="white"
            color="black"
            variant="outline"
            borderColor="RGBA(23,24,16)"
            _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
            onClick={onSecondModalOpen}
            justifySelf="end"
            width="sm"
          >
            Upiši bilješku
          </Button>

          <Button
            m={4}
            colorScheme="white"
            color="black"
            variant="outline"
            borderColor="RGBA(23,24,16)"
            _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
            justifySelf="end"
            width="sm"
            onClick={onFieldModalOpen}
          >
            Upravljaj vrstama terena
          </Button>

          <Modal
            isOpen={isFieldModalOpen}
            onClose={() => {
              onFieldModalClose();
              setEditingField(null);
              setFieldForm({ name: '', description: '' });
            }}
          >
            <ModalContent>
              <ModalHeader>Upravljanje šifrarnikom (teren)</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={3}>
                  <FormLabel>Opis</FormLabel>
                  <Input
                    value={fieldForm.description}
                    onChange={(e) =>
                      setFieldForm({
                        ...fieldForm,
                        description: e.target.value
                      })
                    }
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Naziv (skraćenica)</FormLabel>
                  <Input
                    value={fieldForm.name}
                    onChange={(e) =>
                      setFieldForm({ ...fieldForm, name: e.target.value })
                    }
                  />
                </FormControl>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={async () => {
                    const method = editingField ? 'PUT' : 'POST';
                    const url = editingField
                      ? `/api/fields/${editingField.id}`
                      : '/api/fields';

                    try {
                      const res = await fetch(url, {
                        method,
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: token
                        },
                        body: JSON.stringify(fieldForm)
                      });
                      if (!res.ok) throw new Error('Failed to save field');
                      await fetchFields();
                      setEditingField(null);
                      setFieldForm({ name: '', description: '' });
                      toast({
                        title: 'Uspješno',
                        description: `Polje je ${
                          editingField ? 'ažurirano' : 'dodano'
                        }.`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                      });
                    } catch (e) {
                      toast({
                        title: 'Greška',
                        description: 'Greška pri spremanju polja.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                      });
                    }
                  }}
                >
                  {editingField ? 'Ažuriraj' : 'Dodaj'}
                </Button>

                <Box mt={6}>
                  <Text fontWeight="bold">Postojeća polja:</Text>
                  {fields.map((f) => (
                    <Flex
                      key={f.id}
                      mt={2}
                      justify="space-between"
                      align="center"
                    >
                      <Text>
                        {f.description} ({f.name})
                      </Text>
                      <Flex>
                        <Button
                          size="sm"
                          colorScheme="yellow"
                          mr={2}
                          onClick={() => {
                            setEditingField(f);
                            setFieldForm({
                              name: f.name,
                              description: f.description
                            });
                          }}
                        >
                          Uredi
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={async () => {
                            try {
                              console.log('fid:', f.id);
                              const res = await fetch(`/api/fields/${f.id}`, {
                                method: 'DELETE',
                                headers: { Authorization: token }
                              });
                              if (!res.ok) throw new Error();
                              await fetchFields();
                              toast({
                                title: 'Obrisano',
                                description: 'Polje je obrisano.',
                                status: 'info',
                                duration: 3000,
                                isClosable: true
                              });
                            } catch (err) {
                              toast({
                                title: 'Greška',
                                description: 'Greška pri brisanju.',
                                status: 'error',
                                duration: 3000,
                                isClosable: true
                              });
                            }
                          }}
                        >
                          Obriši
                        </Button>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
            <ModalContent>
              <ModalHeader>Unos bilješke za održani sat</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="field">Polje</FormLabel>
                  <Select
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="Izaberite polje"
                  >
                    {fields.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.description}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="date">Datum</FormLabel>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    border="1px solid black"
                  >
                    <option value="" disabled>
                      Izaberite status
                    </option>
                    <option value="USPJEH">uspješno savladano</option>
                    <option value="NEUSPJEH">neuspješno savladano</option>
                    <option value="DODATNO_VJEZBATI">
                      solidan pokušaj: dodatno vježbati
                    </option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="note">Bilješka</FormLabel>
                  <Textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  mt={4}
                  mr={3}
                  colorScheme="white"
                  color="RGBA(23,24,16)"
                  variant="outline"
                  borderColor="RGBA(23,24,16)"
                  _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
                  marginTop={{ base: '1em', lg: '3em' }}
                  margin="1em"
                  onClick={handleSubmit}
                >
                  Spremi
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>

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

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            {drivingHoursC.length > 0 && (
              <>
                <Text fontSize="3xl" fontWeight="bold" marginTop="2em">
                  Dodatno
                </Text>
                <Box mt={4} width="100%" paddingLeft="40%">
                  {drivingHoursC.map((hour, index) => (
                    <Box
                      key={index}
                      p={4}
                      mb={4}
                      bg="gray.100"
                      borderRadius="md"
                      boxShadow="sm"
                      width="60%"
                    >
                      <Text>
                        <strong>Datum:</strong> {hour.date}
                      </Text>
                      <Text>
                        <strong>Status:</strong> {hour.status}
                      </Text>
                      <Text>
                        <strong>Bilješka:</strong> {hour.note}
                      </Text>
                      <Text>
                        <strong>Vrsta terena:</strong> {hour.field}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
