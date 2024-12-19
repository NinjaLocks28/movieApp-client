import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import UserContext from '../UserContext';



export default function Banner() {

    const { user } = useContext(UserContext);


    return (
        <div className="container pt-5">
            <div className='text-center my-5'>
                <h1>Discover Your Favorite <br /> Movies in Our Library</h1>
                <Link className="btn btn-dark my-4" to={ user.id ? '/movies' : 'login' }>Browse Our Collection!</Link>
            </div>
        </div>
    )
}
