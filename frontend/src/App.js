import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, chain, createClient, configureChains } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import Events from './Events';
import Header from './Header';

const { chains, provider } = configureChains(
  [ chain.rinkeby ],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default }
      },
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Weather Report Marketplace',
  chains
})

// Set up client
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Header />
        <Events/>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
