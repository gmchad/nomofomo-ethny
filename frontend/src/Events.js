import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'

import { useAccount, useContract, useSigner } from 'wagmi'
import React, { useEffect, useState} from "react";
import { toast } from 'react-toastify'

// calendar
import AddToCalendarHOC from 'react-add-to-calendar-hoc';

const Events = () => {

  const { data: signer, isError, isSuccess } = useSigner()
  const { data: account } = useAccount()
  const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);

  const [events, setEvents] = useState([])
  const [currentEvent, setCurrentEvent] = useState({})

  // modal hooks
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log('signer success: ', isSuccess)
    if (isSuccess) {
      console.log(signer)
    }
    if (account) {
      const address = `connected to ${String(account.address).substring(0, 6)}...${String(account.address).substring(36)}`
      toast.success(address)
    }
    filterEvents()
  }, [account])

  const filterEvents = () => {
    const data = require('./sampledata.json');
    setEvents(data)
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