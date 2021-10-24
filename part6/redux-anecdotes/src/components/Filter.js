import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const updateFilterHandler = (event) => {
        props.updateFilter(event.target.value)
    }

    return (
        <div>Filter: <input onChange={(e) => updateFilterHandler(e)} name='filter'/></div>
    )
}

const mapDispatchToProps = {
    updateFilter
}

export default connect(null, mapDispatchToProps)(Filter)