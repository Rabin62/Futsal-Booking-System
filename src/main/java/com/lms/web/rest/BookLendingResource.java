package com.lms.web.rest;

import com.lms.service.BookLendingService;
import com.lms.service.dto.LibrarianDTO;
import com.lms.web.rest.errors.BadRequestAlertException;
import com.lms.service.dto.BookLendingDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lms.domain.BookLending}.
 */
@RestController
@RequestMapping("/api")
public class BookLendingResource {

    private final Logger log = LoggerFactory.getLogger(BookLendingResource.class);

    private static final String ENTITY_NAME = "bookLending";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookLendingService bookLendingService;

    public BookLendingResource(BookLendingService bookLendingService) {
        this.bookLendingService = bookLendingService;
    }

    /**
     * {@code POST  /book-lendings} : Create a new bookLending.
     *
     * @param bookLendingDTO the bookLendingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bookLendingDTO, or with status {@code 400 (Bad Request)} if the bookLending has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/book-lendings")
    public ResponseEntity<BookLendingDTO> createBookLending(@Valid @RequestBody BookLendingDTO bookLendingDTO) throws URISyntaxException {
        log.debug("REST request to save BookLending : {}", bookLendingDTO);
        if (bookLendingDTO.getId() != null) {
            throw new BadRequestAlertException("A new bookLending cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookLendingDTO result = bookLendingService.save(bookLendingDTO);
        return ResponseEntity.created(new URI("/api/book-lendings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /book-lendings} : Updates an existing bookLending.
     *
     * @param bookLendingDTO the bookLendingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookLendingDTO,
     * or with status {@code 400 (Bad Request)} if the bookLendingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bookLendingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/book-lendings")
    public ResponseEntity<BookLendingDTO> updateBookLending(@Valid @RequestBody BookLendingDTO bookLendingDTO) throws URISyntaxException {
        log.debug("REST request to update BookLending : {}", bookLendingDTO);
        if (bookLendingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BookLendingDTO result = bookLendingService.save(bookLendingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bookLendingDTO.getId().toString()))
            .body(result);
    }
    @PutMapping("/book-lendings/return")
    public ResponseEntity<BookLendingDTO> returnBookLending( @RequestBody BookLendingDTO bookLendingDTO) {
        log.debug("REST request to get BookLending : {}", bookLendingDTO);
        BookLendingDTO result = bookLendingService.returnBookLending(bookLendingDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * {@code GET  /book-lendings} : get all the bookLendings.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bookLendings in body.
     */
    @GetMapping("/book-lendings")
    public ResponseEntity<List<BookLendingDTO>> getAllBookLendings(Pageable pageable) {
        log.debug("REST request to get a page of BookLendings");
        Page<BookLendingDTO> page = bookLendingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /book-lendings/:id} : get the "id" bookLending.
     *
     * @param id the id of the bookLendingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookLendingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/book-lendings/{id}")
    public ResponseEntity<BookLendingDTO> getBookLending(@PathVariable Long id) {
        log.debug("REST request to get BookLending : {}", id);
        Optional<BookLendingDTO> bookLendingDTO = bookLendingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bookLendingDTO);
    }

    @GetMapping("/book-lendings/book/{bookId}")
    public ResponseEntity<List<BookLendingDTO>> findByBookId(@PathVariable(value = "bookId") String bookId){
        log.debug("REST request to get Book by status : {}");
        List<BookLendingDTO> bookLendingDTOS=bookLendingService.findByBookId(Long.parseLong(bookId));
        return ResponseEntity.ok().body(bookLendingDTOS);
    }

    @GetMapping("/book-lendings/student/{studentId}")
    public ResponseEntity<List<BookLendingDTO>> findByStudentId(@PathVariable(value = "studentId") String studentId){
        log.debug("REST request to get Student by status : {}");
        List<BookLendingDTO> bookLendingDTOS=bookLendingService.findByStudentId(Long.parseLong(studentId));
        return ResponseEntity.ok().body(bookLendingDTOS);
    }

    /**
     * {@code DELETE  /book-lendings/:id} : delete the "id" bookLending.
     *
     * @param id the id of the bookLendingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/book-lendings/{id}")
    public ResponseEntity<Void> deleteBookLending(@PathVariable Long id) {
        log.debug("REST request to delete BookLending : {}", id);
        bookLendingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
