import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function MovieModalAdd({onAddMovie}) {

    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')

    const [addModal, setAddModal] = useState(false);
    const showModal = () => setAddModal(true);
    const closeModal = () => setAddModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMovie(title, director, genre, year, description, closeModal );

        setTitle('')
        setDirector('')
        setGenre('')
        setDescription('')
    };

    return (
        <>
        <div className="container">

       
            <Button variant="success" onClick={showModal}> ADD MOVIE </Button>

            <Modal show={addModal} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add Movie</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Movie Title"
                                required
                                value={title}
                                onChange={e => { setTitle(e.target.value) }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Director:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Movie Director"
                                required
                                value={director}
                                onChange={e => { setDirector(e.target.value) }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Genre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Movie Genre"
                                required
                                value={genre}
                                onChange={e => { setGenre(e.target.value) }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Year:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Movie Release Year"
                                required
                                value={year}
                                onChange={e => { setYear(e.target.value) }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Movie Description"
                                required
                                value={description}
                                onChange={e => { setDescription(e.target.value) }} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            </div>
        </>
    );
}


