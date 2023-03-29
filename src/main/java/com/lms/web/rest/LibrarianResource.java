package com.lms.web.rest;

import com.lms.domain.Librarian;
import com.lms.service.LibrarianService;
import com.lms.web.rest.errors.BadRequestAlertException;
import com.lms.service.dto.LibrarianDTO;

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
 * REST controller for managing {@link com.lms.domain.Librarian}.
 */
@RestController
@RequestMapping("/api")
public class LibrarianResource {

    private final Logger log = LoggerFactory.getLogger(LibrarianResource.class);

    private static final String ENTITY_NAME = "librarian";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LibrarianService librarianService;

    public LibrarianResource(LibrarianService librarianService) {
        this.librarianService = librarianService;
    }

    /**
     * {@code POST  /librarians} : Create a new librarian.
     *
     * @param librarianDTO the librarianDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new librarianDTO, or with status {@code 400 (Bad Request)} if the librarian has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/librarians")
    public ResponseEntity<LibrarianDTO> createLibrarian(@Valid @RequestBody LibrarianDTO librarianDTO) throws URISyntaxException {
        log.debug("REST request to save Librarian : {}", librarianDTO);
        if (librarianDTO.getId() != null) {
            throw new BadRequestAlertException("A new librarian cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LibrarianDTO result = librarianService.save(librarianDTO);
        return ResponseEntity.created(new URI("/api/librarians/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /librarians} : Updates an existing librarian.
     *
     * @param librarianDTO the librarianDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated librarianDTO,
     * or with status {@code 400 (Bad Request)} if the librarianDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the librarianDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/librarians")
    public ResponseEntity<LibrarianDTO> updateLibrarian(@Valid @RequestBody LibrarianDTO librarianDTO) throws URISyntaxException {
        log.debug("REST request to update Librarian : {}", librarianDTO);
        if (librarianDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LibrarianDTO result = librarianService.save(librarianDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, librarianDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /librarians} : get all the librarians.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of librarians in body.
     */
    @GetMapping("/librarians")
    public ResponseEntity<List<LibrarianDTO>> getAllLibrarians(Pageable pageable) {
        log.debug("REST request to get a page of Librarians");
        Page<LibrarianDTO> page = librarianService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }



    /**
     * {@code GET  /librarians/:id} : get the "id" librarian.
     *
     * @param id the id of the librarianDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the librarianDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/librarians/{id}")
    public ResponseEntity<LibrarianDTO> getLibrarian(@PathVariable Long id) {
        log.debug("REST request to get Librarian : {}", id);
        Optional<LibrarianDTO> librarianDTO = librarianService.findOne(id);
        return ResponseUtil.wrapOrNotFound(librarianDTO);
    }
    @GetMapping("/librarian/library/{libraryId}")
    public ResponseEntity<List<LibrarianDTO>> findByLibraryId(@PathVariable(value = "libraryId") String libraryId){
        log.debug("REST request to get VendorItem by status : {}");
        List<LibrarianDTO> librarianDTOS=librarianService.findByLibraryId(Long.parseLong(libraryId));
        return ResponseEntity.ok().body(librarianDTOS);
    }


    /**
     * {@code DELETE  /librarians/:id} : delete the "id" librarian.
     *
     * @param id the id of the librarianDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/librarians/{id}")
    public ResponseEntity<Void> deleteLibrarian(@PathVariable Long id) {
        log.debug("REST request to delete Librarian : {}", id);
        librarianService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
