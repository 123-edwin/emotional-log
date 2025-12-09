import { useState } from "react";
import Modal from "@/components/Modal";

const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const today = new Date();


export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (day: number) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectedDay(null);
        setIsModalOpen(false);
    }


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    //how much days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Día de la semana donde empieza (0 = domingo)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Convertir para que lunes sea el primer día
    const adjustedStart = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const emptySlots = Array.from({ length: adjustedStart });
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
                            onClick={() => openModal(day)}
                            className={[
                                "aspect-square flex items-center justify-center border rounded-md",
                                isToday
                                    ? "bg-blue-500 text-black"
                                    : "hover:bg-gray-300"
                            ].join(" ")}

                        >
                            {day}
                        </div>
                    )
                })}
            </div>
            {/*Modal*/}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-2">
                    Crear evento – Día {selectedDay}
                </h2>

                <input
                    className="border p-2 rounded w-full"
                    placeholder="Título del evento"
                />

                <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded mt-3 mr-1">
                    Guardar
                </button>
            </Modal>

        </div>
    );
};