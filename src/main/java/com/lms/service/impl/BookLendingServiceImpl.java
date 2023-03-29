package com.lms.service.impl;

import com.lms.service.BookLendingService;
import com.lms.domain.BookLending;
import com.lms.repository.BookLendingRepository;
import com.lms.service.dto.BookLendingDTO;
import com.lms.service.dto.LibrarianDTO;
import com.lms.service.mapper.BookLendingMapper;
import com.lms.web.rest.AuditResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link BookLending}.
 */
@Service
@Transactional
public class BookLendingServiceImpl implements BookLendingService {

    private final Logger log = LoggerFactory.getLogger(BookLendingServiceImpl.class);

    private final BookLendingRepository bookLendingRepository;

    private final BookLendingMapper bookLendingMapper;


    public BookLendingServiceImpl(BookLendingRepository bookLendingRepository, BookLendingMapper bookLendingMapper) {
        this.bookLendingRepository = bookLendingRepository;
        this.bookLendingMapper = bookLendingMapper;
    }

    @Override
    public BookLendingDTO save(BookLendingDTO bookLendingDTO) {
        log.debug("Request to save BookLending : {}", bookLendingDTO);
        BookLending bookLending = bookLendingMapper.toEntity(bookLendingDTO);
        bookLending = bookLendingRepository.save(bookLending);
        return bookLendingMapper.toDto(bookLending);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookLendingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BookLendings");
        return bookLendingRepository.findAll(pageable)
            .map(bookLendingMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<BookLendingDTO> findOne(Long id) {
        log.debug("Request to get BookLending : {}", id);
        return bookLendingRepository.findById(id)
            .map(bookLendingMapper::toDto);
    }
   @Override
  public BookLendingDTO returnBookLending(BookLendingDTO bookLendingDTO){
       Optional<BookLending> booklending = bookLendingRepository.findById(bookLendingDTO.getId());
        log.debug("Request to get BookLending : {}", bookLendingDTO);
        if(booklending.isPresent()){
            booklending.get().setReturnedDate(LocalDate.now());
            booklending.get().setNote(bookLendingDTO.getNote());
        booklending.get().setStatus(true);

           BookLending bookLending = bookLendingRepository.save(booklending.get());
            return bookLendingMapper.toDto(bookLending);
        }
     return null;
    }




    @Override
    public List<BookLendingDTO> findByBookId(Long bookId) {
        return bookLendingRepository.findByBookId(bookId).stream()
                .map(bookLendingMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<BookLendingDTO> findByStudentId(Long studentId) {
        return bookLendingRepository.findByStudentId(studentId).stream()
                .map(bookLendingMapper::toDto).collect(Collectors.toList());
    }


    @Override
    public void delete(Long id) {
        log.debug("Request to delete BookLending : {}", id);
        bookLendingRepository.deleteById(id);
    }
}
