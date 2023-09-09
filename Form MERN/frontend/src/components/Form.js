import React, { useState, useRef, useEffect } from "react";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Form() {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [focus, setFocus] = useState(false);
  const [gender, setGender] = useState("");
  const [filteredGenders, setFilteredGenders] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);

  const [userData, setUserData] = useState([
    {
      country: "",
      region: "",
      city: "",
      street: "",
      zip: "",
      isoCode: "N/A",
    },
  ]);

  // Ref for input element
  const inputRef = useRef(null);

  // Functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();

      const sanitizedInput = inputValue.trim();
      if (sanitizedInput !== "") {
        if (!phoneNumbers.includes(sanitizedInput)) {
          setPhoneNumbers([...phoneNumbers, sanitizedInput]);
          setInputValue("");
        } else {
          alert("This phone number is already added.");
        }
      }
    }
  };

  const handleRemovePhoneNumber = (phoneNumberToRemove) => {
    const newPhoneNumbers = phoneNumbers.filter(
      (phoneNumber) => phoneNumber !== phoneNumberToRemove
    );
    setPhoneNumbers(newPhoneNumbers);
  };

  const addAddress = () => {
    setUserData([
      ...userData,
      { country: "", region: "", city: "", street: "", zip: "" },
    ]);
  };

  const removeAddress = (indexToRemove) => {
    if (indexToRemove !== 0) {
      setUserData((prevData) =>
        prevData.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);

    const filtered = genderList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredGenders(filtered);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleSuggestionClick = (selectedGender) => {
    setGender(selectedGender);
    inputRef.current.value = selectedGender;
    setInputValue(selectedGender);
    setInputFocused(false);
  };

  const genderList = ["Male", "Female", "Other"];

  const handleCountryChange = (val, index) => {
    const updatedUserData = [...userData];
    updatedUserData[index].country = val;

    // Find the ISO code for the selected country
    const countryData = CountryRegionData.find((country) => country[0] === val);
    if (countryData) {
      updatedUserData[index].isoCode = countryData[1]; // Set the ISO code
    } else {
      updatedUserData[index].isoCode = "N/A"; // Country not found, set to "N/A"
    }

    setUserData(updatedUserData);
  };

  const postData = async (event) => {
    event.preventDefault();

    const companyEmail = `${username}@company.com`;

    try {
       await axios.post(
        "http://localhost:8000/api/users/register",
        {
          username: username,
          password: password,
          about: about,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          email: email,
          companyEmail: companyEmail,
          phoneNumbers: phoneNumbers,
          userData: userData,
        }
      );
      console.log("done");
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////////////////////////////////////////////////

  const [isValidZip, setIsValidZip] = useState(false);

  const checkZipValidity = async (zipValue) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/zipChecker",
        {
          zip: zipValue,
        }
      );
      console.log(response);
      setIsValidZip(true);
    } catch (error) {
      console.error(error);
      setIsValidZip(false);
    }
  };

  useEffect(() => {
    // Check if userData has changed
    if (userData.length > 0) {
      // Get the index of the last added unit
      const lastIndex = userData.length - 1;
      const lastUnit = userData[lastIndex];

      // Check the zip value and make the API call if it's not empty
      if (lastUnit.zip) {
        checkZipValidity(lastUnit.zip);
      }
    }
  }, [userData]);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                username<span className="text-red-600">*</span>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    workcation.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email address<span className="text-red-600">*</span>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 flex items-center">
                <div className="py-2" data-show={showPassword}>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "password" : "text"}
                      className="w-full max-w-md pr-10 block shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <svg
                        className={`h-5 text-gray-700 ${
                          showPassword ? "block" : "hidden"
                        }`}
                        onClick={togglePasswordVisibility}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        />
                      </svg>
                      <svg
                        className={`h-5 text-gray-700 ${
                          showPassword ? "hidden" : "block"
                        }`}
                        onClick={togglePasswordVisibility}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07a32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                First name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Last name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Gender input field with immediate suggestions */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Gender
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  autoComplete="off"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  value={gender}
                  onChange={(e) => handleGenderChange(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  ref={inputRef} // Reference to the input element
                />
                {isInputFocused && (
                  <ul className="absolute z-10 mt-2 py-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredGenders.map((item) => (
                      <li
                        key={item}
                        className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={`container mt-4 ${focus ? "has-focus" : ""}`}>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="phone-input"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-1"
                >
                  Phone Numbers
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <PhoneInput
                    inputProps={{
                      name: "phone-input",
                      className:
                        "form-control border-gray-300 rounded-md max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm",
                    }}
                    country={"in"} // Default country
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyPress}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                  />
                </div>
                <div className="mt-2 sm:col-span-1">
                  <div>
                    {phoneNumbers.map((phoneNumber, index) => (
                      <span
                        key={index}
                        className="badge badge-primary mr-2 mb-2 text-gray-700 bg-slate-200 rounded-md px-2"
                        style={{
                          display: "inline-block",

                          cursor: "pointer",
                        }}
                        onClick={() => handleRemovePhoneNumber(phoneNumber)}
                      >
                        {phoneNumber} &#x2716;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                About
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            {userData.map((data, index) => (
              <div key={index}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {index === 0 ? " Address" : `Address ${index + 1}`}
                </h3>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor={`country-${index}`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Country
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <CountryDropdown
                        value={data.country}
                        onChange={(val) => handleCountryChange(val, index)}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                      {data.country && (
                        <p className="ml-2 mt-1 text-xs">
                          ISO Code: {data.isoCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor={`region-${index}`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Region
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <RegionDropdown
                        disableWhenEmpty={true}
                        country={data.country}
                        value={data.region}
                        onChange={(val) => {
                          const updatedUserData = [...userData];
                          updatedUserData[index].region = val;
                          setUserData(updatedUserData);
                        }}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor={`city-${index}`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      City
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name={`city-${index}`}
                        id={`city-${index}`}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        value={data.city}
                        onChange={(e) => {
                          const updatedUserData = [...userData];
                          updatedUserData[index].city = e.target.value;
                          setUserData(updatedUserData);
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor={`street-${index}`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Street Address
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name={`street-${index}`}
                        id={`street-${index}`}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        value={data.street}
                        onChange={(e) => {
                          const updatedUserData = [...userData];
                          updatedUserData[index].street = e.target.value;
                          setUserData(updatedUserData);
                          checkZipValidity();
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor={`zip-${index}`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      ZIP / Postal code
                    </label>

                    <div >
                      <div className="mt-1 sm:mt-0 sm:col-span-2 flex ">
                        <input
                          type="text"
                          name={`zip-${index}`}
                          id={`zip-${index}`}
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          value={data.zip}
                          onChange={(e) => {
                            const updatedUserData = [...userData];
                            updatedUserData[index].zip = e.target.value;
                            setUserData(updatedUserData);
                          }}
                        />

                        {data.zip !== "" && (
                         <p className={`mt-2 ml-3 ${isValidZip ? 'text-green-500' : 'text-red-500'}`}>
                         {isValidZip ? "Valid Zip" : "Invalid Zip"}
                       </p>
                        )}
                      </div>

                      {index !== 0 && ( // Exclude Remove button for the original address
                        <div className="pt-5">
                          <button
                            type="button"
                            className="bg-red-600 py-2 px-4 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-700"
                            onClick={() => removeAddress(index)}
                          >
                            Remove Address
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-5">
              <button
                type="button"
                className="bg-indigo-600 py-2 px-4 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700"
                onClick={addAddress}
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end mb-5">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!isValidZip ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            onClick={postData}

          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
