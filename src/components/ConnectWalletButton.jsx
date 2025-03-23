import { useAccount, useSignMessage, useConnect, useDisconnect, useEnsAvatar } from 'wagmi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWalletConnection, setWalletNonce, setWalletSignature, setWalletVerification, setWalletError } from '../features/wallet/walletSlice';
import { Button } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_URL;
console.log(apiURL);

function ConnectWalletButton() {
    const { connectors, connect } = useConnect();
    const { address, isConnected } = useAccount();
    const { data: signature, signMessage } = useSignMessage();
    const [nonce, setNonce] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const dispatch = useDispatch();

    const ConnectMetaMask = () => {
        return connectors.map((connector) => (
            <Button
                backgroundColor="black" color="white"
                marginTop="1rem"
                key={connector.id}
                onClick={() => connect({ connector })}
            >
                Connect Wallet
            </Button>
        ));
    }

    return (
        <div>
            {ConnectMetaMask()}
        </div>
    )
}

export default ConnectWalletButton;