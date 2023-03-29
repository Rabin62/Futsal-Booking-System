package com.lms.repository;

import com.lms.domain.Faculty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Faculty entity.
 */
@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    @Query(value = "select distinct faculty from Faculty faculty left join fetch faculty.subjects",
        countQuery = "select count(distinct faculty) from Faculty faculty")
    Page<Faculty> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct faculty from Faculty faculty left join fetch faculty.subjects")
    List<Faculty> findAllWithEagerRelationships();

    @Query("select faculty from Faculty faculty left join fetch faculty.subjects where faculty.id =:id")
    Optional<Faculty> findOneWithEagerRelationships(@Param("id") Long id);
}
