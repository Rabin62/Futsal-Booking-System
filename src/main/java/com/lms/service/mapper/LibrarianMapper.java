package com.lms.service.mapper;


import com.lms.domain.*;
import com.lms.service.dto.LibrarianDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Librarian} and its DTO {@link LibrarianDTO}.
 */
@Mapper(componentModel = "spring", uses = {LibraryMapper.class})
public interface LibrarianMapper extends EntityMapper<LibrarianDTO, Librarian> {

    @Mapping(source = "library.id", target = "libraryId")
    @Mapping(source = "library.name", target = "libraryName")

    LibrarianDTO toDto(Librarian librarian);

    @Mapping(source = "libraryId", target = "library")
    Librarian toEntity(LibrarianDTO librarianDTO);

    default Librarian fromId(Long id) {
        if (id == null) {
            return null;
        }
        Librarian librarian = new Librarian();
        librarian.setId(id);
        return librarian;
    }
}
