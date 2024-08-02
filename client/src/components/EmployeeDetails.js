import React, { useEffect, useRef, useState } from "react";

function EmployeeDetails() {
  let [employeDetails, setEmployeDetails] = useState([]);
  let [countriesList, setCountriesList] = useState([]);
  let [departmentsList, setDepartmetsList] = useState([]);
  let [gendersList, setGendersList] = useState([]);
  useEffect(() => {
    getCountriesListFromDB();
    getDepartmentsListFromDB();
    getgendersListFromDB();
  }, []);
  let countryRef = useRef();
  let genderRef = useRef();
  let departmentRef = useRef();
  let orderRef=useRef();
  let getCountriesListFromDB = async () => {
    let reqOptions = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost:2387/countriesList",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setCountriesList(JSOData);
    console.log(JSOData);
  };
  let getDepartmentsListFromDB = async () => {
    let reqOptions = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost:2387/departmentsList",
      reqOptions
    );
    let JSOData = await JSONData.json();
    console.log(JSOData);
    setDepartmetsList(JSOData);
  };
  let getgendersListFromDB = async () => {
    let reqOptions = {
      method: "GET",
    };
    let JSONData = await fetch("http://localhost:2387/gendersList", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    setGendersList(JSOData);
  };

  let GetEmployeDetailsFromDB = async () => {
    let reqOptions = {
      method: "GET",
    };

    let url = `http://localhost:2387/employedetails?country=${countryRef.current.value}&gender=${genderRef.current.value}&department=${departmentRef.current.value}`;
    let JSONData = await fetch(
      url,
      reqOptions
    );
    let JSOData = await JSONData.json();
    setEmployeDetails(JSOData);
    console.log(url);
  };

  return (
    <div>
      <form>
        <div>
          <label>country</label>
          <select ref={countryRef}>
            {countriesList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select ref={genderRef}>
            {gendersList.map((ele, i) => {
              return <option key={i}> {ele} </option>;
            })}
          </select>
        </div>
        <div>
          <label>Department</label>
          <select ref={departmentRef}>
            {departmentsList.map((ele, i) => {
              return <option>{ele}</option>;
            })}
          </select>
        </div>
        {/* <div>
          <label>Sort</label>
          <select ref={orderRef}>
            <option>desc</option>
            <option>asc</option>
          </select>
        </div> */}
        <button
          type="button"
          onClick={() => {
            GetEmployeDetailsFromDB();
          }}
        >
          Get Data
        </button>
      </form>

      <div>
        <thead>
          <th>S.no</th>
          <th>id</th>
          <th>Image</th>
          <th>Gender</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Department</th>
          <th>Car</th>
          <th>Country</th>
        </thead>
        <tbody>
          {employeDetails.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.id}</td>
                <td>
                  <img src={ele.image}></img>
                </td>
                <td>{ele.gender}</td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>{ele.email}</td>
                <td>{ele.department}</td>
                <td>{ele.cars}</td>
                <td>{ele.country}</td>
              </tr>
            );
          })}
        </tbody>
      </div>
    </div>
  );
}

export default EmployeeDetails;
