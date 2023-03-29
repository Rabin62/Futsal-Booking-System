package com.lms.repository;

import com.lms.domain.Book;
import com.lms.domain.Semester;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Semester entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    List<Semester> findByFacultyId(Long facultyId);

}
