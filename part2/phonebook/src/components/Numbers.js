import React from 'react'

const Numbers = ({personsToShow}) =>
    <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>


export default Numbers