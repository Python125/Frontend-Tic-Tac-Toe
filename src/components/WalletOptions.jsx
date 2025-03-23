import { useConnect } from "wagmi";
import { Button } from "@chakra-ui/react";

function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <Button
      backgroundColor="black"
      color="white"
      marginTop="1rem"
      key={connector.id}
      onClick={() => connect({ connector })}
    >
      Connect Wallet
    </Button>
  ));
}

export default WalletOptions;
