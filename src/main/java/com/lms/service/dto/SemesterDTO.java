package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.lms.domain.Semester} entity.
 */
public class SemesterDTO extends BaseDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;


    private Long facultyId;

    private String facultyName;


    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
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

    public Long getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(Long facultyId) {
        this.facultyId = facultyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SemesterDTO)) {
            return false;
        }

        return id != null && id.equals(((SemesterDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SemesterDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", facultyId=" + getFacultyId() +
            "}";
    }
}
