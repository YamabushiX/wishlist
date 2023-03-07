import React, { useState } from 'react';

function WishForm(props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('');

  const handleInputChange = (event) => {
    if (event.target.name === 'text') {
      setText(event.target.value);
    }   
    else if (event.target.name === 'priority') {
      setPriority(event.target.value);
    }
};

  const handleSubmit = (event) => {
    event.preventDefault();
      if (text.trim()) {
        props.onAdd({ text, priority, isChecked: false, id: Date.now() });
        setText('');
        setPriority('');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input className='input' type="text" name="text" value={text} onChange={handleInputChange} />
      <select className='select' name="priority" value={priority} onChange={handleInputChange}>
        <option value="">Select Priority</option>
        <option value="3">Low</option>
        <option value="2">Medium</option>
        <option value="1">High</option>
      </select>
      <button className='button-add' type="submit">Add</button>
    </form>
  );
}

export default WishForm;