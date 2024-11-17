import React, { useState, useEffect, useMemo } from 'react';
import { useDatePicker } from '@react-aria/datepicker';
import { useDatePickerState } from '@react-stately/datepicker';
import { useButton } from '@react-aria/button';
import { useCalendar, useCalendarGrid, useCalendarCell } from '@react-aria/calendar';
import { useCalendarState } from '@react-stately/calendar';
import { 
  useOverlay,
  useModal,
  DismissButton,
  OverlayProvider,
  OverlayContainer 
} from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { createCalendar, getLocalTimeZone, today, parseDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';

function CalendarCell({ state, date, onSelect }) {
  let ref = React.useRef();
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <button
        {...buttonProps}
        ref={ref}
        className={`cell ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
        hidden={isOutsideVisibleRange}
        onClick={() => onSelect?.(date)}
      >
        {formattedDate}
      </button>
    </td>
  );
}

function CalendarGrid({ state, onDateSelect }) {
  let { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(6)].map((_, weekIndex) => (
          <tr key={weekIndex}>
            {[...Array(7)].map((_, dayIndex) => {
              let date = state.visibleRange.start
                .add({ weeks: weekIndex })
                .add({ days: dayIndex });
              return (
                <CalendarCell
                  key={dayIndex}
                  state={state}
                  date={date}
                  onSelect={onDateSelect}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Calendar(props) {
  let state = useCalendarState({
    ...props,
    locale: 'en-US',
    createCalendar
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="calendar">
      <div className="header">
        <button {...prevButtonProps} className="nav-button">
          ◀
        </button>
        <h2>{title}</h2>
        <button {...nextButtonProps} className="nav-button">
          ▶
        </button>
      </div>
      <CalendarGrid 
        state={state} 
        onDateSelect={(date) => {
          props.onChange?.(date);
        }}
      />
    </div>
  );
}

export function CustomStyledDatePicker(props) {
  const [displayDate, setDisplayDate] = useState('');
  
  let state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: true
  });

  let ref = React.useRef();
  let buttonRef = React.useRef();
  
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    calendarProps
  } = useDatePicker({
    ...props,
    "aria-label": "Select a date"
  }, state, ref);

  // Handle date selection
  const handleDateSelect = (date) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    console.log('Selected date:', formattedDate); // For debugging
    setDisplayDate(formattedDate);
    state.setValue(date);
    props.onChange?.(date);
    state.setOpen(false);
  };

  return (
    <I18nProvider locale="en-US">
      <OverlayProvider>
        <div className="datepicker-container">
          <label {...labelProps} className="date-label">
            Select a date
          </label>
          <div {...groupProps} ref={ref} className="field">
            <input 
              {...fieldProps}
              type="text"
              value={displayDate}
              readOnly
              aria-label="Date input"
            />
            <button 
              ref={buttonRef}
              onClick={() => state.setOpen(true)}
              className="button"
              aria-label="Calendar"
            >
              🗓
            </button>
          </div>
          {state.isOpen && (
            <OverlayContainer>
              <FocusScope contain restoreFocus autoFocus>
                <div 
                  className="popover"
                  style={{
                    position: 'absolute',
                    top: ref.current?.getBoundingClientRect().bottom + 8,
                    left: ref.current?.getBoundingClientRect().left,
                    zIndex: 1000,
                  }}
                >
                  <div className="calendar-wrapper">
                    <Calendar 
                      {...calendarProps}
                      onChange={handleDateSelect}
                    />
                  </div>
                  <DismissButton onDismiss={() => state.setOpen(false)} />
                </div>
              </FocusScope>
            </OverlayContainer>
          )}
        </div>
        <style>{`
          .datepicker-container {
            position: relative;
            display: inline-block;
          }
          
          .field {
            display: flex;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 2px;
          }
          
          .field input {
            border: none;
            padding: 4px;
            outline: none;
            font-size: 14px;
            min-width: 150px;
          }
          
          .button {
            border: none;
            background: none;
            padding: 4px;
            cursor: pointer;
          }
          
          .popover {
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .calendar-wrapper {
            padding: 1rem;
          }
        `}</style>
      </OverlayProvider>
    </I18nProvider>
  );
}