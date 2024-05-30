import React from 'react';

import { useColorMode, Button, Flex} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
  <Flex mt="3rem" mb="3rem" ml="3rem">
      <Button onClick={toggleColorMode} leftIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}>
      {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  </Flex>
  );
}

export default ToggleTheme;
