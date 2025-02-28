import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

export function Account() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ address });

    return (
        <Box>
            {ensAvatar && <img src={ensAvatar} alt='ENS Avatar' />}
            {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
            <Button onClick={() => disconnect()}>Disconnect</Button>
        </Box>
    )
}