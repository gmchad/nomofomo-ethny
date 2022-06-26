import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

import { ethers } from "ethers";

import { useAccount, useContract, useSigner } from 'wagmi'
import React, { useEffect, useState} from "react";
import { toast } from 'react-toastify'
import { useMoralis } from "react-moralis";

import { useMoralisWeb3Api } from "react-moralis";

// calendar
import AddToCalendarHOC from 'react-add-to-calendar-hoc';

const erc721aABI = require('./erc721a.json')
const data = require('./sampledata.json');

const Events = () => {

  const { data: signer, isError, isSuccess } = useSigner()
  const { data: account } = useAccount()
  const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);

  const [events, setEvents] = useState([])
  const [currentEvent, setCurrentEvent] = useState({})

  //const { authenticate, isAuthenticated, user } = useMoralis();
  //const Web3Api = useMoralisWeb3Api();

  // modal hooks
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setEvents(data)
    console.log('signer success: ', isSuccess)
    if (isSuccess) {
      console.log(signer)
      filterEvents()
    }
    if (account) {
      const address = `connected to ${String(account.address).substring(0, 6)}...${String(account.address).substring(36)}`
      toast.success(address)
    }
  }, [signer])


  /*
  const auth = async () => {
    await authenticate()
    .then(async (user) => {
      console.log(user.get("ethAddress"));
      //await filterEvents()
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  */

  const filterEvents = async () => {
    let filteredEvents = []
 
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      let contract = new ethers.Contract(element.contractAddress, erc721aABI, signer);
      console.log(element.contractAddress)
      console.log(account.address)
      let balance = await contract.balanceOf(account.address)
      balance = balance.toNumber()
      
      console.log(balance)
      if (balance > 0) {
        filteredEvents.push(data[i])
      }
    }

    setEvents(filteredEvents)

  }

  const signUp = (index) => {
    console.log(index)
    const name = events[index].name
    toast(name)

    // set current event

    const event = {
      description: 'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
      duration: 1,
      endDatetime: '20220619T220000Z',
      location: 'NYC',
      startDatetime: '20220619T210000Z',
      title: 'Super Fun Event',
    }
    setCurrentEvent(event)
    setShow(true)
  }

  return (
    <>
    <Table responsive size="sm">
      <thead>
        <tr>
          <th>Events</th>
        </tr>
      </thead>
      <tbody>
        {events.map((item, index) => (
          <tr key={index}>
            {/*Object.values(item).map((elem, i) => (<td key={i}>{elem}</td>))*/}
            <td>{item.name}</td>
            <td>{item.venue}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.address}</td>
            <td><Button variant="primary" onClick={() => signUp(index)}>Sign Up</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddToCalendarDropdown
          event={currentEvent}
          linkProps={{
            className: "link-info",
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default Events