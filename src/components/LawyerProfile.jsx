import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlawyers, selectlawyers } from '../redux/lawyerSlice';
import './LawyerProfile.css';
import { useLocation, Link } from 'react-router-dom';

const LawyerProfile = () => {
    const dispatch = useDispatch();
    const lawyers = useSelector(selectlawyers);
    const loading = useSelector((state) => state.lawyers.loading);
    const error = useSelector((state) => state.lawyers.error);
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchlawyers()); // Fetch all lawyers when component mounts
    }, [dispatch]);

    // Extract field from query parameter
    const query = new URLSearchParams(location.search);
    const field = query.get('field');

    // Filter lawyers based on the selected field
    const filteredLawyers = field
        ? lawyers.filter((lawyer) => lawyer.fields.toLowerCase() === field.toLowerCase())
        : [];

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
                    {filteredLawyers.map((lawyer, i) => (
                        <div className="product-card" key={i}>
                            <h2>{lawyer.name}</h2>
                            <p className="price">Field: {lawyer.fields}</p>
                            <p className="description">{lawyer.description}</p>
                            <Link to={`/lawyerprofile/${lawyer.id}`}>View Profile</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LawyerProfile;