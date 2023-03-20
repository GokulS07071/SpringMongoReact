package com.studentdb.student_db.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.studentdb.student_db.model.Student;

@Repository
public interface StudentRepository extends MongoRepository<Student, ObjectId>{
    Optional<Student> findStudentByadminssionNumber(String id);

}