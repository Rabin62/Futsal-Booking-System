package com.lms.service.impl;

import com.lms.domain.Author;
import com.lms.domain.Subject;
import com.lms.repository.AuthorRepository;
import com.lms.repository.SubjectRepository;
import com.lms.service.BookService;
import com.lms.domain.Book;
import com.lms.repository.BookRepository;
import com.lms.service.dto.BookDTO;
import com.lms.service.mapper.BookMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Book}.
 */
@Service
@Transactional
public class BookServiceImpl implements BookService {

    private final Logger log = LoggerFactory.getLogger(BookServiceImpl.class);

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final SubjectRepository subjectRepository;

    private final BookMapper bookMapper;

    public BookServiceImpl(BookRepository bookRepository, BookMapper bookMapper, AuthorRepository authorRepository, SubjectRepository subjectRepository) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.authorRepository = authorRepository;
        this.subjectRepository = subjectRepository;

    }

    @Override
    public BookDTO save(BookDTO bookDTO) {
        log.debug("Request to save Book : {}", bookDTO);
        Book book = bookMapper.toEntity(bookDTO);
        if(book.getId() == null ) {
            List<BookDTO> books = findAllBookBySubjectIdAndAuthorId(bookDTO.getSubjectId(),bookDTO.getAuthorId());
            if(books != null && books.size() > 0) {
                BookDTO lastBookDTO = books.get(books.size()-1);
                String oldBookNumber = lastBookDTO.getBookNumber();
                String bookCode = oldBookNumber.substring(0,4).toUpperCase();
                String bookCodeNumber = oldBookNumber.substring(4);
                Integer bookCodeNumberInt = Integer.parseInt(bookCodeNumber);
                bookCodeNumberInt++;
                book.setBookNumber((bookCode.toUpperCase() + bookCodeNumberInt));
            } else {
                Author author = authorRepository.findById(bookDTO.getAuthorId()).get();
                Subject subject = subjectRepository.findById(bookDTO.getSubjectId()).get();
                String authorName = author.getName();
                String subjectName = subject.getName();
                String bookNumber = authorName.substring(0,2) + subjectName.substring(0,2) + author.getId();
                book.setBookNumber(bookNumber.toUpperCase());
            }
        } else {
            ;
        }
        book = bookRepository.save(book);
        return bookMapper.toDto(book);
    }

    @Override
    public List<BookDTO> findByAuthorId(Long authorId) {
        return bookRepository.findByAuthorId(authorId).stream()
                .map(bookMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<BookDTO> findBySubjectId(Long subjectId) {
        return bookRepository.findBySubjectId(subjectId).stream()
                .map(bookMapper::toDto).collect(Collectors.toList());
    }
    @Override
    public List<BookDTO> findByStatus(Boolean status) {
        log.debug("Request to get book  by status");
        return bookRepository.findAllByStatus(status)
            .stream()
            .map(bookMapper::toDto)
            .collect(Collectors.toList());
    }
    @Override
    public List<BookDTO> findAllBookBySubjectIdAndAuthorId(Long subjectId, Long authorId) {
        log.debug("Retrieving book item by subject and author");
        return bookRepository.findAllBookBySubjectIdAndAuthorId(subjectId, authorId)
            .stream()
            .map(bookMapper::toDto)
            .collect(Collectors.toList());

    }
    @Override
    @Transactional(readOnly = true)
    public Page<BookDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Books");
        return bookRepository.findAll(pageable)
            .map(bookMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookDTO> findAll( ) {
        log.debug("Request to get all Books");
        return bookRepository.findAll().stream()
                .map(bookMapper::toDto).collect(Collectors.toList());

    }


    @Override
    @Transactional(readOnly = true)
    public Optional<BookDTO> findOne(Long id) {
        log.debug("Request to get Book : {}", id);
        return bookRepository.findById(id)
            .map(bookMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Book : {}", id);
        bookRepository.deleteById(id);
    }

}
