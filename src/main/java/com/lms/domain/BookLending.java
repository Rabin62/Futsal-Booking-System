package com.lms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lms.service.dto.core.TracedEntity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A BookLending.
 */
@Entity
@Table(name = "book_lending")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BookLending extends TracedEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "reserve_date", nullable = false)
    private LocalDate reserveDate;

    @NotNull
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;


    @Column(name = "returned_date")
    private LocalDate returnedDate;



    @Column(name = "note")
    private String note;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "bookLendings", allowSetters = true)
    private Student student;


    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "bookLendings", allowSetters = true)
    private Book book;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getReserveDate() {
        return reserveDate;
    }

    public BookLending reserveDate(LocalDate reserveDate) {
        this.reserveDate = reserveDate;
        return this;
    }

    public void setReserveDate(LocalDate reserveDate) {
        this.reserveDate = reserveDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public BookLending dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getNote() {
        return note;
    }
    public BookLending note(String note) {
        this.note = note;
        return this;
    }
    public void setNote(String note) {
        this.note = note;
    }

    public Student getStudent() {
        return student;
    }

    public BookLending student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Book getBook() {
        return book;
    }

    public BookLending book(Book book) {
        this.book = book;
        return this;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public LocalDate getReturnedDate() {
        return returnedDate;
    }


    public void setReturnedDate(LocalDate returnedDate) {
        this.returnedDate = returnedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookLending)) {
            return false;
        }
        return id != null && id.equals(((BookLending) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookLending{" +
            "id=" + getId() +
            ", reserveDate='" + getReserveDate() + "'" +
            ", returnedDate='" + getReturnedDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
