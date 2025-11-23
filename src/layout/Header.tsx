export default function Header(){
    return (
        <header className="py-4 flex flex-col items-center text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                Bitácora emocional
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Registra cómo te sientes, día a día ✨ 
            </p>
        </header>
    );
}