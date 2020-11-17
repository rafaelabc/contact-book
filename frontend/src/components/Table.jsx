import React, { useEffect, useState } from 'react';
import { FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import '../assets/styles/style-components/Table.css';
import ModalEdit from '../components/ModalEdit';
import api from '../services/api';
function Table() {
    const defaultContact = {
        id: undefined,
        name: '',
        lastName: '',
        email: '',
        phone: '',
    };
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(defaultContact);
    const [modalTitulo, setModalTitulo] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');

    async function loadContacts() {
        const response = await api.get('contacts');
        setContacts(response.data);
    }

    async function deleteItem(id) {
        await api.delete('contacts/' + id);
        loadContacts();
    }

    function openModalAdd() {
        setModalTitulo('Adicionar');
        setModalAction('add');
        setContact(defaultContact);
        setModalShow(true);
    }
    function openModalEdit(item) {
        setModalTitulo('Editar');
        setModalAction('edit');
        setContact(item);
        setModalShow(true);
    }
    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="Table">
            <ModalEdit
                titulo={modalTitulo}
                action={modalAction}
                show={modalShow}
                contact={contact}
                onHide={() => setModalShow(false)}
                onLoad={() => loadContacts()}
            />
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>
                            <button
                                type="button"
                                onClick={() => openModalAdd()}
                                className="btn btn-success btn-sm">
                                <FaPlus />
                                <div className="">Adicionar</div>
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Contato</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((elem, index) => (
                        <tr key={elem.id}>
                            <th>{elem.id}</th>
                            <th>
                                {elem.name} {elem.lastName}
                            </th>
                            <th>{elem.email}</th>
                            <th>{elem.phone}</th>

                            <th className="d-flex justify-content-between ">
                                <button
                                    type="button"
                                    onClick={() => {
                                        openModalEdit(elem);
                                    }}
                                    className="btn btn-primary">
                                    <FaRegEdit />
                                </button>
                                <button
                                    type="button"
                                    name={elem.id}
                                    onClick={() => deleteItem(elem.id)}
                                    className="btn btn-danger">
                                    <FaTrash />
                                </button>
                            </th>
                            <th></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Table;
