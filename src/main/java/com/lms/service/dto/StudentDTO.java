package com.lms.service.dto;

import com.lms.domain.BookLending;
import com.lms.service.dto.core.BaseDTO;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO for the {@link com.lms.domain.Student} entity.
 */
public class StudentDTO extends BaseDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private String contactNo;

    @NotNull
    private String email;

    private Long semesterId;

    private String semesterName;

    private Set<BookLendingDTO> bookLendings;

    public String getSemesterName() {
        return semesterName;
    }

    public void setSemesterName(String semesterName) {
        this.semesterName = semesterName;
    }

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }

    public Set<BookLendingDTO> getBookLendings() {
        return bookLendings;
    }

    public void setBookLendings(Set<BookLendingDTO> bookLendings) {
        this.bookLendings = bookLendings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentDTO)) {
            return false;
        }

        return id != null && id.equals(((StudentDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", contactNo='" + getContactNo() + "'" +
            ", email='" + getEmail() + "'" +
            ", semesterId=" + getSemesterId() +
            "}";
    }
}
