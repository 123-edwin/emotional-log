export default function Calendar() {

    //Temporal: solo para mostrar estructura
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="max-w-xl mx-auto p-4">
            {/*HEADER*/}
            <div className="flex items-center justify-between mb-4">
                <button className="p-2 rounded hover:bg-gray-100">
                    ◀
                </button>
                <h2 className="text-xl font-semibold">Enero 2025</h2>
                <button className="p-2 rounded hover:bg-gray-100">
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
                {days.map((day) => (
                    <div 
                    key={day}
                    className="aspect-square flex items-center justify-center border rounded-md hover:bg-gray-100"
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};