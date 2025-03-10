import './index.css'

function App() {
  const onInputChange = (evt) => {
    console.log(evt);
  }

  return (
    <>
      <input onChange={(event) => onInputChange(event)}></input>
    </>
  )
}

export default App