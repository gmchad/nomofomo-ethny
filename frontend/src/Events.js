import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useAccount, useContract, useSigner } from 'wagmi'
import React, { useEffect, useState} from "react";
import { toast } from 'react-toastify'

const Events = () => {

  const { data: signer, isError, isSuccess } = useSigner()
  const { data: account } = useAccount()

  const [events, setEvents] = useState([])

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
  }

  return (
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
  )
}

export default Events