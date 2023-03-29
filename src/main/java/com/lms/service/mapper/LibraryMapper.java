package com.lms.service.mapper;


import com.lms.domain.*;
import com.lms.service.dto.LibraryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Library} and its DTO {@link LibraryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LibraryMapper extends EntityMapper<LibraryDTO, Library> {


    @Mapping(target = "librarians", ignore = true)
    @Mapping(target = "removeLibrarian", ignore = true)
    Library toEntity(LibraryDTO libraryDTO);

    default Library fromId(Long id) {
        if (id == null) {
            return null;
        }
        Library library = new Library();
        library.setId(id);
        return library;
    }
}
