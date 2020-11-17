package com.rafaelacustodio.contactbook.controller;

import com.rafaelacustodio.contactbook.model.Contact;
import com.rafaelacustodio.contactbook.service.interfaces.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactController {
    private final IContactService contactService;


    public ContactController(IContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Contact> create(@RequestBody Contact contact){
        return contactService.create(contact);
    }

    @GetMapping
    public List<Contact> findAll(){
        return contactService.findAll();
    }
    @GetMapping(path ={"/{id}"})
    public ResponseEntity<Contact> getById(@PathVariable Long id){
        return contactService.getById(id);
    }
    @DeleteMapping(path = {"/{id}"})
    public ResponseEntity<Contact> delete(@PathVariable Long id){
        return contactService.delete(id);
    }

    @PutMapping(path = {"/{id}"})
    public ResponseEntity<Contact> edit(@PathVariable("id") Long id, @RequestBody Contact contact){
        return contactService.edit(id, contact);
    }

}
