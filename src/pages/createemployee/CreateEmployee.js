import React from "react";
import styles from "./CreateEmployee.module.css";
import { useAtom } from "jotai";
import { employeeAtom } from "../../atoms/employeeAtom";
import { useCreateEmployee } from "../../hooks/employee/addemployeehook";
import { ReactComponent as UploadIcon } from "../../assets/image.svg";

const defaultEmployee = {
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  emergencyContactNo: "",
  email: "",
  dateOfBirth: "",
  country: "",
  House: "",
  societyName: "",
  street: "",
  landmark: "",
  City: "",
  postalCode: "",
  state: "",
};

const CreateEmployee = () => {
  const [employee, setEmployee] = useAtom(employeeAtom);
  const { mutate, isPending } = useCreateEmployee();

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

      <div className={styles.stepperContainer}>
        <div className={styles.stepper}>
          <div className={`${styles.step} ${styles.active}`}>
            <div className={styles.line}></div>
            <div className={styles.labelGroup}>
              <span className={styles.number}>1</span>
              <p className={styles.text}>Personal Info</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.line}></div>
            <div className={styles.labelGroup}>
              <span className={styles.number}>2</span>
              <p className={styles.text}>Employee Details</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.line}></div>
            <div className={styles.labelGroup}>
              <span className={styles.number}>3</span>
              <p className={styles.text}>Documents</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainCard}>
        <div className={styles.cardHeader}>
          <h3>Personal Details</h3>
          <p>Basic information about the employee.</p>
        </div>
        <div className={styles.sectionDivider}></div>

        <div className={styles.profileUploadWrapper}>
          <div className={styles.imagePlaceholder}>
            <UploadIcon className={styles.icon} />
          </div>
          <div className={styles.uploadInfo}>
            <p>Please upload square image, size less than 100KB</p>
            <div className={styles.uploadActions}>
              <label htmlFor="fileInput" className={styles.fileBtn}>
                Choose File &rarr;
              </label>
              <input type="file" id="fileInput" style={{ display: "none" }} />
              <span>No File Chosen</span>
            </div>
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>First Name</label>
            <input
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              placeholder="e.g John"
            />
          </div>
          <div className={styles.field}>
            <label>Last Name</label>
            <input
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              placeholder="e.g Doe"
            />
          </div>
          <div className={styles.field}>
            <label>Email Address</label>
            <input
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="john.doe@niyamra.com"
            />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleChange}
              placeholder="+91 00000-00000"
            />
          </div>
          <div className={styles.field}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={employee.dateOfBirth}
              onChange={handleChange}
              className={styles.dob}
            />
          </div>
          <div className={styles.field}>
            <label>Select Gender</label>
            <select
              name="gender"
              value={employee.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Emergency Contact No.</label>
            <input
              name="emergencyContactNo"
              value={employee.emergencyContactNo}
              onChange={handleChange}
              placeholder="Enter Emergency Contact No."
            />
          </div>
        </div>

        <div className={styles.cardHeader}>
          <h3>Current Residential Address</h3>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>Country</label>
            <select
              name="country"
              value={employee.country}
              onChange={handleChange}
            >
              <option value="">Select country</option>
              <option value="India">India</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>House</label>
            <input
              name="House"
              value={employee.House}
              onChange={handleChange}
              placeholder="House/Flat No."
            />
          </div>
          <div className={styles.field}>
            <label>Society Name</label>
            <input
              name="societyName"
              value={employee.societyName}
              onChange={handleChange}
              placeholder="Society/Apartment"
            />
          </div>
          <div className={styles.field}>
            <label>Street</label>
            <input
              name="street"
              value={employee.street}
              onChange={handleChange}
              placeholder="Street/Lane"
            />
          </div>
          <div className={styles.field}>
            <label>Landmark (optional)</label>
            <input
              name="landmark"
              value={employee.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark"
            />
          </div>
          <div className={styles.field}>
            <label>City</label>
            <input
              name="City"
              value={employee.City}
              onChange={handleChange}
              placeholder="City Name"
            />
          </div>
          <div className={styles.field}>
            <label>State</label>
            <input
              name="state"
              value={employee.state}
              onChange={handleChange}
              placeholder="State Name"
            />
          </div>
          <div className={styles.field}>
            <label>Postal Code</label>
            <input
              name="postalCode"
              value={employee.postalCode}
              onChange={handleChange}
              placeholder="Pincode"
            />
          </div>
        </div>

        <div className={styles.addressFooter}>
          <span>Permanent address is same as current address</span>
          <div className={styles.toggleSwitch}>
            No <div className={styles.toggle}></div> Yes
          </div>
        </div>

        <div className={styles.cardHeader}>
          <h3>Permanent Address</h3>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>House/Flat/Apartment No.</label>
            <input
              name="country"
              value={employee.country}
              onChange={handleChange}
              placeholder="Apt 504"
            />
          </div>
          <div className={styles.field}>
            <label>Building/Society Name</label>
            <input
              name="House"
              value={employee.House}
              onChange={handleChange}
              placeholder="Sunset Heights Apartments"
            />
          </div>
          <div className={styles.field}>
            <label>Street/Area/Locality</label>
            <input
              name="societyName"
              value={employee.societyName}
              onChange={handleChange}
              placeholder="1234 Sunset Boulevard"
            />
          </div>
          <div className={styles.field}>
            <label>Landmark (optional)</label>
            <input
              name="landmark"
              value={employee.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark"
            />
          </div>
          <div className={styles.field}>
            <label>City</label>
            <input
              name="city"
              value={employee.landmark}
              onChange={handleChange}
              placeholder="e.g Los Angeles"
            />
          </div>
          <div className={styles.field}>
            <label>State/province</label>
            <input
              name="state"
              value={employee.state}
              onChange={handleChange}
              placeholder="california"
            />
          </div>
          <div className={styles.field}>
            <label>Postal code</label>
            <input
              name="postalCode"
              value={employee.state}
              onChange={handleChange}
              placeholder="e.g 90028"
            />
          </div>
          <div className={styles.field}>
            <label>Country</label>
            <input
              name="country"
              value={employee.country}
              onChange={handleChange}
              placeholder="United States"
            />
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

export default CreateEmployee;
