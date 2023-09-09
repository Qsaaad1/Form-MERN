import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import "react-phone-number-input/style.css";

function App() {

  return (
    <div>
      <Header/>
      <div className="px-10 border border-black m-10 rounded-md ">
      <Form/>
      </div>
    
    </div>
  );
}

export default App;
