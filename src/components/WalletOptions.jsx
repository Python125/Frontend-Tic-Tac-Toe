import { useConnect } from 'wagmi';
import { Button } from '@chakra-ui/react';

function WalletOptions() {
    const { connectors, connect } = useConnect();

    return connectors.map((connector) => (
        <Button key={connector.id} onClick={() => connect({ connector })}>{connector.name}</Button>
    ))
}

export default WalletOptions;