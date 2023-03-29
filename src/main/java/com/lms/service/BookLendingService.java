package com.lms.service;

import com.lms.service.dto.BookLendingDTO;

import com.lms.service.dto.LibrarianDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.lms.domain.BookLending}.
 */
public interface BookLendingService {

    /**
     * Save a bookLending.
     *
     * @param bookLendingDTO the entity to save.
     * @return the persisted entity.
     */
    BookLendingDTO save(BookLendingDTO bookLendingDTO);

    /**
     * Get all the bookLendings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BookLendingDTO> findAll(Pageable pageable);


    /**
     * Get the "id" bookLending.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BookLendingDTO> findOne(Long id);
    BookLendingDTO returnBookLending(BookLendingDTO bookLendingDTO);



    List<BookLendingDTO> findByBookId(Long bookId);

    List<BookLendingDTO> findByStudentId(Long studentId);



    /**
     * Delete the "id" bookLending.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
