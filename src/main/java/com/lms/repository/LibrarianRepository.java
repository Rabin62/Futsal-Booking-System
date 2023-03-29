package com.lms.repository;

import com.lms.domain.Book;
import com.lms.domain.Librarian;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Librarian entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LibrarianRepository extends JpaRepository<Librarian, Long> {
    List<Librarian> findByLibraryId(Long libraryId);
}
