"use client";

export default function Toggle({
    isEnabled,
    onToggle,
    label
}: Readonly<{
    isEnabled: boolean,
    onToggle: () => void,
    label?: string
}>) {

    return (
        <div onClick={onToggle} className="flex items-center gap-2">
            <button
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors shadow-xl ${isEnabled ? 'bg-primary-500' : 'bg-gray-300'}`}
                aria-pressed={isEnabled}
                aria-label="Toggle notifikationer"
            >
                <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${ isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </button>
            <span>{label}</span>
        </div>
    )
}