import React, { useEffect, useReducer } from "react";
import dbApi from "./utils/indexedDb";
import "./App.css";
import UserView from "./components/UserView";
import ControlPanel from './components/ControlPanel';
// control state up here, holding dict of all the users, sorting logic
// manipulate children using a "visible" prop

const initialState = {loading: true, users: []};

function reducer(state, action) {
  switch (action.type) {
    case "addUsers":
      let newState = {...state, users: [...state.users, ...action.users]};
      newState.loading = false;

      return newState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  let [sortState, dispatchSortState] = useReducer((state, newState) => {
    // setting the same sort twice will flip between ascending and descending sorting
    if (newState.sortBy === state.sortBy) {
      newState.descending = !state.descending
    }
    return {...state, ...newState}
  }, {descending: true, sortBy: "name", filterField: "name", filterValue: ""});

  // load entries from indexedDB at beginning of session
  useEffect(() => {
   dbApi.checkDatabase(result => {
    dispatch({type: "addUsers", users: result});
   });
  }, [])

  return (
    <div>
      <UserView users={state.users} sortState={sortState}/>
      <ControlPanel addUser={(formState) => { dbApi.saveRecord(formState); dispatch({type: "addUsers", users: [formState]}); }} updateSortState={dispatchSortState}/>
    </div>
  );
}

export default App;