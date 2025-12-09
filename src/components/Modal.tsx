interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps){
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
                {children}

                <button
                    className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};