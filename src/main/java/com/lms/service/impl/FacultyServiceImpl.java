package com.lms.service.impl;

import com.lms.service.FacultyService;
import com.lms.domain.Faculty;
import com.lms.repository.FacultyRepository;
import com.lms.service.dto.FacultyDTO;
import com.lms.service.mapper.FacultyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Faculty}.
 */
@Service
@Transactional
public class FacultyServiceImpl implements FacultyService {

    private final Logger log = LoggerFactory.getLogger(FacultyServiceImpl.class);

    private final FacultyRepository facultyRepository;

    private final FacultyMapper facultyMapper;

    public FacultyServiceImpl(FacultyRepository facultyRepository, FacultyMapper facultyMapper) {
        this.facultyRepository = facultyRepository;
        this.facultyMapper = facultyMapper;
    }

    @Override
    public FacultyDTO save(FacultyDTO facultyDTO) {
        log.debug("Request to save Faculty : {}", facultyDTO);
        Faculty faculty = facultyMapper.toEntity(facultyDTO);
        faculty = facultyRepository.save(faculty);
        return facultyMapper.toDto(faculty);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FacultyDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Faculties");
        return facultyRepository.findAll(pageable)
            .map(facultyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacultyDTO> findAll( ) {
        log.debug("Request to get all Faculties");
        return facultyRepository.findAll().stream()
                .map(facultyMapper::toDto).collect(Collectors.toList());
    }


    public Page<FacultyDTO> findAllWithEagerRelationships(Pageable pageable) {
        return facultyRepository.findAllWithEagerRelationships(pageable).map(facultyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FacultyDTO> findOne(Long id) {
        log.debug("Request to get Faculty : {}", id);
        return facultyRepository.findOneWithEagerRelationships(id)
            .map(facultyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Faculty : {}", id);
        facultyRepository.deleteById(id);
    }
}
