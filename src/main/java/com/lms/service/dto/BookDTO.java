package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.lms.domain.Book} entity.
 */
public class BookDTO extends BaseDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String publication;

    private String isbn;

    private String edition;

    private String bookNumber;


    private Boolean isAssigned;

    private Integer quantity;

    private Long authorId;

    private String authorName;

    public Boolean getAssigned() {
        return isAssigned;
    }

    public void setAssigned(Boolean assigned) {
        isAssigned = assigned;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    private String subjectName;

    private Long subjectId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getBookNumber() {
        return bookNumber;
    }

    public void setBookNumber(String bookNumber) {
        this.bookNumber = bookNumber;
    }


    public Boolean isIsAssigned() {
        return isAssigned;
    }

    public void setIsAssigned(Boolean isAssigned) {
        this.isAssigned = isAssigned;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }


    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookDTO)) {
            return false;
        }

        return id != null && id.equals(((BookDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", publication='" + getPublication() + "'" +
            ", isbn=" + getIsbn() +
            ", edition='" + getEdition() + "'" +
            ", isAssigned='" + isIsAssigned() + "'" +
            ", authorId=" + getAuthorId() +
                ", authorName='" + getAuthorName() + "'" +
                ", subjectId=" + getSubjectId() +
                ", subjectName='" + getSubjectName() + "'" +

                "}";
    }
}
