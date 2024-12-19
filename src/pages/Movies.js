import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

export default function Movie() {

    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);

    const fetchMovies = () => {
        fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setMovies(data))
    }


    useEffect(() => {

        if (user.id) {

            fetchMovies();
            console.log(movies);
        }

    }, [user])



    return (
        <>
            
            {
                (user.isAdmin === true) ?
                    <AdminView movies={movies} fetchMovies={fetchMovies} />
                    :
                    <UserView movies={movies} />
            }
        </>
    )
}
