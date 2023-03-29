package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.lms.domain.BookLending} entity.
 */
public class BookLendingDTO extends BaseDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate reserveDate;

    @NotNull
    private LocalDate dueDate;

    private LocalDate returnedDate;

    private String note;


    private Long studentId;

    private Long bookId;

    private String studentName;

    private String bookName;


    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getReserveDate() {
        return reserveDate;
    }

    public void setReserveDate(LocalDate reserveDate) {
        this.reserveDate = reserveDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnedDate() {
        return returnedDate;
    }

    public void setReturnedDate(LocalDate returnedDate) {
        this.returnedDate = returnedDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookLendingDTO)) {
            return false;
        }

        return id != null && id.equals(((BookLendingDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookLendingDTO{" +
            "id=" + getId() +
            ", reserveDate='" + getReserveDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", returnedDate='" + getReturnedDate() + "'" +
            ", note='" + getNote() + "'" +
            ", studentId=" + getStudentId() +
                ", studentName='" + getStudentName() + "'" +
            ", bookId=" + getBookId() +
                ", bookName='" + getBookName() + "'" +
            "}";
    }
}
