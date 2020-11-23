package com.rafaelacustodio.contactbook.service;

import com.rafaelacustodio.contactbook.model.Contact;
import com.rafaelacustodio.contactbook.repository.ContactRepository;
import com.rafaelacustodio.contactbook.service.interfaces.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService implements IContactService {
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public ResponseEntity<Contact> create(Contact contact) {
        return new ResponseEntity<Contact>(contactRepository.save(contact), HttpStatus.OK);
    }

    @Override
    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    @Override
    public ResponseEntity<Contact> edit(Long id, Contact contact) {
        return contactRepository.findById(id).map(record ->{

            record.setName(contact.getName());
            record.setLastName(contact.getLastName());
            record.setEmail(contact.getEmail());
			record.setPhone(contact.getPhone());
			record.setUf(contact.getUf());
			record.setCity(contact.getCity());
			record.setBairro(contact.getBairro());
			record.setLogradouro(contact.getLogradouro());
			record.setNumero(contact.getNumero());
			record.setCep(contact.getCep());

            Contact contactUpdated = contactRepository.save(record);
            return new ResponseEntity<Contact>(contactUpdated, HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());

    }

    @Override
    public ResponseEntity<Contact> delete(Long id) {
        return contactRepository.findById(id).map(record -> {
            contactRepository.deleteById(id);
            return new ResponseEntity<Contact>(record, HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Contact> getById(Long id) {
        return contactRepository.findById(id).map(record -> ResponseEntity.ok().body(record)).orElse(ResponseEntity.notFound().build());
    }
}
