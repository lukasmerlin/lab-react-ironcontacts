import "./App.css";

import React, { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const [displayedContacts, setDisplayedContacts] = useState(
    contacts.slice(0, 5)
  );

  const addRandomContact = () => {
    const remainingContacts = contacts.filter(
      (contact) => !displayedContacts.includes(contact)
    );
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    setDisplayedContacts((prevContacts) => [...prevContacts, randomContact]);
  };

  const sortByName = () => {
    const sortedContacts = [...displayedContacts].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setDisplayedContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...displayedContacts].sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setDisplayedContacts(sortedContacts);
  };

  const handleDeleteContact = (id) => {
    setDisplayedContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedContacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  height="100px"
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : null}</td>
              <td>{contact.wonEmmy ? "🏆" : null}</td>
              <td><button onClick={() => handleDeleteContact(contact.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
