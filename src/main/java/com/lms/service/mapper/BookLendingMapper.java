package com.lms.service.mapper;


import com.lms.domain.*;
import com.lms.service.dto.BookLendingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link BookLending} and its DTO {@link BookLendingDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, BookMapper.class})
public interface BookLendingMapper extends EntityMapper<BookLendingDTO, BookLending> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "book.id", target = "bookId")
    @Mapping(source = "student.name", target = "studentName")
    @Mapping(source = "book.name", target = "bookName")
    BookLendingDTO toDto(BookLending bookLending);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "bookId", target = "book")
    BookLending toEntity(BookLendingDTO bookLendingDTO);

    default BookLending fromId(Long id) {
        if (id == null) {
            return null;
        }
        BookLending bookLending = new BookLending();
        bookLending.setId(id);
        return bookLending;
    }
}
