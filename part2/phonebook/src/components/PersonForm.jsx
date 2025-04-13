const PersonForm = ({
    onFormSubmit, nameValue, onNameChange, numberValue, onNumberChange
}) => {
    return (
        <form onSubmit={onFormSubmit}>
            <div>
                name: <input value={nameValue}
                    onChange={(event) => onNameChange(event.target.value)} />
            </div>
            <div>
                number: <input value={numberValue}
                    onChange={(event) => onNumberChange(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm