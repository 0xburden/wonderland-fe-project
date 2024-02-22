import { Flex } from "@chakra-ui/react";
import { Layout } from "./modules/global/components";
import { TransferForm } from "./modules/transfer/components";

function App() {
  return (
    <Layout>
      <Flex alignItems="center" justifyContent="center" direction="column">
        <TransferForm />
      </Flex>
    </Layout>
  );
}

export default App;
