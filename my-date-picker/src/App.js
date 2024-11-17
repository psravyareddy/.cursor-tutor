import React from 'react';
import { CustomStyledDatePicker } from './CustomStyledDatePicker';

function App() {
  const handleDateChange = (date) => {
    const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    console.log('Selected date:', formattedDate);
  };

  return (
    <div className="App">
      <CustomStyledDatePicker 
        onChange={handleDateChange}
      />
    </div>
  );
}

export default App;