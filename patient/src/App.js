import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [messages, setMessages] = useState([]);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/kafkaPatient', {
      topic,
      message,
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error sending message:', error);

    // You can show an error message to the user or handle it in another way
    // For example, set a state variable to show an error message in your UI
    // setErrorMsg('An error occurred while sending the message.');
  }
};


useEffect(() => {
  // Fetch messages from your Node.js server
  fetch('http://localhost:5000/api/kafkaPatient')
    .then(response => response.json())
    .then(data => setMessages(data))
    .catch(error => console.error('Error fetching messages:', error));
}, []);
  return (
    <div className="App">
      <h1>patient Received Messages</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Choose a broker to publish message</option>
            <option value="hospital-topic">hospital-topic</option>
            <option value="paramedic-topic">paramedic-topic</option>
            <option value="patient-topic">patient-topic</option>
          </select>
        </div>
        <br />
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Message
          </span>
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default App;
