import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, chain, createClient, configureChains } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ToastContainer } from 'react-toastify'

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
  appName: 'ETH NY',
  chains
})

// Set up client
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const filterEvents = () => {
  

}

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <ToastContainer/>
        <Header />
        <Events/>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
