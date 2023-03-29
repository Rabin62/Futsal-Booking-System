package com.lms.service;

import com.lms.service.dto.LibraryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.lms.domain.Library}.
 */
public interface LibraryService {

    /**
     * Save a library.
     *
     * @param libraryDTO the entity to save.
     * @return the persisted entity.
     */
    LibraryDTO save(LibraryDTO libraryDTO);

    /**
     * Get all the libraries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LibraryDTO> findAll(Pageable pageable);

    List<LibraryDTO> findAll( );



    /**
     * Get the "id" library.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LibraryDTO> findOne(Long id);

    /**
     * Delete the "id" library.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
