import React,{useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client"

function Component() {
    const [id,setId] = useState()
    const [role,setRole] = useState()
    const [listOfClients,setListOfClient] = useState([])
    const [selectClient,setSelectClient] = useState("ALL");
    const [requestMsg,selectRequestMsg] = useState();
    const [balance,setBalance] = useState();
    const [totBalance,setTotBalance] = useState();

useEffect(() => {
    const socket = io('http://localhost:8000')

socket.on("connect", (message) => {//establish the connection
    setId(socket.id)
    console.log(socket.id,"id");
})

socket.on("role", (role) => {//GET THE ROLE
    setRole(role);
    console.log(role,"role");
});

socket.on("minionClientsList", (minionClientsList) => {
    //setRole(role);
    console.log(minionClientsList,"minionClientsList");
    setListOfClient(minionClientsList);
});

socket.on("requestMessage", (message) => {
    console.log("message",message)
    selectRequestMsg(message)
});

socket.on("totalBalance", (message) => {
    setTotBalance(message)
});

socket.emit('custom-emit',{customerId:socket.id})
},[]);

const selectTheMinionClient = (e) => {
    setSelectClient(e.target.value)
}
const enterBalance = (e) => {
    setBalance(e.target.value)
}
const sendBalance = () => {
    const socket = io('http://localhost:8000')
    socket.emit('sendTheBalance',balance)//send the selected clients
}

const sendMessage = () => {
    const socket = io('http://localhost:8000')
    socket.emit('selectedMinionClient',selectClient)//send the selected clients
}

  return (
    <div style={{textAlign:'center'}}>
        <h1>Your ID is : {id}</h1>
            <h1>Your role is: {role === "MASTERCLIENT" ? role : "MINION CLIENT"}</h1>
        <br/>
        { 
            role === "MASTERCLIENT" && !requestMsg ? null : <input placeholder="Enter The Balance" onChange={(e) => {enterBalance(e)}}/>
        }

        {//drop down
            role === "MASTERCLIENT" ?  <select onChange={selectTheMinionClient}> 
            {
                listOfClients.map((clients) => {
                    return(<option value={clients}>{clients}</option>)
                })
            }
            <option value="ALL">ALL</option>
            </select> : null
        }

       {
        role === "MASTERCLIENT" ?  <button onClick={() => {sendMessage()}}>SEND</button> : null
       }
       {
        role !== "MASTERCLIENT" && requestMsg ? <h1>Request Message:{requestMsg}</h1> : null
       }
       {
        role !== "MASTERCLIENT" && requestMsg ? <button onClick={() => {sendBalance()}}>SEND BALANCE</button> : null
       }
       {
        role === "MASTERCLIENT" && totBalance ? <h1>Total Balance of Minion Clients:{totBalance}</h1> : null
       }
    </div>

  );
}

export default Component;
