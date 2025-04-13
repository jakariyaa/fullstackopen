const Filter = ({ filterValue, onFilterChange }) => {
    return (
        <div>
            filter shown with <input value={filterValue}
                onChange={(event) => onFilterChange(event.target.value)} />
        </div>
    )
}

export default Filter