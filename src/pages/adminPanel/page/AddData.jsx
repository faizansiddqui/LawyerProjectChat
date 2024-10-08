import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLawyer } from '../../../redux/lawyerSlice';
import { auth } from '../../../firebase'; // Import the auth instance

import { createUserWithEmailAndPassword } from 'firebase/auth';

const AddData = () => {
    const [lawyerData, setLawyerData] = useState({
        name: '',
        fields: '',
        description: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.lawyers.loading);
    const error = useSelector((state) => state.lawyers.error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLawyerData({ ...lawyerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Register lawyer using Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                lawyerData.email,
                lawyerData.password
            );
            
            // Add lawyer to Firestore
            const lawyerProfile = {
                name: lawyerData.name,
                fields: lawyerData.fields,
                description: lawyerData.description,
                email: lawyerData.email,
                uid: userCredential.user.uid,
            };

            dispatch(addLawyer(lawyerProfile));
            setLawyerData({ name: '', fields: '', description: '', email: '', password: '' });
        } catch (error) {
            console.error("Error creating lawyer:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    value={lawyerData.name}
                    placeholder="Enter Lawyer Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="fields"
                    value={lawyerData.fields}
                    placeholder="Enter Lawyer Fields"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={lawyerData.description}
                    placeholder="Enter Description"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={lawyerData.email}
                    placeholder="Enter Lawyer Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={lawyerData.password}
                    placeholder="Enter Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">{loading ? 'Adding...' : 'Add Lawyer'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </form>
    );
};

export default AddData;
