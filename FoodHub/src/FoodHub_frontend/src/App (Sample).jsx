import { useState } from 'react';
import { FoodHub_backend } from 'declarations/FoodHub_backend';

function App() {
  const [greeting, setGreeting] = useState('');

  const [something, setSomething] = useState("");
  
  

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    FoodHub_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  const handleSomething = () => {
    console.log("starting something")
    FoodHub_backend.sample().then((result) => {
      console.log("result")
      console.log(result);
      setSomething(result);
    })
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <button type='button' onClick={handleSomething}>do something</button>
      <h2>somethins</h2>
      <p>{something}</p>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
