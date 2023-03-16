import React,{useEffect} from 'react';
import {io} from "socket.io-client"

function Component() {
 
    const socket = io('http://localhost:8000')
      console.log("bnjbjbjb");
  return (
    <div>
sds
    </div>
  );
}

export default Component;
