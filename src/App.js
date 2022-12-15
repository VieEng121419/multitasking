import { ChakraProvider } from '@chakra-ui/react'
import { Container } from "./layouts/Container";

function App() {
  return (
    <ChakraProvider>
      <Container />
    </ChakraProvider>
  );
}

export default App;
