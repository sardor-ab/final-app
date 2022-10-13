import { useEffect, useState } from "react";
import { ISelectItem, Select } from "./components/Select";
import css from "./App.module.scss";

const MOCK_LIST = [
  { id: 1, name: "Anosoff" },
  { id: 2, name: "Algorithmika" },
  { id: 3, name: "JuniorCode" },
  { id: 4, name: "CodeCraft" },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState("Input Label");
  const [helperText, setHelperText] = useState("helperText");

  const [selectedId, setSelectedId] = useState<string | number | boolean>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onChange = (item: ISelectItem, multiple: boolean, name?: string) => {
    // setSelectedId(item.id);
    if (multiple) {
      if (!selectedIds.includes(item.id)) {
        setSelectedIds([...selectedIds, item.id]);
      } else {
        setSelectedIds(selectedIds.filter((id) => id !== item.id));
      }
    } else {
      if (!selectedId.toString().includes(item.id)) {
        setSelectedId(item.id);
      }
    }
  };

  useEffect(() => {
    setSelectedId(selectedIds.map((id) => id).join());
  }, [selectedIds]);

  const onClear = (item: null, multiple: boolean) => {
    if (multiple) {
      setSelectedIds([]);
    } else {
      setSelectedId("");
    }
  };

  return (
    <div className="App">
      <div className={css.controls}>
        <button onClick={() => setIsLoading(!isLoading)}>
          Загрузка {isLoading ? " On" : " Off"}
        </button>
        <button onClick={() => setLabel(label ? "" : "Input Label")}>
          Label {label ? " On" : " Off"}
        </button>
        <button onClick={() => setHelperText(helperText ? "" : "helperText")}>
          helperText {helperText ? " On" : " Off"}
        </button>
      </div>

      <br />
      <br />
      <br />

      <Select
        selectedId={selectedId}
        label={`Single ${label} `}
        isLoading={isLoading}
        onChange={onChange}
        onClear={onClear}
        items={MOCK_LIST}
        placeholder="Enter a query"
        helperText={helperText}
        multiple={false}
      />

      <br />
      <br />
      <br />

      <Select
        multiple={true}
        selectedId={selectedId}
        label={`Multi ${label} `}
        isLoading={isLoading}
        onChange={onChange}
        onClear={onClear}
        items={MOCK_LIST}
        placeholder="Enter a query"
        helperText={helperText}
      />
    </div>
  );
}

export default App;
