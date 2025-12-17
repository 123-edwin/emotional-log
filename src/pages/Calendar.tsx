import { useState } from "react";
import Modal from "@/components/Modal";
import type { EmotionEntry } from "@/components/Modal";

//localstorage
const STORAGE_KEY = "emotionsByDay";

const loadEmotions = (): Record<string, EmotionEntry[]> => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

const saveEmotions = (data: Record<string, EmotionEntry[]>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};


const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const today = new Date();
const getDateKey = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;



export default function Calendar() {
    const [emotionsByDay, setEmotionsByDay] = useState<Record<string, EmotionEntry[]>>(() => loadEmotions());

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

    const handleSaveEmotions = (data: EmotionEntry[]) => {
        if (!selectedDay) return;

        const dateKey = getDateKey(year, month, selectedDay);

        setEmotionsByDay((prev) => {
            const updated = {
                ...prev,
                [dateKey]: data
            };

            saveEmotions(updated);
            return updated;
        });

        closeModal();
    };




    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    //how much days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // day week starts (0 = sunday)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // monday first day
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

    const selectedDateKey =
        selectedDay !== null
            ? getDateKey(year, month, selectedDay)
            : null;


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

                    const dateKey = getDateKey(year, month, day);
                    const hasEmotions = emotionsByDay[dateKey]?.length > 0;

                    return (
                        <div
                            key={day}
                            onClick={() => openModal(day)}
                            className={[
                                "aspect-square flex items-center justify-center border rounded-md cursor-pointer",
                                isToday && "bg-blue-500 text-white",
                                hasEmotions && "border-green-500 border-2",
                                !isToday && "hover:bg-gray-200"
                            ].filter(Boolean).join(" ")}


                        >
                            {day}
                        </div>
                    )
                })}
            </div>
            {/*Modal*/}
            <Modal
                key={selectedDay}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveEmotions}
                title={`Registrar emociones – Día ${selectedDay}`}
                initialEmotions={
                    selectedDateKey ? emotionsByDay[selectedDateKey] : undefined
                }
            >
            </Modal>


        </div>
    );
};