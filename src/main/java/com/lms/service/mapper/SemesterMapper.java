package com.lms.service.mapper;


import com.lms.domain.*;
import com.lms.service.dto.SemesterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Semester} and its DTO {@link SemesterDTO}.
 */
@Mapper(componentModel = "spring", uses = {FacultyMapper.class})
public interface SemesterMapper extends EntityMapper<SemesterDTO, Semester> {

    @Mapping(source = "faculty.id", target = "facultyId")
    @Mapping(source = "faculty.name", target = "facultyName")

    SemesterDTO toDto(Semester semester);

    @Mapping(source = "facultyId", target = "faculty")
    Semester toEntity(SemesterDTO semesterDTO);

    default Semester fromId(Long id) {
        if (id == null) {
            return null;
        }
        Semester semester = new Semester();
        semester.setId(id);
        return semester;
    }
}
