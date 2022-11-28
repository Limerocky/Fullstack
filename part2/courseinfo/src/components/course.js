const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => 
  <p>
    Number of exercises {parts.reduce((previousValue, nextValue) => previousValue + nextValue.exercises, 0)}
  </p>


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>


const Course = ({ course }) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export {Course, Header, Content, Total, Part}