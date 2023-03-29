package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DTO for the {@link com.lms.domain.Subject} entity.
 */
public class SubjectDTO extends BaseDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String subjectCode;

    private Set<FacultyDTO> faculties = new HashSet<>();
    
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

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public Set<FacultyDTO> getFaculties() {
        return faculties;
    }

    public void setFaculties(Set<FacultyDTO> faculties) {
        this.faculties = faculties;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubjectDTO)) {
            return false;
        }

        return id != null && id.equals(((SubjectDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubjectDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", subjectCode='" + getSubjectCode() + "'" +
            ", faculties='" + getFaculties() + "'" +
            "}";
    }
}
