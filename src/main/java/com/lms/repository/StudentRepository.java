package com.lms.repository;

import com.lms.domain.Book;
import com.lms.domain.Student;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findBySemesterId(Long semesterId);

}
