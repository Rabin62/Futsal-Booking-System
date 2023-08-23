package com.lms.service.dto;

import com.lms.service.dto.core.BaseDTO;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.lms.domain.Author} entity.
 */
public class AuthorDTO {
    private Long id;
    private String name;
    private MultipartFile image;

    // Constructors, getters, and setters

    public AuthorDTO() {
    }

    public AuthorDTO(String name, MultipartFile image) {
        this.name = name;
        this.image = image;
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

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
