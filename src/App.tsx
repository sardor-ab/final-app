// import "./App.css";
import { useState } from "react";
import { Select } from "./Select";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const onChange = () => {
    console.log("Change");
  };

  const onClear = (item: null) => {
    console.log(item);
  };

  return (
    <div className="App">
      <Select
        label="Input Label"
        isLoading={isLoading}
        onChange={onChange}
        onClear={onClear}
        items={[
          {
            id: 0,
            name: "Anosoff",
          },
          {
            id: 1,
            name: "Algorithmika",
          },
          {
            id: 2,
            name: "JuniorCode",
          },
          {
            id: 3,
            name: "CodeCraft",
          },
        ]}
        placeholder="Enter a query"
        helperText="Enter smth"
      />
    </div>
  );
}

export default App;
