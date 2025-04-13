const Persons = ({ persons, onDeleteClick }) => {
    return (
        <div>
            {persons.map((person) => {
                return (
                    <p key={person.id}>
                        {person.name} {person.number} <button
                            onClick={() => onDeleteClick(person.id, person.name)}>
                            delete
                        </button>
                    </p>
                );
            })}
        </div>
    );
};

export default Persons;
