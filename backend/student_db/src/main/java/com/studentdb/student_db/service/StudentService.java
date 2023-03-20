package com.studentdb.student_db.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.studentdb.student_db.model.Student;
import com.studentdb.student_db.repository.StudentRepository;

@Service
public class StudentService {
    
    @Autowired
	private StudentRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Student> allStudents() {
        return repository.findAll(Sort.by(Order.by("Name")));
    }

    public Optional<Student> getStudent(String id) {
        return repository.findStudentByadminssionNumber(id);
    }

    public Optional<Student> addStudent(Student student) {
        Student a = repository.insert(student);
        String admissionID = String.format("R-%s",a.getId());
        mongoTemplate.update(Student.class)
        .matching(Criteria.where("id").is(a.getId()))
        .apply(new Update().set("adminssionNumber",admissionID))
        .first();
        
        return repository.findById(a.getId());
    }
}
