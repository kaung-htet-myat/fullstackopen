import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const updateFilterHandler = (event) => {
        dispatch(updateFilter(event.target.value))
    }

    return (
        <div>Filter: <input onChange={(e) => updateFilterHandler(e)} name='filter'/></div>
    )
}

export default Filter