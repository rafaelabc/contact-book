import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import api from '../services/api';
import viacep from '../services/viacep';
function ModalEdit(props) {
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const [uf, setUf] = useState('');
	const [city, setCity] = useState('');
	const [cep, setCep] = useState(0);
	const [logradouro, setLogradouro] = useState('');
	const [bairro, setBairro] = useState('');
	const [numero, setNumero] = useState(0);

	async function save() {
		if (name.length === 0 || lastName === 0 || email === 0 || phone === 0 || logradouro.length === 0 || bairro.length === 0 || cep === 0 || numero === 0) {
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
					city: city,
					uf: uf,
					cep: cep,
					logradouro: logradouro,
					bairro: bairro,
					numero: numero,
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
					city: city,
					uf: uf,
					cep: cep,
					logradouro: logradouro,
					bairro: bairro,
					numero: numero,
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
	async function getDadosViaCep(cep) {
		if (cep) {
			var validacep = /^[0-9]{8}$/;
			if (validacep.test(cep)) {

				setUf('...');
				setCity('...')
				setLogradouro('...');
				setBairro('...');
				const response = await viacep.get('ws/' + cep + '/json');

				if (response.data.erro) {
					alert("CEP não encontrado")
					setUf('');
					setCity('')
					setCep('');
					setLogradouro('');
					setBairro('');
					setNumero('')
				}else{
					setUf(response.data.uf);
					setCity(response.data.localidade)
					setLogradouro(response.data.logradouro);
					setBairro(response.data.bairro);
				}
			}
		} else {
			setUf('');
			setCity('')
			setCep('');
			setLogradouro('');
			setBairro('');
			setNumero('')
		}

	}
	function clearInput() {
		setName('');
		setLastName('');
		setEmail('');
		setPhone('');
		setUf('');
		setCity('')
		setCep('');
		setLogradouro('');
		setBairro('');
		setNumero('')
	}
	useEffect(() => {
		setName(props.contact.name);
		setEmail(props.contact.email);
		setLastName(props.contact.lastName);
		setPhone(props.contact.phone);

		setUf(props.contact.uf);
		setCity(props.contact.city)
		setCep(props.contact.cep);
		setLogradouro(props.contact.logradouro);
		setBairro(props.contact.bairro);
		setNumero(props.contact.numero)
	}, [props]);

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
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

					<div className="container form-group">
						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">Nome</label>

								<input
									type="text"
									value={name}
									className="form-control"
									onChange={(e) => setName(e.target.value)}
									id="recipient-name"
								/>
							</div>
							<div className="col-sm">

								<label className="col-form-label">Sobrenome</label>
								<input
									type="text"
									value={lastName}
									className="form-control"
									onChange={(e) => setLastName(e.target.value)}
									id="recipient-name"
								/>
							</div>

						</div>
						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">Email</label>
								<input
									type="text"
									value={email}
									className="form-control"
									onChange={(e) => setEmail(e.target.value)}
									id="recipient-name"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">CEP(Apenas números)</label>
								<input
									type="number"
									value={cep}
									placeholder="37048070"
									className="form-control"
									onBlur={(e) => {

										getDadosViaCep(e.target.value);

									}}
									onChange={(e) => {

										setCep(e.target.value)
									}}
									id="recipient-name"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">Telefone</label>
								<input
									type="text"
									value={phone}
									className="form-control"
									onChange={(e) => setPhone(e.target.value)}
									id="recipient-name"
								/>
							</div>
							<div className="col-sm">
								<label className="col-form-label">Cidade</label>
								<input
									type="text"
									value={city}
									className="form-control"
									onChange={(e) => setCity(e.target.value)}
									id="recipient-name"
								/>
							</div>
							<div className="col-sm">
								<label className="col-form-label">Estado</label>
								<input
									type="text"
									value={uf}
									className="form-control"
									onChange={(e) => setUf(e.target.value)}
									id="recipient-name"
								/>

							</div>
						</div>

						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">Logradouro</label>
								<input
									type="text"
									value={logradouro}
									className="form-control"
									onChange={(e) => setLogradouro(e.target.value)}
									id="recipient-name"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">Bairro</label>
								<input
									type="text"
									value={bairro}
									className="form-control"
									onChange={(e) => setBairro(e.target.value)}
									id="recipient-name"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<label className="col-form-label">Número</label>
								<input
									type="number"
									value={numero}
									className="form-control"
									onChange={(e) => setNumero(e.target.value)}
									id="recipient-name"
								/>
							</div>
						</div>

					</div>
				</form>
			</Modal.Body >
			<Modal.Footer>
				<Button onClick={save}>Salvar</Button>
			</Modal.Footer>
		</Modal >
	);
}
export default ModalEdit;
