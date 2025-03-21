import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
// import { Account } from './Account';
// import WalletOptions from './WalletOptions';
// import WalletVerification from './WalletVerification';
import { setWalletConnection } from '../features/wallet/walletSlice';

function SharedWallet() {
    const { isConnected, address } = useAccount();
    const { signature } = useSelector(state => state.wallet);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setWalletConnection(isConnected));
      }, [isConnected, address, dispatch]);

    return (
        <div>
            {signature ? (
                <>
                    <p>Address: {address}</p>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(address);
                            alert("Address copied to clipboard");
                        }}
                        style={{ cursor: "pointer" }}
                        title="Copy address to clipboard"
                        >
                        Copy address
                    </Button>
                    {/* <p>Nonce: {nonce}</p> */}
                    {/* <p>Signature: {signature}</p> */}
                    <p>Wallet verified! Your data has been saved.</p>
                </>
                ) : (
                    <p>Please sign the message to verify your wallet ownership...</p>
            )}
        </div>
    //     <Box>
    //         {isConnected ? (
    //         <>
    //             <Account />
    //             <WalletVerification />
    //         </>
    //         ) : (
    //         <WalletOptions />
    //         )}
    //   </Box>
    );
}

export default SharedWallet;