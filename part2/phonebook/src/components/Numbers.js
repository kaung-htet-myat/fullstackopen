import React from 'react'

const Numbers = ({personsToShow, onPersonDeleteHandler}) =>
    <ul>
        {personsToShow.map(person => 
            <li key={person.name}>
                {person.name}
                &nbsp;
                {person.number}
                <button onClick={(e) => onPersonDeleteHandler(e, person.id, person.name)}>delete</button>
            </li>)}
    </ul>


export default Numbers