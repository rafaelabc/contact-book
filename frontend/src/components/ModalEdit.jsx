import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../services/api';

function ModalEdit(props) {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    async function save() {
        if (name.length === 0 || lastName === 0 || email === 0 || phone === 0) {
            setError(true);
            const timer = setTimeout(() => {
                setError(false);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            if (props.action === 'add') {
                const contact = {
                    name: name,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                };
                await api.post('contacts', contact);
                setSuccess(true);
                const timer = setTimeout(() => {
                    setSuccess(false);
                    clearInput();
                    props.onLoad();
                    props.onHide();
                }, 2000);
                return () => clearTimeout(timer);
            }
            if (props.action === 'edit') {
                const contact = {
                    name: name,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                };
                await api.put('contacts/' + props.contact.id, contact);
                setSuccess(true);
                const timer = setTimeout(() => {
                    setSuccess(false);
                    clearInput();
                    props.onLoad();
                    props.onHide();
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }

    function clearInput() {
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
    }
    useEffect(() => {
        setName(props.contact.name);
        setEmail(props.contact.email);
        setLastName(props.contact.lastName);
        setPhone(props.contact.phone);
    }, [props]);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.titulo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <form>
                    {success ? (
                        <div className="alert alert-success" role="alert">
                            Salvo com sucesso!
                        </div>
                    ) : (
                        ''
                    )}
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Não foi possível salvar! Verifique se todos os
                            campos são válidos.
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="form-group">
                        <label className="col-form-label">Nome</label>

                        <input
                            type="text"
                            value={name}
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            id="recipient-name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Sobrenome</label>
                        <input
                            type="text"
                            value={lastName}
                            className="form-control"
                            onChange={(e) => setLastName(e.target.value)}
                            id="recipient-name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Email</label>
                        <input
                            type="text"
                            value={email}
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            id="recipient-name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Telefone</label>
                        <input
                            type="text"
                            value={phone}
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                            id="recipient-name"
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={save}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalEdit;
