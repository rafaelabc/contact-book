package com.rafaelacustodio.contactbook.service.interfaces;

import com.rafaelacustodio.contactbook.model.Contact;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IContactService {
    ResponseEntity<Contact> create(Contact contact);
    List<Contact> findAll();
    ResponseEntity<Contact> edit(Long id, Contact contact);
    ResponseEntity<Contact> delete(Long id);
    ResponseEntity<Contact> getById(Long id);
}
