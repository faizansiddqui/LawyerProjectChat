import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLawyer } from '../../../redux/lawyerSlice';

const AddData = () => {

    const [lawyerData, setLawyerData] = useState({
        name: '',
        fields: '',
        description: ''
    })

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.lawyers.loading)
    const error =  useSelector((state) => state.lawyers.error);

    const handleChange = (e) =>{
        const { name, value} = e.target;
        setLawyerData({...lawyerData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addLawyer(lawyerData));
        setLawyerData({name: '', fields: '', description: ''});
    }
  return (
    <form onSubmit={handleSubmit}>
    <div>
           <input 
              type="text"
              name="name"
              value={lawyerData.name}
              placeholder='Enter Lawyer Name'
              onChange={handleChange}
              required
           /> 
           <input 
              type="text"
              name="fields"
              value={lawyerData.fields}
              placeholder='Enter Lawyer Fields'
              onChange={handleChange}
              required
           /> 
           <input 
              type="text"
              name="description"
              value={lawyerData.description}
              placeholder='Enter Description'
              onChange={handleChange}
              required
           /> 
           <button type='submit'> {loading ? 'Adding...' : 'addLawyer'} </button>
           {error && <p style={{color: 'red'}}> {error} </p>}
    </div>
    </form>
  )
}

export default AddData