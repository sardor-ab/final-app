import {useState} from "react";
import {Select} from "./components/Select";
import css from "./App.module.scss";

const MOCK_LIST = [
    {id: 0, name: "Anosoff",},
    {id: 1, name: "Algorithmika"},
    {id: 2, name: "JuniorCode"},
    {id: 3, name: "CodeCraft"},
]

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [label, setLabel] = useState('Input Label');
    const [helperText, setHelperText] = useState('helperText');

    const onChange = () => {
        console.log("Change");
    };

    const onClear = (item: null) => {
        console.log(item);
    };

    return (
        <div className="App">
            <div className={css.controls}>
                <button onClick={() => setIsLoading(!isLoading)}>Загрузка {isLoading ? ' On' : ' Off'}</button>
                <button onClick={() => setLabel(label ? '' : 'Input Label')}>Label {label ? ' On' : ' Off'}</button>
                <button onClick={() => setHelperText(helperText ? '' : 'helperText')}>helperText {helperText ? ' On' : ' Off'}</button>
            </div>

            <br/>
            <br/>
            <br/>

            <Select
                label={label}
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
