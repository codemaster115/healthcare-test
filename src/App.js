import "./App.css";

import data from "./utils/data";
import DynamicForm from "./components/DynamicForm";

function App() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="App">
      <DynamicForm formData={data} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
