import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Box, Button } from "@chakra-ui/react";

export function Account() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });

  return (
    <Box>
      {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
      <Button backgroundColor="black" color="white" onClick={() => disconnect()}>Disconnect</Button>
    </Box>
  );
}
