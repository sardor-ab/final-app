import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Select } from "./Select";

const onChange = () => {
  console.log("Change");
};

const onClear = (item: null) => {
  console.log(item);
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Select
      label="Input Label"
      onChange={onChange}
      onClear={onClear}
      items={[
        {
          id: 0,
          name: "Sardor",
        },
      ]}
      placeholder="Enter a query"
      helperText="Enter smth"
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
