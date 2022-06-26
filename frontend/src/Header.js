// components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

import { ConnectButton } from '@rainbow-me/rainbowkit'

const imageStyle = {
  width: '100px',
  height: '100px',
  marginLeft: '-75px'
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const headerStyle = {
}

const Header = () => {

  return (
    <Navbar>
      <Container>
          <Navbar.Brand href='/'>
            <div style={divStyle}>
              <Image
                fluid={true}
                rounded={true}
                src={"/10.png"}
                style={imageStyle}
              />
              <h4 style={headerStyle}>NFT NYC</h4>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <ConnectButton label='connect' />
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
