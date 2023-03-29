package com.lms.domain;

import com.lms.service.dto.core.TracedEntity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Subject extends TracedEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "subject_code", nullable = false)
    private String subjectCode;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "subject_faculty",
               joinColumns = @JoinColumn(name = "subject_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "faculty_id", referencedColumnName = "id"))
    private Set<Faculty> faculties = new HashSet<>();

    @OneToMany(mappedBy = "subject")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Book> books = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public Subject subjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
        return this;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public Set<Faculty> getFaculties() {
        return faculties;
    }

    public Subject faculties(Set<Faculty> faculties) {
        this.faculties = faculties;
        return this;
    }

    public Subject addFaculty(Faculty faculty) {
        this.faculties.add(faculty);
        faculty.getSubjects().add(this);
        return this;
    }

    public Subject removeFaculty(Faculty faculty) {
        this.faculties.remove(faculty);
        faculty.getSubjects().remove(this);
        return this;
    }

    public void setFaculties(Set<Faculty> faculties) {
        this.faculties = faculties;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Subject books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Subject addBook(Book book) {
        this.books.add(book);
        book.setSubject(this);
        return this;
    }

    public Subject removeBook(Book book) {
        this.books.remove(book);
        book.setSubject(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", subjectCode='" + getSubjectCode() + "'" +
            "}";
    }
}
