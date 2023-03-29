package com.lms.web.rest;

import com.lms.domain.Book;
import com.lms.service.BookService;
import com.lms.web.rest.errors.BadRequestAlertException;
import com.lms.service.dto.BookDTO;

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
 * REST controller for managing {@link com.lms.domain.Book}.
 */
@RestController
@RequestMapping("/api")
public class BookResource {

    private final Logger log = LoggerFactory.getLogger(BookResource.class);

    private static final String ENTITY_NAME = "book";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookService bookService;

    public BookResource(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * {@code POST  /books} : Create a new book.
     *
     * @param bookDTO the bookDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bookDTO, or with status {@code 400 (Bad Request)} if the book has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/books")
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) throws URISyntaxException {
        log.debug("REST request to save Book : {}", bookDTO);
        if (bookDTO.getId() != null) {
            throw new BadRequestAlertException("A new book cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookDTO result = bookService.save(bookDTO);
        return ResponseEntity.created(new URI("/api/books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /books} : Updates an existing book.
     *
     * @param bookDTO the bookDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookDTO,
     * or with status {@code 400 (Bad Request)} if the bookDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bookDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/books")
    public ResponseEntity<BookDTO> updateBook(@Valid @RequestBody BookDTO bookDTO) throws URISyntaxException {
        log.debug("REST request to update Book : {}", bookDTO);
        if (bookDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BookDTO result = bookService.save(bookDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bookDTO.getId().toString()))
            .body(result);
    }
    @GetMapping("/book/author/{authorId}")
    public ResponseEntity<List<BookDTO>> findByAuthorId(@PathVariable(value = "authorId") String authorId){
        log.debug("REST request to get VendorItem by status : {}");
        List<BookDTO> bookDTOS=bookService.findByAuthorId(Long.parseLong(authorId));
        return ResponseEntity.ok().body(bookDTOS);
    }
    @GetMapping("/book/subject/{subjectId}")
    public ResponseEntity<List<BookDTO>> findBySubjectId(@PathVariable(value = "subjectId") String subjectId){
        log.debug("REST request to get VendorItem by status : {}");
        List<BookDTO> bookDTOS=bookService.findBySubjectId(Long.parseLong(subjectId));
        return ResponseEntity.ok().body(bookDTOS);
    }
   /* @GetMapping("/sub-categories/category/{categoryId}")
    public ResponseEntity<List<SubCategoryDTO>> findBySubCategoryId(@PathVariable(value = "categoryId") String categoryId){
        log.debug("REST request to get VendorItem by status : {}");
        List<SubCategoryDTO> subCategoryDTOS=subCategoryService.findByCategoryId(Long.parseLong(categoryId));
        return ResponseEntity.ok().body(subCategoryDTOS);
    }
*/
    /**
     * {@code GET  /books} : get all the books.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of books in body.
     */
    @GetMapping("/books")
    public ResponseEntity<List<BookDTO>> getAllBooks(Pageable pageable) {
        log.debug("REST request to get a page of Books");
        Page<BookDTO> page = bookService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/all-books")
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        log.debug("REST request to get a page of Books");
        List<BookDTO> list = bookService.findAll();
        return ResponseEntity.ok().body(list);
    }
    @GetMapping("/books/status")
    public ResponseEntity<List<BookDTO>> findByStatus(@RequestParam Boolean status){
        log.debug("REST request to get VendorItem by status : {}");
        List<BookDTO> page = bookService.findByStatus(status);
        return ResponseEntity.ok().body(page);
    }
    @GetMapping("/book/{subjectId}/{authorId}")
    public ResponseEntity<List<BookDTO>> findAllBookBySubjectIdAndAuthorId
        (@PathVariable Long subjectId, @PathVariable Long authorId) {
        log.debug("REST request to get book : {}",subjectId);
        List<BookDTO> bookDTOS = bookService.findAllBookBySubjectIdAndAuthorId(subjectId, authorId);
        return new ResponseEntity<>(bookDTOS, HttpStatus.OK);
    }
    /**
     * {@code GET  /books/:id} : get the "id" book.
     *
     * @param id the id of the bookDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/books/{id}")
    public ResponseEntity<BookDTO> getBook(@PathVariable Long id) {
        log.debug("REST request to get Book : {}", id);
        Optional<BookDTO> bookDTO = bookService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bookDTO);
    }

    /**
     * {@code DELETE  /books/:id} : delete the "id" book.
     *
     * @param id the id of the bookDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        log.debug("REST request to delete Book : {}", id);
        bookService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
