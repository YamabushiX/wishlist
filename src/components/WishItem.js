import React, { useState, useEffect } from 'react';

const priorityLabels = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
};

function WishItem(props) {
 
  const wish = props.wish;
  
  const ID = wish.id;
  const [editedText, setEditedText] = useState(wish.text);
  const [editedPriority, setEditedPriority] = useState(wish.priority);
  const [isChecked, setIsChecked] = useState(wish.isChecked);
  const [isEditing, setIsEditing] = useState(false);

  const { onDelete } = props;
  const EditWishGlobal = props.editWish;
  
  useEffect(() => {
    EditWishGlobal(ID, editedText, isChecked, editedPriority);
  }, [editedText, editedPriority, isChecked]);

  
  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    setEditedPriority(newPriority);
  };

  const handleCheckChange = (event) => {
    setIsChecked(event.target.checked);
  };
 
  return (
    <li>
      <input className='checkbox' type="checkbox" checked={isChecked} onChange={handleCheckChange} />
      {isEditing ? (
        <>
          <input className='input' type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />

          <select className='select' value={editedPriority} onChange={handlePriorityChange}>
            <option value="1" label="High"> High</option>
            <option value="2" label="Medium"> Medium</option>
            <option value="3" label="Low"> Low</option>
          </select>
          <button className='button-save' onClick={() => setIsEditing(false)}>Save</button>
        </>
      ) : (
        <>
          <div className='wish-container'><div className='wish-text'>{editedText}</div><div className='wish-priority'>{priorityLabels[editedPriority]}</div></div>
          <button className='button-delete' onClick={() => onDelete(ID)}>Delete</button>
          <button className='button-edit' onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
};

export default WishItem;
