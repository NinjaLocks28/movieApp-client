import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function MovieModalUpdate({ctitle, cdirector, cgenre, cyear, cdescription, movie, onUpdateMovie}) {

    const [title, setTitle] = useState(ctitle)
    const [director, setDirector] = useState(cdirector)
    const [genre, setGenre] = useState(cgenre)
    const [year, setYear] = useState(cyear)
    const [description, setDescription] = useState(cdescription)

    const [updateModal, setUpdateModal] = useState(false);
    const showModal = () => setUpdateModal(true);
    const closeModal = () => setUpdateModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateMovie(title, director, genre, year, description, movie, closeModal);

    };

    return (
        <>
        
            <Button variant="info" size='sm' className='me-2' onClick={showModal}> Update </Button>

            <Modal show={updateModal} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Update Movie</Modal.Title>
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
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}


