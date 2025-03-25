import { React } from "react";
import { Input, Button, Dialog, CloseButton } from '@chakra-ui/react';
import { Toaster, toaster } from "./ui/toaster"

function CreateGameModal() {

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'>Create Challenge</Button>
                </Dialog.Trigger>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content border='1px solid white' backgroundColor='gray.700' color='white' width='500px'>
                        <Dialog.Body>
                            <Input color='white' width='85%' type="text" marginBottom='10px' marginTop='10px' placeholder="Enter new game" />
                            <Input color='white' width='85%' type="number" marginBottom='10px' marginTop='10px' placeholder="Enter amount" />
                        </Dialog.Body>
                        <Dialog.Footer justifyContent='center'>
                            <Toaster />
                            <Button variant='outline' backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg' 
                                onClick={() => toaster.create({
                                    title: 'Game created',
                                    description: 'Game created successfully',
                                    type: 'success',
                                })}>
                                Create Challenge
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" backgroundColor='white' color='black' />
                        </Dialog.CloseTrigger>                
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    )
}

export default CreateGameModal;
