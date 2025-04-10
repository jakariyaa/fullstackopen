const Header = ({ course }) => {
    return <h1>{course}</h1>;
}

const Part = ({ name, exercises }) => {
    return <p>{name} {exercises}</p>;
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </>
    );
}

const Total = ({ parts }) => {
    const totalExercise = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <h3>total of {totalExercise} exercises</h3>;
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course