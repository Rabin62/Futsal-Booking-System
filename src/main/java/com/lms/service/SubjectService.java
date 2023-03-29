package com.lms.service;

import com.lms.service.dto.SubjectDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.lms.domain.Subject}.
 */
public interface SubjectService {

    /**
     * Save a subject.
     *
     * @param subjectDTO the entity to save.
     * @return the persisted entity.
     */
    SubjectDTO save(SubjectDTO subjectDTO);

    /**
     * Get all the subjects.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SubjectDTO> findAll(Pageable pageable);

    List<SubjectDTO> findAll();


    /**
     * Get all the subjects with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<SubjectDTO> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" subject.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubjectDTO> findOne(Long id);

    /**
     * Delete the "id" subject.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
