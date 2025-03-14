import { useConnect } from "wagmi";
import { Button } from "@chakra-ui/react";

function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <Button
      backgroundColor="black"
      color="white"
      key={connector.id}
      onClick={() => connect({ connector })}
    >
      Connect {connector.name}
    </Button>
  ));
}

export default WalletOptions;
