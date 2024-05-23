import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const MyChatbot = () => {

  const steps = [
    {
      id: '0',
      message: 'Hey!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Please write your name',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: "Hi {previousValue}, how can I help you?",
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 1, label: "Can I contact the seller?", trigger: '5' },
        { value: 2, label: "How do I edit my profile?", trigger: '6' },
        { value: 3, label: "How do I change my profile picture?", trigger: '7' },
        { value: 4, label: "How do I purchase a product?", trigger: '8' },
      ],
    },
    {
      id: '5',
      message: "Yes, use the chat feature to contact the seller directly after clicking on the buy now button.",
      trigger: '9',
    },
    {
      id: '6',
      message: "Click the edit icon next to your profile information to update your details.",
      trigger: '9',
    },
    {
      id: '7',
      message: "In the edit profile section, upload a new profile picture.",
      trigger: '9',
    },
    {
      id: '8',
      message: "Click the 'Buy Now' button on that product's page to start the purchase process.",
      trigger: '9',
    },
    {
      id: '9',
      message: "Do you have more questions?",
      trigger: '10',
    },
    {
      id: '10',
      options: [
        { value: 1, label: "Yes", trigger: '4' },
        { value: 2, label: "No", trigger: '11' },
      ],
    },
    {
      id: '11',
      message: "Great! Happy shopping!",
      end: true,
    },
  ];

  const config = {
    botAvatar: "/image/bot.png",
    userAvatar: "/image/placeholder.png",
    floating: true,
  };

  const theme = {
    background: 'white',
    headerBgColor: 'teal',
    headerFontSize: '20px',
    botBubbleColor: '#ddd',
    headerFontColor: 'white',
    botFontColor: 'black',
    userBubbleColor: 'grey',
    userFontColor: 'white',
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ zIndex: 10000 }}>
        <ChatBot headerTitle="IITKBot" steps={steps} {...config} />
      </div>
    </ThemeProvider>
  );
};

export default MyChatbot;
