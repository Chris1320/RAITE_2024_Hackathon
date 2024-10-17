import { useState } from 'react';
import { FoodHub_backend } from 'declarations/FoodHub_backend';
import { TextField } from '@mui/material';

function AppSample() {
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

  const [filedata, setfiledata] = useState(null);

  const filechange = (e) => {
    setfiledata(e.target.files[0])
  }

  const sendfile = async () => {
    console.log("sending file")
    const byteData = await getAsByteArray(filedata)
    console.log(byteData)
    FoodHub_backend.upload(byteData).then((result) => {
      console.log("upload success")
      console.log(result)
    }).catch((e) => {
      console.log("something went wrong")
      console.log(e)
    })
  }

  async function getAsByteArray(file) {
    return new Uint8Array(await readFile(file))
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader()
  
      // Register event listeners
      reader.addEventListener("loadend", e => resolve(e.target.result))
      reader.addEventListener("error", reject)
  
      // Read file
      reader.readAsArrayBuffer(file)
    })
  }

  const [id, setId] = useState('')

  const idChanged = (e) => {
    setId(e.target.value)
  }

  const getallimage = () => {
    FoodHub_backend.getAllImages()
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log("failed to get images")
      console.log(e.message)
    })
  }

  const getimage = () => {
    FoodHub_backend.getImage(id)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log("failed to get image")
      console.log(e.message)
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
      <input type='file' onChange={filechange}/>
      <button type='button' onClick={sendfile}>upload</button>

      <TextField variant='outlined' label="ID" onChange={idChanged}/>
      <button type='button' onClick={getimage}>get image</button>
      <button type='button' onClick={getallimage}>get all images</button>
      <h2>somethins</h2>
      <p>{something}</p>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default AppSample;
