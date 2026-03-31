import { atom } from "jotai";

export const employeeAtom = atom({
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  email: "",
  dateOfBirth: "",
  employeeId: "",
  joiningDate: "",
  department: "",
  designation: "",
  reportingManager: "",
  employmentType: "Full-Time",
  documents: []
});