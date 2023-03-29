package com.lms.service;

import com.lms.service.dto.LibrarianDTO;
import com.lms.service.dto.SemesterDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.lms.domain.Semester}.
 */
public interface SemesterService {

    /**
     * Save a semester.
     *
     * @param semesterDTO the entity to save.
     * @return the persisted entity.
     */
    SemesterDTO save(SemesterDTO semesterDTO);

    /**
     * Get all the semesters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SemesterDTO> findAll(Pageable pageable);

    List<SemesterDTO> findAll();



    /**
     * Get the "id" semester.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SemesterDTO> findOne(Long id);

    List<SemesterDTO> findByFacultyId(Long facultyId);


    /**
     * Delete the "id" semester.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
