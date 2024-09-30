import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false); // New state to show/hide the list

  const changeItem = (title) => {
    setValue(title);
    setData([]);
    setShowList(false); // Hide the list after selecting an item
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch(`https://6515a076dc3282a6a3ceb80b.mockapi.io/TodoApp?name=${value}`)
        .then((response) => response.json())
        .then((result) => setData(result));
    }, 2000);

    // Cleanup function for timeout
    return () => clearTimeout(timeoutId);
  }, [value]);

  // Handle input focus
  const handleFocus = () => {
    setShowList(true);
  };

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding the list so the user can click an item
    setTimeout(() => {
      setShowList(false);
    }, 200);
  };

  return (
    <>
      <input
        type="text"
        className="button"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur} // Hides list when input loses focus
      />
      {showList &&
        data.length > 0 && ( // Show list only if showList is true
          <ul>
            {data?.map((item) => (
              <li key={item.id} onMouseDown={() => changeItem(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
    </>
  );
}

export default App;
