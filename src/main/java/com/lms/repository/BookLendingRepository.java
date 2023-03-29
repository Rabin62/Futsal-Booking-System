package com.lms.repository;

import com.lms.domain.BookLending;

import com.lms.domain.Student;
import com.lms.service.dto.BookLendingDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the BookLending entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookLendingRepository extends JpaRepository<BookLending, Long> {
    List<BookLending> findByBookId(Long bookId);
    List<BookLending> findByStudentId(Long studentId);
Optional<BookLending> findById(Long id);


}
