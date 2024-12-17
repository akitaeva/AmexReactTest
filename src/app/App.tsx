import React, { useState } from 'react'; 
import Tabs from '../components/Tabs/Tabs'; 
import Modal from '../components/Modal/Modal'; 
const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  
  const handleClose = () => setIsOpen(false); // Callback to close the modal
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>This is the App!</h1>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div>This is a modal</div>
      </Modal>
      <Tabs/>
    </div>
  );
};

export default App;
