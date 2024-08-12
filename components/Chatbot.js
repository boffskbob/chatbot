'use client'

import { useState, useEffect, useRef } from "react"
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'

export default function Chatbot() {
  const getTime = () => {
    const d = new Date();
    const time = d.toLocaleTimeString().split(':');
    const zone = d.toLocaleTimeString().split(' ')[1];
    return time[0] + ':' + time[1] + ' ' + zone
  }
  const [time, setTime] = useState([getTime()])
  // list of messages
  const [messages, setMessages] = useState([{
    role: 'model',
    parts: [{ text: "What can I help you with?" }]
  }])
  // user input
  const [message, setMessage] = useState('')




  const EllipsesAnimation = () => {
    const [dots, setDots] = useState(' ');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : '.'));
      }, 500);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {dots}
      </div>
    );
  };

  const sendMessage = async () => {

    // add user message + blank assistant message to the end of messages list
    setMessages((messages) => [
      ...messages,
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: '' }] }
    ])
    setMessage('')

    // chats are done using post requests
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: 'user', parts: [{ text: message }] }])
    }).then(res => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result = ''
      // read the response from the server
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          // update assistant timestamp
          setTime(time => [...time, getTime()])
          return result
        }
        // else just keep updating state variables 
        const text = decoder.decode(value || new Int8Array(), { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return ([
            ...otherMessages, {
              ...lastMessage,
              parts: [{ text: lastMessage.parts[0].text + text }]
            }
          ])
        })
        return reader.read().then(processText)
      })
    })

  }

  return (
    <Stack direction='column' width='600px' height='700px' maxHeight='700px' p={2} spacing={3}>
      <Stack direction='column' spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
        {
          messages.map((message, index) => (
            <Box key={index} display='flex' justifyContent={message.role === 'model' ? 'flex-start' : 'flex-end'}>
              <Stack direction={'column'}>
                <Box
                  bgcolor={message.role === 'model' ? 'primary.main' : 'secondary.main'}
                  color='white'
                  borderRadius={16}
                  p={3}
                >
                  {message.parts[0].text ? <ReactMarkdown>{message.parts[0].text}</ReactMarkdown> : <EllipsesAnimation />}
                </Box>
                <Typography className={'timestamp-' + index} alignSelf={message.role === 'model' ? 'flex-start' : 'flex-end'} px={2} sx={{ display: 'block' }}>{time[index]}</Typography>
              </Stack>
            </Box>
          ))
        }
      </Stack>
      <Stack direction='row' spacing={2} p={2}>
        <TextField label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant='contained' onClick={() => {
          setTime(time => [...time, getTime()])
          sendMessage()
        }
        }>Send</Button>
      </Stack>
    </Stack >
  );
};