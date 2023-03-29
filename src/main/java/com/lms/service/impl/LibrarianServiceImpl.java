package com.lms.service.impl;

import com.lms.service.LibrarianService;
import com.lms.domain.Librarian;
import com.lms.repository.LibrarianRepository;
import com.lms.service.dto.BookDTO;
import com.lms.service.dto.LibrarianDTO;
import com.lms.service.mapper.LibrarianMapper;
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
 * Service Implementation for managing {@link Librarian}.
 */
@Service
@Transactional
public class LibrarianServiceImpl implements LibrarianService {

    private final Logger log = LoggerFactory.getLogger(LibrarianServiceImpl.class);

    private final LibrarianRepository librarianRepository;

    private final LibrarianMapper librarianMapper;

    public LibrarianServiceImpl(LibrarianRepository librarianRepository, LibrarianMapper librarianMapper) {
        this.librarianRepository = librarianRepository;
        this.librarianMapper = librarianMapper;
    }

    @Override
    public LibrarianDTO save(LibrarianDTO librarianDTO) {
        log.debug("Request to save Librarian : {}", librarianDTO);
        Librarian librarian = librarianMapper.toEntity(librarianDTO);
        librarian = librarianRepository.save(librarian);
        return librarianMapper.toDto(librarian);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LibrarianDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Librarians");
        return librarianRepository.findAll(pageable)
            .map(librarianMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<LibrarianDTO> findOne(Long id) {
        log.debug("Request to get Librarian : {}", id);
        return librarianRepository.findById(id)
            .map(librarianMapper::toDto);
    }

    @Override
    public List<LibrarianDTO> findByLibraryId(Long libraryId) {
        return librarianRepository.findByLibraryId(libraryId).stream()
                .map(librarianMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Librarian : {}", id);
        librarianRepository.deleteById(id);
    }
}
