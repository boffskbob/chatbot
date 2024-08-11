'use client'

import { useState } from "react"
import { Box, Button, Stack, TextField } from '@mui/material'
import ReactMarkdown from 'react-markdown'

export default function Chatbot() {
  // list of messages
  const [messages, setMessages] = useState([{
    role: 'model',
    parts: [{ text: "What can I help you with?" }]
  }])
  // user input
  const [message, setMessage] = useState('')

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

              <Box
                bgcolor={message.role === 'model' ? 'primary.main' : 'secondary.main'}
                color='white'
                borderRadius={16}
                p={3}
              >
                <ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
              </Box>
            </Box>
          ))
        }
      </Stack>
      <Stack direction='row' spacing={2}>
        <TextField label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant='contained' onClick={sendMessage}>Send</Button>
      </Stack>
    </Stack>
  );
};