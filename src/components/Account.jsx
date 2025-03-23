import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Box, Button } from "@chakra-ui/react";

export function Account() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });

  return (
    <Box>
      {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
      {/* {address && <div>{ensName ? `${ensName} (${address})` : address}</div>} */}
      <Button
        backgroundColor="black"
        color="white"
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    </Box>
  );
}
