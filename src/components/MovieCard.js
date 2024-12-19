import { Button, Card, ListGroup } from "react-bootstrap"
import MovieModalView from "./MovieModalView";
import { useState } from "react";


export default function MovieCard({ movie }) {
    console.log('Movie Card', movie)
    const { _id, title, year, description, genre } = movie;


    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


    return (
        <>


            <Card className='movie-card' onClick={handleShow}>
                <Card.Img variant="top" src="/18-189751_movie-placeholder-hd-png-download.png" />
                <Card.Body>
                    <Card.Subtitle className="my-2">{year} - {genre}</Card.Subtitle>
                    <Card.Title><h4>{title}</h4></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{description}</ListGroup.Item>
                </ListGroup>
            </Card>

            <MovieModalView show={showModal} handleClose={handleClose} movie={movie} />

        </>
    )
}
