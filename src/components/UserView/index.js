// this should hold all the users and order them with flex, maybe with pagination
import React from 'react';
import Card from '../Card';
import './style.css';

// logic for sorting
function sortUsers(users, options) {
  return users
  .filter((item) => {
    // filtering out by content of a field
    if (options.filterField) {
      if (!String(item[options.filterField]).toUpperCase().includes(options.filterValue.toUpperCase())) return false;
    }
    return true;
  })
  .sort((a, b) => {
    let a2, b2; // make copies of inputs
    // for alphabetical sorting (not numbers) uppercase strings so that comparison is case insensitive
    if (typeof a == "string" && typeof b == "string") { a2 = a.toUpperCase(); b2 = b.toUpperCase(); }
    else { a2 = a; b2 = b; }



    if (a2[options.sortBy] > b2[options.sortBy]) { return options.descending ? -1 : 1; }
    if (a2[options.sortBy] < b2[options.sortBy]) { return options.descending ? 1 : -1; }
    return 0;
  });
}


const UserView = (props) => {

  // sort and filter users every render
  let processedUsers = sortUsers(props.users, props.sortState);

  return (
    <div>
    <p className="amount">{processedUsers.length} shown of {props.users.length}</p>
    <div className="user-view">
      {props.loading ?
        <h1>Loading...</h1>
      :
      processedUsers.map((user, i) => {
        return (<Card
          name={user.name}
          age={user.age}
          email={user.email}
          img={user?.picture?.thumbnail}
          key={i}
        />);
      })}
    </div>
  </div>
  );
};

export default UserView;