package com.lms.repository;

import com.lms.domain.Book;

import com.lms.service.dto.BookDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Book entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByStatus(Boolean status);
    List<Book> findAllBookBySubjectIdAndAuthorId(Long subjectId, Long authorId);

    List<Book> findByAuthorId(Long authorId);
    List<Book> findBySubjectId(Long subjectId);
    List<Book>findAllBookByAuthorIdAndSubjectId(Long subjectId, Long authorId);



}
