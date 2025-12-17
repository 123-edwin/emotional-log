import { useState } from "react";

export interface EmotionEntry {
    emotion: string;
    intensity: number;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: EmotionEntry[]) => void;
    title: string;
    initialEmotions?: EmotionEntry[];
}

const emotionList = [
    { emoji: "😄", label: "Feliz" },
    { emoji: "😢", label: "Triste" },
    { emoji: "😰", label: "Ansioso" },
    { emoji: "🔥", label: "Motivado" },
    { emoji: "😌", label: "Relajado" },
    { emoji: "😡", label: "Enojado" },
    { emoji: "😣", label: "Estresado" },
    { emoji: "🙏", label: "Agradecido" }
];


export default function Modal({ isOpen, onClose, onSave, title, initialEmotions }: ModalProps) {
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>(
        initialEmotions ? initialEmotions.map(e => e.emotion) : []
    );

    const [intensities, setIntensities] = useState<Record<string, number>>(
        initialEmotions
            ? Object.fromEntries(
                initialEmotions.map(e => [e.emotion, e.intensity])
            )
            : {}
    );




    if (!isOpen) return null;


    const toggleEmotion = (emotion: string) => {
        setSelectedEmotions((prev) => {
            if (prev.includes(emotion)) {
                setIntensities((ints) => {
                    const copy = { ...ints };
                    delete copy[emotion];
                    return copy;
                });
                return prev.filter((e) => e !== emotion);
            }
            // initialize intensity to 1
            setIntensities((ints) => ({
                ...ints,
                [emotion]: 1
            }));

            return [...prev, emotion];
        });
    };


    const updateIntensity = (emotion: string, value: number) => {
        setIntensities((prev) => ({
            ...prev,
            [emotion]: value
        }));
    };

    const handleSave = () => {
        if (selectedEmotions.length === 0) {
            alert("Selecciona al menos una emoción.");
            return;
        }

        const data = selectedEmotions.map((emotion) => {
            const intensity = intensities[emotion];
            if (intensity === undefined) {
                alert(`Asigna intensidad a ${emotion}`);
                throw new Error();
            }

            return { emotion, intensity };
        });


        onSave(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[350px] max-w-md max-h-[80vh] overflow-y-auto">

                {/* title: from calenday */}
                <h2 className="text-xl font-semibold mb-3">{title}</h2>

                {/* emotions */}
                <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Selecciona tus emociones:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {emotionList.map((emotion) => (
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => toggleEmotion(emotion.label)}
                                    className={`text-3xl border rounded-full p-3 transition
            ${selectedEmotions.includes(emotion.label)
                                            ? "bg-blue-500 text-white border-blue-600"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    {emotion.emoji}
                                </button>
                                <p className="text-xs mt-1">{emotion.label}</p>
                            </div>

                        ))}

                    </div>
                </div>

                {/* Sliders */}
                {selectedEmotions.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Intensidad (1 - 5):</p>

                        <div className="space-y-4">
                            {selectedEmotions.map((emotion) => (
                                <div key={emotion}>
                                    <span className="text-sm font-medium">{emotion}</span>

                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={intensities[emotion]}
                                        onChange={(e) =>
                                            updateIntensity(emotion, Number(e.target.value))
                                        }
                                        className="w-full mt-1"
                                    />

                                    <div className="flex justify-between text-xs text-gray-500 px-1">
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded mr-2"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>
                    <button
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
