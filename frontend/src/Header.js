// components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {

  return (
    <Navbar>
      <Container>
          <Navbar.Brand href='/'>Nomo Fomo</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <ConnectButton label='connect' />
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
