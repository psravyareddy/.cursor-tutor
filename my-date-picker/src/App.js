import React from 'react';
import { CustomStyledDatePicker } from './CustomStyledDatePicker';

function App() {
  return (
    <CustomStyledDatePicker 
      label="Select Date"
      onChange={date => console.log(date)}
    />
  );
}

export default App;