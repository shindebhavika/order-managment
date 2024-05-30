import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import authenticationData from '../utils/Authentication.json';

const LoginPage = ({ setIsLogin }) => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = authenticationData.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      setError(''); // Clear any previous errors
      localStorage.setItem('isLogin', 'true'); // Set the 'isLogin' key in local storage
      setIsLogin(true); // Update the login state in the parent component
      navigate('/'); // Redirect to the order details page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" padding="309px" flexDirection="column">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="Username"
          variant="filled"
          mb={3}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <Button colorScheme="teal" mb={8} onClick={handleLogin}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
