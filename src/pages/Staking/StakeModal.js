import React, { useState } from 'react';
import Modal from 'react-modal';

const StakeModal = ({ isOpen, onClose, onStake }) => {
  const [stakeDays, setStakeDays] = useState(0);

  const handleInputChange = (event) => {
    setStakeDays(Number(event.target.value));
  };

  const handleSubmit = () => {
    onStake(stakeDays);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false} // Add this line to disable the warning about accessibility
    >
      <h3>Stake NFT</h3>
      <label>
        Number of Days:
        <input type="number" value={stakeDays} onChange={handleInputChange} />
      </label>
      <button onClick={handleSubmit}>Stake</button>
    </Modal>
  );
};

export default StakeModal;
