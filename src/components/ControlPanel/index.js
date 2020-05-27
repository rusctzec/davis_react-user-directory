import React, { useState } from 'react';
import './style.css';

const ControlPanel = props => {
  // this is supposed to sort users and stuff
  // and add them too. with a form and stuff.

  const [formState, setFormState] = useState({name: "", age: 0, email: ""});

  const updateSortState = e => {
    const update = {[e.target.getAttribute("data-field")]: e.target.value}
    props.updateSortState(update);
  }
  const updateFormState = e => {
    setFormState({...formState, [e.target.getAttribute("name")]: e.target.value})
  };

  const addUser = e => {
    e.preventDefault();
    props.addUser(formState);
    setFormState({name: "", age: 0, email: ""})
  }

  // TODO save and load from indexedDb


  return (
    <div className="control-panel">
      <h1>Control Panel</h1>
      <h2>Filter:</h2>
      <div>
        <span>If</span>
        <select data-field="filterField" onChange={updateSortState}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="email">Email</option>
        </select>
        <span>includes</span>
        <input type="text" data-field="filterValue" onChange={updateSortState}/>
      </div>
      <h2>Sort by:</h2>
      <button data-field="sortBy" value="name" onClick={updateSortState}>Name</button>
      <button data-field="sortBy" value="age" onClick={updateSortState}>Age</button>
      <button data-field="sortBy" value="email" onClick={updateSortState}>Email</button>
      <form onSubmit={addUser}>
        <h2>Create:</h2>
        <label>Name</label><input required value={formState.name} name="name" type="text" onChange={updateFormState}/>
        <label>Age</label><input required value={formState.age} name="age" min="0" type="number" onChange={updateFormState}/>
        <label>Email</label><input required value={formState.email} name="email" type="text" onChange={updateFormState}/>
        <button { ...((formState.name === "" || formState.email === "") ? {disabled: true} : {}) }>Add User</button>
      </form>
    </div>
  );
}
export default ControlPanel;