type AddToDoButtonProps = {
    onClick: (event: React.SyntheticEvent) => void;
};

function AddToDoButton({ onClick }: AddToDoButtonProps) {
    return (
        // TODO: Create universal button element

        <button
            onClick={onClick}
            className="inline-block px-6 py-2 bg-mblue rounded-full text-center text-xl text-white"
        >
            Add To-Do
        </button>
    );
}

export default AddToDoButton;
