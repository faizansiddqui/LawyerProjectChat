import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlawyers, selectlawyers } from '../redux/lawyerSlice';
import './LawyerProfile.css';
import { useLocation, useNavigate } from 'react-router-dom';

const LawyerProfile = () => {
    const dispatch = useDispatch();
    const lawyers = useSelector(selectlawyers);
    const loading = useSelector((state) => state.lawyers.loading);
    const error = useSelector((state) => state.lawyers.error);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchlawyers()); // Fetch all lawyers when component mounts
    }, [dispatch]);

    // Extract field from query parameter
    const query = new URLSearchParams(location.search);
    const field = query.get('field');

    // Filter lawyers based on the selected field
    const filteredLawyers = field
        ? lawyers.filter((lawyer) => lawyer.fields.toLowerCase() === field.toLowerCase())
        : lawyers;

    // Handle navigating to the ChatRoom component with a specific lawyer ID
    const handleChatWithLawyer = (lawyerId) => {
        navigate(`/chatRoom?lawyerId=${lawyerId}`);
    };

    if (loading) {
        return <p className="message loading">Loading...</p>;
    }
    if (error) {
        return <p className="message error">{error}</p>;
    }

    return (
        <div className="container">
            {filteredLawyers.length < 1 ? (
                <p className="no-product">No Lawyers Found in {field} Field</p>
            ) : (
                <div className="products-list">
                    {filteredLawyers.map((lawyer) => (
                        <div className="product-card" key={lawyer.id}>
                            <h2>{lawyer.name}</h2>
                            <p className="price">Field: {lawyer.fields}</p>
                            <p className="description">{lawyer.description}</p>
                            <button onClick={() => handleChatWithLawyer(lawyer.id)}>Chat with Lawyer</button>
                            <button onClick={() => navigate(`/lawyerprofile/${lawyer.id}`)}>View Profile</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LawyerProfile;
