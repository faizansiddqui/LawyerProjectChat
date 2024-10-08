import React from 'react'
import { LawyerFeeld } from '../../assets/lawyersFeeld'
import './lawyerFeeldcon.css'
import { Link, useNavigate } from 'react-router-dom'

const LawyerFeelds = () => {
    const navigate = useNavigate();

    const handleSeeAllLawyers = (fieldName) => {
        navigate(`/lawyerprofile?field=${fieldName}`);
    };
    
    return (
        <div className='lawyerFeeldcon'>
            {LawyerFeeld.map((lawyer, i) => {
                return (
                    <div className='lawyerFeeldCart' key={i}>
                        <h1>{lawyer.fieldName}</h1>
                        <p>{lawyer.des}</p>
                        <button onClick={() => handleSeeAllLawyers(lawyer.fieldName)}>See All Lawyers</button>
                    </div>
                );
            })}
        </div>
    );
};

export default LawyerFeelds;