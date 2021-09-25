import React from 'react'

const Filters = ({searchHandler}) =>
    <div>
        filter: <input onChange={searchHandler} />
    </div>

export default Filters