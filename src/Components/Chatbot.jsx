import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const Chatbot = () => {
  const location = useLocation();
    const { name } = location.state || { name: 'Guest' }; // Default to 'Guest' if no state is passed
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  
 

  const handleSend = async () => {
   

    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input
    setInput('');

    try {
      // Call Groq OpenAI API
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions', // Replace with the actual Groq API endpoint
        {
          model: 'gemma2-9b-it', // Replace with the model you're using
          messages: [{ role: 'user', content: input }],
        },
        {
          headers: {
            'Authorization': `Bearer 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`, // Replace with your Groq API key
            'Content-Type': 'application/json',
          },
        }
      );

      // Add bot response to the chat
      const botMessage = { text: response.data.choices[0].message.content, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = { text: 'Sorry, something went wrong!', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

    const generatePDF = () => {
  //   const doc = new jsPDF();
  //   let yPos = 10;

  //   messages.forEach((message) => {
  //     const text = `${message.sender === 'user' ? 'You' : 'Bot'}: ${message.text}`;

  //     if (yPos + lineHeight > pageHeight - margin) {
  //       doc.addPage(); // Add a new page
  //       yPos = 10; // Reset Y position for the new page
  //     } 

  //     doc.text(text, 10, yPos);
  //     yPos += 40;
  //   });

  
  // doc.save('chat_history.pdf'); // This will save the file as "chat_history.pdf"
  const doc = new jsPDF();
  let yPos = 10; // Initial Y position for the first line
  const lineHeight = 20; // Height of each line
  const pageHeight = doc.internal.pageSize.height; // Height of the PDF page
  const margin = 10; // Margin for the text

  messages.forEach((message) => {
    const text = `${message.sender === 'user' ? 'You' : 'Bot'}: ${message.text}`;

    // Check if the current content exceeds the page height
    if (yPos + lineHeight > pageHeight - margin) {
      doc.addPage(); // Add a new page
      yPos = margin; // Reset Y position for the new page
    }
 
    // Add the text to the PDF
    doc.text(text, margin, yPos);
    yPos += lineHeight + 30; // Increase Y position for the next line
  });

  doc.save('chat_history.pdf'); // Save the PDF
};

  return (
    <div>
      <button className="hey" onClick={() => navigate('/')}>Redirect to Home page</button>
         <div className="heteye"><h2  >Welcome,{name} . Ask at your will !</h2></div>
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
        <button onClick={generatePDF} >Download Markdown</button>
      </div>
    </div>
    </div>
  );
};

export default Chatbot;
