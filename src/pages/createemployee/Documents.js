import React from "react";
import styles from "./Documents.module.css";
import { ReactComponent as Passphoto } from "../../assets/passphoto.svg";
import { ReactComponent as Cloud } from "../../assets/Background+Shadow.svg";
import { ReactComponent as Notebook } from "../../assets/notebook.svg";
import { ReactComponent as Delete } from "../../assets/delete svg.svg";
const AddEmployee = () => {
  return (
    <div className={styles.container}>
      <div className={styles.employeeHeader}>
        <h2>Add Employee</h2>
        <p>Add Candidates details for interview process</p>
      </div>

      <div className={styles.mainCard}>
        <div className={styles.cardHeader}>
          <h3>Document Uploads</h3>
          <p>
            Upload the required documents to complete the employee onboarding
            process. These are required for background verification and record
            keeping.
          </p>
        </div>

        <div className={styles.sectionDivider}></div>

        <div className={styles.cardGrid}>
          <div className={styles.leftSection}>
            <h4 className={styles.passphoto}>Passport-size Photo</h4>
            <div className={styles.photo}>
              <Passphoto />
              <div className={styles.phototext}>
                <p>
                  <span> Click to upload</span> or drag and drop
                </p>
                <p className={styles.lowertext}>SVG,PNG,JPG(max. 2MB)</p>
              </div>
            </div>

            <h4 className={styles.government}>Government ID Proof</h4>

            <div className={styles.field}>
              <label>ID Proof</label>
              <select name="designation">
                <option value="">Select Id proof</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="voter">Voter ID</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.photo}>
              <Cloud />
              <div className={styles.phototext}>
                <p>Click to upload or drag and drop</p>
                <p className={styles.lowertext}>PDF, JPG or PNG (max. 5MB)</p>
              </div>
            </div>

            <div className={styles.passport}>
              <Notebook />
              <div className={styles.frontback}>
                <p>Passport_front_back.pdf</p>
                <span>1.2 MB • Uploaded successfully</span>
              </div>
              <span className={styles.deleteIcon}>
                <Delete />
              </span>
            </div>
          </div>

          <div className={styles.documentscolumn}>
            <div className={styles.documents}>
              <h3>Documents</h3>
              <p>Upload ID proof, contracts, etc.</p>
            </div>

            <div className={styles.sectionDivider}></div>

            <div className={styles.photo2}>
              <Cloud />
              <div className={styles.phototext2}>
                <p>Click to upload or drag and drop</p>
                <p className={styles.lowertext}>PDF, JPG or PNG (max. 5MB)</p>
              </div>
            </div>

            <div className={styles.offerletter}>
              <Notebook />
              <div className={styles.letter}>
                <p>Offer_Letter.pdf</p>
                <span>2.4 MB • Uploading...</span>
              </div>
              <span className={styles.deleteIcon}>
                <Delete />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button type="button" className={styles.previous}>
          Previous
        </button>

        <button type="button" className={styles.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
