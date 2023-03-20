package com.studentdb.student_db.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentdb.student_db.service.StudentService;
import com.studentdb.student_db.model.Student;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/")
public class StudentController {

	@Autowired
	private StudentService studentService;

    public LocalDate StringtoDate(String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }
	@GetMapping("/")
	public ResponseEntity<String> Home() {
		return new ResponseEntity<String>("Student API!", HttpStatus.OK);
	}

    @GetMapping("/getAllStudent")
	public ResponseEntity<List<Student>> getallStudent() {
		return new ResponseEntity<List<Student>>(studentService.allStudents(), HttpStatus.OK);
	}

    @GetMapping("/student/{id}")
	public ResponseEntity<Optional<Student>> getStudent(@PathVariable String id) {
        Optional<Student> student = studentService.getStudent(id);
        if (student.isPresent())
		    return new ResponseEntity<Optional<Student>>(student, HttpStatus.OK);
        return new ResponseEntity<Optional<Student>>(student, HttpStatus.BAD_REQUEST);
	}

    @PostMapping("/student/")
	public ResponseEntity<Optional<Student>> addStudent(@RequestBody Map<String, String> payload) {
        Student new_stud = new Student(
            payload.get("name"),
            StringtoDate(payload.get("date_of_birth")),
            payload.get("class"),
            payload.get("division"),
            payload.get("gender")
        );
		return new ResponseEntity<Optional<Student>>(studentService.addStudent(new_stud), HttpStatus.OK);
	}
}