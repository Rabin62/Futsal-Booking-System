package com.lms.service.dto.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class BaseDTO {

    private Long insertedById;

    private String insertedByLogin;

    private String description;

    private Long updatedById;

    private String updatedByLogin;

    private Boolean status;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime createdDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime updatedDate;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getInsertedById() {
        return insertedById;
    }

    public void setInsertedById(Long insertedById) {
        this.insertedById = insertedById;
    }

    public String getInsertedByLogin() {
        return insertedByLogin;
    }

    public void setInsertedByLogin(String insertedByLogin) {
        this.insertedByLogin = insertedByLogin;
    }

    public Long getUpdatedById() {
        return updatedById;
    }

    public void setUpdatedById(Long updatedById) {
        this.updatedById = updatedById;
    }

    public String getUpdatedByLogin() {
        return updatedByLogin;
    }

    public void setUpdatedByLogin(String updatedByLogin) {
        this.updatedByLogin = updatedByLogin;
    }

    public LocalDateTime getInsertedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime insertedDate) {
        this.createdDate = insertedDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
