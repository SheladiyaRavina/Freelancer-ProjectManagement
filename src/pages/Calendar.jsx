import React, { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2023, 5, 15), title: 'Project Deadline' },
    { date: new Date(2023, 5, 20), title: 'Client Meeting' },
  ]);

  const [newEvent, setNewEvent] = useState({ date: '', title: '' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.date && newEvent.title) {
      setEvents([...events, { date: new Date(newEvent.date), title: newEvent.title }]);
      setNewEvent({ date: '', title: '' });
    }
  };

  return (
    <div className="space-y-6 p-8">
      <h2 className="text-3xl font-bold text-gray-900">Calendar</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="text-indigo-600 hover:text-indigo-800">&lt; Prev</button>
          <h3 className="text-xl font-semibold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={handleNextMonth} className="text-indigo-600 hover:text-indigo-800">Next &gt;</button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map(day => (
            <div key={day} className="text-center font-semibold">{day}</div>
          ))}
          {[...Array(firstDayOfMonth).keys()].map(i => (
            <div key={`empty-${i}`} className="h-24 bg-gray-100 rounded-md"></div>
          ))}
          {[...Array(daysInMonth).keys()].map(i => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            const dayEvents = events.filter(event => 
              event.date.toDateString() === date.toDateString()
            );
            return (
              <div key={i} className="h-24 bg-gray-100 rounded-md p-2">
                <div className="font-semibold">{i + 1}</div>
                {dayEvents.map((event, index) => (
                  <div key={index} className="text-xs bg-indigo-200 rounded p-1 mt-1">{event.title}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
            <input
              type="text"
              id="title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Calendar;