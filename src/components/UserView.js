
import { Row, Col } from "react-bootstrap";

import MovieCard from "./MovieCard";


export default function UserView({movies}) {

    return (

        <>
        <div className="container">
            <Row>
                <Col className="my-5 pt-5 text-center mx-auto">
                    <h1>Movie List</h1>
                </Col>
            </Row>
            <Row>
                {
                    movies.movies && movies.movies.length > 0 ? (
                        movies.movies.map(movie => (
                            <Col md={3} key={movie._id}>
                                <MovieCard movie={movie}  />
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <p>No movies available.</p>
                        </Col>
                    )
                }
            </Row>
        </div>
            
        </>

    )
}