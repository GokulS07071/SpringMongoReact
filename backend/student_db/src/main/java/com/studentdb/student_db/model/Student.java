package com.studentdb.student_db.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Document(collection = "Student")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
	@Id
	private ObjectId id;
	private String adminssionNumber;
	private String Name;
	private LocalDate Dateofbirth;
	private String Student_class;
	private String Division;
	private String Gender;
	public Student(String name, LocalDate dateofbirth, String student_class, String division, String gender) {
		Name = name;
		Dateofbirth = dateofbirth;
		Student_class = student_class;
		Division = division;
		Gender = gender;
	}
	
}