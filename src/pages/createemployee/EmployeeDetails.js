import React from "react";
import styles from "./EmployeeDetails.module.css";
import { useAtom } from "jotai";
import { employeeAtom } from "../../atoms/employeeAtom";
import { useCreateEmployee } from "../../hooks/employee/addemployeehook";
import { ReactComponent as PlusIcon } from "../../assets/plus svg.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete svg.svg";

const defaultEmployee = {
  jobDesignation: "",
  department: "",
  employmentType: "",
  employmentId: "",
  workModel: "",
  email: "",
  dateOfJoining: "",
  reportingManager: "",
  annual: "",
  probationPeriod: "",
  companyName: "",
  designation: "",
  dateOfJoin: "",
  dateOfEnd: "",
  salary: "",
  experience: "",
};

const AddEmployee = () => {
  const [employee, setEmployee] = useAtom(employeeAtom);
  const { mutate, isPending } = useCreateEmployee();

  const handleDelete = () => {
    setEmployee((prev) => ({
      ...prev,
      companyName: "",
      designation: "",
      dateOfJoin: "",
      dateOfEnd: "",
      salary: "",
      experience: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    mutate(employee, {
      onSuccess: () => {
        alert("Employee Created Successfully");
        setEmployee(defaultEmployee);
      },
      onError: (error) => alert(error?.message || "Something went wrong"),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.employeeHeader}>
        <h2>Add Employee</h2>
        <p>Add candidate details for interview process</p>
      </div>

      <div className={styles.mainCard}>
        <div className={styles.cardHeader}>
          <h3>Employment Details</h3>
          <p>
            Define the employee's role, department, reporting structure, and
            compensation package.
          </p>
        </div>

        <div className={styles.sectionDivider}></div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>Job Designation</label>
            <select
              name="jobDesignation"
              value={employee.jobDesignation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Department</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Employment Type</label>
            <select
              name="employmentType"
              value={employee.employmentType}
              onChange={handleChange}
            >
              <option value="">Select Employee Type</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Employment ID</label>
            <input
              name="employmentId"
              value={employee.employmentId}
              onChange={handleChange}
              placeholder="Enter Employment ID"
            />
          </div>

          <div className={styles.field}>
            <label>Work Model</label>
            <select
              name="workModel"
              value={employee.workModel}
              onChange={handleChange}
            >
              <option value="">Select Work Model</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={handleChange}
              className={styles.dob}
            />
          </div>

          <div className={styles.field}>
            <label>Reporting Manager(Team Lead)</label>
            <select
              name="reportingManager"
              value={employee.reportingManager}
              onChange={handleChange}
            >
              <option value="">Select Reporting Manager(Team Lead)</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Annual CTC</label>
            <input
              name="annual"
              value={employee.annual}
              onChange={handleChange}
              placeholder="Enter Annual CTC"
            />
          </div>

          <div className={styles.field}>
            <label>Probation Period</label>
            <select
              name="probationPeriod"
              value={employee.probationPeriod}
              onChange={handleChange}
            >
              <option value="">Select Probation Period</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <h3>Experience Details</h3>
        <div className={styles.sectionDivider}></div>

        <div className={styles.addressFooter}>
          <span>Is the candidate experienced</span>
          <div className={styles.toggleSwitch}>
            No <div className={styles.toggle}></div> Yes
          </div>
        </div>

        <div className={styles.cardHeader}>
          <h3>Company Details</h3>
          <button className={styles.addButton}>
            <PlusIcon />
            Add Company
          </button>
        </div>

        <div className={styles.border}>
          <div className={styles.companyContent}>
            <h4>Company</h4>
            <DeleteIcon
              role="button"
              aria-label="Delete Company"
              tabIndex={0}
              onClick={handleDelete}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleDelete();
              }}
              className={styles.deleteIcon}
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Company Name</label>
              <input
                name="companyName"
                value={employee.companyName}
                onChange={handleChange}
                placeholder="Enter Company Name"
              />
            </div>

            <div className={styles.field}>
              <label>Designation</label>
              <select
                name="designation"
                value={employee.designation}
                onChange={handleChange}
              >
                <option value="">e.g Senior Product Designer</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>From</label>
              <input
                type="date"
                name="dateOfJoin"
                value={employee.dateOfJoin}
                onChange={handleChange}
                className={styles.dob}
              />
            </div>

            <div className={styles.field}>
              <label>To</label>
              <input
                type="date"
                name="dateOfEnd"
                value={employee.dateOfEnd}
                onChange={handleChange}
                className={styles.dob}
              />
            </div>

            <div className={styles.field}>
              <label>Salary</label>
              <input
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
              />
            </div>

            <div className={styles.field}>
              <label>Experience</label>
              <input
                name="experience"
                value={employee.experience}
                onChange={handleChange}
                placeholder="Enter Experience"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button
          className={styles.previous}
          onClick={() => setEmployee(defaultEmployee)}
        >
          Previous
        </button>
        <button
          className={styles.next}
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
