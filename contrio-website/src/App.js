import Header from './components/Header'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
      <>
        <Header title = 'Contrio'/>
        <Form type={'input'}/>
        <Form type={'output'}/>
      </>
    </div>
  );
}

export default App;
