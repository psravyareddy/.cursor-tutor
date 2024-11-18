import React from 'react';
import {
  DatePicker,
  Group,
  Button,
  Calendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  DateInput,
  DateSegment,
  Popover,
  Dialog,
  Header
} from 'react-aria-components';

export function CustomStyledDatePicker(props) {
  return (
    <DatePicker>
      <Group className="field">
        <DateInput className="input">
          {(segment) => (
            <DateSegment segment={segment} className="segment" />
          )}
        </DateInput>
        <Button className="button">▼</Button>
      </Group>
      <Popover className="popup">
        <Dialog className="dialog">
          <Calendar>
            <div className="calendar-container">
              <Header className="header">
                <Button slot="previous" className="nav-button">◀</Button>
                <Heading className="title" />
                <Button slot="next" className="nav-button">▶</Button>
              </Header>
              <CalendarGrid className="grid">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="cell"
                  />
                )}
              </CalendarGrid>
            </div>
          </Calendar>
        </Dialog>
      </Popover>

      <style>{`
        .field {
          display: inline-flex;
          background: #1a1a1a;
          border-radius: 4px;
        }

        .input {
          background: transparent;
          border: none;
          padding: 8px 12px;
          color: white;
          display: inline-flex;
          width: 120px;
        }

        .segment {
          color: #999;
        }

        .button {
          background: #6c5ce7;
          border: none;
          color: white;
          padding: 8px 12px;
          cursor: pointer;
        }

        .calendar-container {
          background: #1a1a1a;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          width: fit-content !important;
          max-width: fit-content !important;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .title {
          color: white;
          font-size: 24px;
          font-weight: normal;
          margin: 0;
        }

        .nav-button {
          background: #333;
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          padding: 4px;
        }

        .cell {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          border: none;
          background: white;
          color: black;
          cursor: pointer;
          font-size: 14px;
          padding: 0;
        }

        /* Override any inherited styles */
        div[class*="calendar-container"] {
          width: fit-content !important;
          max-width: fit-content !important;
        }

        /* Target the specific dialog */
        section[role="dialog"] {
          width: fit-content !important;
          max-width: fit-content !important;
        }

        /* Target the popup */
        div[class*="popup"] {
          width: fit-content !important;
          max-width: fit-content !important;
        }
      `}</style>
    </DatePicker>
  );
}