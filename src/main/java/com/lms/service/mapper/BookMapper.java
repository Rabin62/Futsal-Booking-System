package com.lms.service.mapper;


import com.lms.domain.*;
import com.lms.service.dto.BookDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Book} and its DTO {@link BookDTO}.
 */
@Mapper(componentModel = "spring", uses = {AuthorMapper.class, SubjectMapper.class})
public interface BookMapper extends EntityMapper<BookDTO, Book> {
    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "author.name", target = "authorName")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.name", target = "subjectName")
    BookDTO toDto(Book book);

    @Mapping(source = "authorId", target = "author")
    @Mapping(source = "subjectId", target = "subject")
    Book toEntity(BookDTO bookDTO);

    default Book fromId(Long id) {
        if (id == null) {
            return null;
        }
        Book book = new Book();
        book.setId(id);
        return book;
    }
}
