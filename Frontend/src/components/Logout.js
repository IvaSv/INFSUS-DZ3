import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';

export default function Logout() {
  const navigate = useNavigate();
  const toast = useToast();

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');

  //azurirati logout tako da prije odjave pita korisnika zeli li se odjaviti

  useEffect(() => {
    navigate('/home');
  }, []);

  return <></>;
}
