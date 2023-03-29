package com.lms.service.impl;

import com.lms.service.SemesterService;
import com.lms.domain.Semester;
import com.lms.repository.SemesterRepository;
import com.lms.service.dto.LibrarianDTO;
import com.lms.service.dto.SemesterDTO;
import com.lms.service.mapper.SemesterMapper;
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
 * Service Implementation for managing {@link Semester}.
 */
@Service
@Transactional
public class SemesterServiceImpl implements SemesterService {

    private final Logger log = LoggerFactory.getLogger(SemesterServiceImpl.class);

    private final SemesterRepository semesterRepository;

    private final SemesterMapper semesterMapper;

    public SemesterServiceImpl(SemesterRepository semesterRepository, SemesterMapper semesterMapper) {
        this.semesterRepository = semesterRepository;
        this.semesterMapper = semesterMapper;
    }

    @Override
    public SemesterDTO save(SemesterDTO semesterDTO) {
        log.debug("Request to save Semester : {}", semesterDTO);
        Semester semester = semesterMapper.toEntity(semesterDTO);
        semester = semesterRepository.save(semester);
        return semesterMapper.toDto(semester);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SemesterDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Semesters");
        return semesterRepository.findAll(pageable)
            .map(semesterMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SemesterDTO> findAll() {
        log.debug("Request to get all Semesters");
        return semesterRepository.findAll().stream()
                .map(semesterMapper::toDto).collect(Collectors.toList());
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<SemesterDTO> findOne(Long id) {
        log.debug("Request to get Semester : {}", id);
        return semesterRepository.findById(id)
            .map(semesterMapper::toDto);
    }
    @Override
    public List<SemesterDTO> findByFacultyId(Long facultyId) {
        return semesterRepository.findByFacultyId(facultyId).stream()
                .map(semesterMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Semester : {}", id);
        semesterRepository.deleteById(id);
    }
}
