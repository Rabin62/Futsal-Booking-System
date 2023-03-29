package com.lms.service;

import com.lms.service.dto.BookDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.lms.domain.Book}.
 */
public interface BookService {

    /**
     * Save a book.
     *
     * @param bookDTO the entity to save.
     * @return the persisted entity.
     */
    BookDTO save(BookDTO bookDTO);

    /**
     * Get all the books.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BookDTO> findAll(Pageable pageable);

    List<BookDTO> findAll();



    /**
     * Get the "id" book.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BookDTO> findOne(Long id);
     List<BookDTO> findByStatus(Boolean status);

    List<BookDTO> findByAuthorId(Long authorId);

    List<BookDTO> findBySubjectId(Long subjectId);

    List<BookDTO> findAllBookBySubjectIdAndAuthorId(Long subjectId, Long authorId);


    /**
     * Delete the "id" book.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
