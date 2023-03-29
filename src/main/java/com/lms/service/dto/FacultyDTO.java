package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DTO for the {@link com.lms.domain.Faculty} entity.
 */
public class FacultyDTO extends BaseDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    private Set<SubjectDTO> subjects = new HashSet<>();
    
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

    public Set<SubjectDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<SubjectDTO> subjects) {
        this.subjects = subjects;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FacultyDTO)) {
            return false;
        }

        return id != null && id.equals(((FacultyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FacultyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", subjects='" + getSubjects() + "'" +
            "}";
    }
}
