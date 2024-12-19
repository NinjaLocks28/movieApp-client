import { Button, Col, Row, Table } from "react-bootstrap"
import MovieModalAdd from "./MovieModalAdd";
import MovieModalUpdate from "./MovieModalUpdate";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function AdminView({ movies , fetchMovies }) {
    const onAddMovie = (title, director, genre, year, description, closeModal) => {

        fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title : title,
                director : director,
                genre : genre, 
                year : year,
                description : description
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.message !== "string") {
                    Swal.fire({
                        title: "Added New Movie Successfully",
                        icon: "success"
                    });
                    fetchMovies();
                    closeModal();
                } else {
                    Swal.fire({
                        title: "Failed to Add New Movie",
                        icon: "error"
                    });
                }
            })


    }

    const onUpdateMovie = (title, director, genre, year, description, id, closeModal) => {

        fetch(`${process.env.REACT_APP_API_URL}/movies/updateMovie/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title : title,
                director : director,
                genre : genre, 
                year : year,
                description : description
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Movie updated successfully") {
                    Swal.fire({
                        title: "Movie Updated Successfully",
                        icon: "success"
                    });
                    fetchMovies();
                    closeModal();
                } else {
                    Swal.fire({
                        title: "Failed to Update Movie",
                        icon: "error"
                    });
                }
            })

    }


    const onDeleteMovie = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/movies/deleteMovie/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Movie deleted successfully") {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The Movie has been deleted.",
                                icon: "success"
                            });
                            fetchMovies();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Cannot Delete.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'The Movie is safe :)',
                    icon: 'info'
                });
            }
        });
    }


useEffect(() => {

},[])

    const mapMovie = (movies) => {
        return (
            movies.movies && movies.movies.length > 0 ? (
                movies.movies.map(movie => (

                    <tr className="text-center" key={movie._id}>
                        <th>{movie.title}</th>
                        <th>{movie.director}</th>
                        <th>{movie.genre}</th>
                        <th>{movie.year}</th>
                        <th>{movie.description}</th>
                        <th>
                            <Button className="me-2" size="sm">Get Comment</Button>
                            {<MovieModalUpdate ctitle={movie.title} cdirector={movie.director} cgenre={movie.genre} cyear={movie.year} cdescription={movie.description} movie={movie._id} onUpdateMovie={onUpdateMovie} />}
                            <Button variant="danger" size="sm" onClick={ (e) => onDeleteMovie(e , movie._id )}>
                                Delete
                            </Button>
                        </th>

                    </tr>
                ))
            ) : (
                <Col className="text-center">
                    <p>No movies available.</p>
                </Col>
            )
        )
    }


    return (
        <>
        <div className="container">
            <Row>
                <Col className="p-4 text-center">
                    <h1>Admin Dashboard</h1>
                    {<MovieModalAdd onAddMovie={onAddMovie} />}
                </Col>
            </Row>

            <Row>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">
                            <th>Title</th>
                            <th>Director</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Description</th>
                            <th colSpan={3}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {mapMovie(movies)}
                    </tbody>
                </Table>
            </Row>
        </div>

        </>
    )
}
