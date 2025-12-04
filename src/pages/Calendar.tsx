import { useState } from "react";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const today = new Date();


export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    //how much days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Día de la semana donde empieza (0 = domingo)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Convertir para que lunes sea el primer día
    const adjustedStart = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    
    const emptySlots = Array.from({length: adjustedStart});
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    //handlers
    const goToNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
    const goToPrevMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            {/*HEADER*/}
            <div className="flex items-center justify-between mb-4">
                <button className="p-2 rounded hover:bg-gray-100" onClick={goToPrevMonth}>
                    ◀
                </button>
                <h2 className="text-xl font-semibold"> {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button className="p-2 rounded hover:bg-gray-100" onClick={goToNextMonth}>
                    ▶
                </button>
            </div>
            {/*DAYS OF WEEK*/}
            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
                <div>Lun</div>
                <div>Mar</div>
                <div>Mié</div>
                <div>Jue</div>
                <div>Vie</div>
                <div>Sáb</div>
                <div>Dom</div>
            </div>
            {/*GRID*/}
            <div className="grid grid-cols-7 gap-2">
                {emptySlots.map((_, i) => (
                    <div key={"e" + i} className="aspect-square"></div>
                ))}
                {days.map((day) => {
                    const isToday = 
                    day == today.getDate() &&
                    month == today.getMonth() &&
                    year == today.getFullYear();
                    return (
                    <div
                        key={day}
                        className={`aspect-square flex items-center justify-center border rounded-md hover:bg-gray-100 ` + 
                            (isToday ? `bg-blue-500 text-black` : ``)
                        }
                    >
                        {day}
                    </div>
                )})}
            </div>
        </div>
    );
};