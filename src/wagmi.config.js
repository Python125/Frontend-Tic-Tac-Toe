// @ts-check

import { http, createConfig } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

const projectId = '123';

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});