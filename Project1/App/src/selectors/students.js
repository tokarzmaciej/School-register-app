import { createSelector } from 'reselect';

const getStudentsSelector = state => state.students;

export const averageFromSubject = createSelector(
    getStudentsSelector,
    students => students
        .map(student =>
        ({
            id: student['_id'],
            subjects: student.subjects
                .map(subject =>
                ({
                    average: subject.marks.length !== 0 ?
                        subject.marks
                            .reduce((total, amount) => {
                                return total + amount.grade
                            }, 0) / subject.marks.length : 0,
                    name: subject.name
                }))
        }))
        .map(student => ({
            ...student,
            average: student.subjects.length !== 0 ?
                student.subjects.reduce((total, amount) => {
                    return total + amount.average
                }, 0) / student.subjects.length : 0
        }))
);

export const sortByname = (students, value) => {
    return students.filter(student => {
        const name = student.name
        const surname = student.surname
        const nameAndSurname = name + " " + surname
        return name.toUpperCase().startsWith(value.toUpperCase()) ||
            surname.toUpperCase().startsWith(value.toUpperCase()) ||
            nameAndSurname.toUpperCase().startsWith(value.toUpperCase())
    })
};