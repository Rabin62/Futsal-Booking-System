package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.lms.domain.Author} entity.
 */
public class AuthorDTO extends BaseDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String Name;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuthorDTO)) {
            return false;
        }

        return id != null && id.equals(((AuthorDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuthorDTO{" +
            "id=" + getId() +
            ", Name='" + getName() + "'" +
            "}";
    }
}
