import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectlawyers } from '../../redux/lawyerSlice'
import { useParams } from 'react-router-dom';

const LawyerProfileStructure = () => {

  const AllLawyer = useSelector(selectlawyers);
  const error = useSelector((state) => state.lawyers.error);
  const loading = useSelector((state) => state.lawyers.loading);
  const { lawyerId } = useParams();
  const dispatch = useDispatch();

  const TargetedLawyer = AllLawyer.find((lawyer) => lawyer.id === lawyerId);


  if(error){
    return <p> {error } </p>
  }
  if(loading){
    return <p> {loading} </p>
  }
  if(!TargetedLawyer){
    return <p style={{color: '#000'}}> Oops, We couldn't find any lawyers in your area</p>
  }



  return (
    <div style={{color: '#000'}}>
        <h1> This Is Best Lawyer For You </h1>
        <p>{TargetedLawyer.name}</p>
        <p className="description">{TargetedLawyer.description}</p>
        <p>
            Decsription: Our Services Find Best Lawyers For You
        </p>
    </div>
  )
}

export default LawyerProfileStructure