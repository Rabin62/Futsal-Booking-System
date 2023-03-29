package com.lms.service;

import com.lms.service.dto.LibrarianDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.lms.domain.Librarian}.
 */
public interface LibrarianService {

    /**
     * Save a librarian.
     *
     * @param librarianDTO the entity to save.
     * @return the persisted entity.
     */
    LibrarianDTO save(LibrarianDTO librarianDTO);

    /**
     * Get all the librarians.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LibrarianDTO> findAll(Pageable pageable);


    /**
     * Get the "id" librarian.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LibrarianDTO> findOne(Long id);

    List<LibrarianDTO> findByLibraryId(Long libraryId);

    /**
     * Delete the "id" librarian.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
