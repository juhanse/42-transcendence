type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function Modal({ open, onClose, children }: Props) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-[700px] min-w-[700px] max-w-[700px] h-fit flex flex-col rounded-[40px] bg-white p-[60px] shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
