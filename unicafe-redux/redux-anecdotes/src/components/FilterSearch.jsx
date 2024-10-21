import React from 'react'
import { useDispatch } from 'react-redux'
import filterReducer, { setFilter } from '../reducers/filterReducer'

const FilterSearch = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const filterValue = event.target.value
        dispatch(setFilter(filterValue))
      }
      const style = {
        marginBottom: 10
      }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default FilterSearch