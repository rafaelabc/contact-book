package com.rafaelacustodio.contactbook.repository;

import com.rafaelacustodio.contactbook.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository <Contact, Long> {

}
