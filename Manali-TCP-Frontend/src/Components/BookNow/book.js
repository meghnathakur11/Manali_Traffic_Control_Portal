import React, { useEffect, useState } from "react";
import "../../css/styles.css";
import "../../css/main.css";
import Header from "../Home/Header/header";
import { api } from "../Api/api";
import UseApi from "../Hook/UseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Book() {
  const [date, setDate] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [location, setLocation] = useState("");
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const url = api?.userDetails();
    const userDetailsResponse = await UseApi(url, "get");
    console.log(userDetailsResponse, "this is the reponse====");
    setUserDetails(userDetailsResponse?.data[0]);
  };

  const setBookingDetails = async () => {
    const url = api.setBookingDetails();
    const userBookingResponse = await UseApi(url, "post", {
      carNumber: carNumber || "",
      location: location || "",
      date: date || "",
      email:userDetails?.email || "",
    });

    console.log(userBookingResponse,"meghuuuu");

    if (userBookingResponse?.status === 400) {
      alert(`${userBookingResponse?.data?.message}`);
      return toast.error(`hello`);
    }

    alert(userBookingResponse?.message);
    navigate("/auth/home");
  };

  useEffect(() => {
    getUserDetails();
  }, [userDetails?.length]);

  return (
    <>
      <Header />
      <section className="book section" id="book">
        <div className="book_container">
          <h2 className="section__title book__title">Book Your Place</h2>
          <p className="book__description">
            You can book your place now, we will guide you all the way to wait,
            get your place now.
          </p>
          <form className="book_form">
            <div className="book_form-group">
              <label
                htmlFor="text"
                className="book_form-label"
                value={location}
              >
                Where
              </label>
              <select
                className="book__form-input"
                onClick={(e) => {
                  setLocation(e.target.value);
                }}
              >
                <option className="book__form-input">Select</option>
                <option className="book__form-input" id="book_to">
                  Atal Tunnel
                </option>
                {/* <option className="book__form-input" id="book_to">
                  Hampta Pass
                </option>
                <option className="book__form-input" id="book_to">
                  Old Manali
                </option>
                <option className="book__form-input" id="book_to">
                  Setan
                </option> */}
              </select>
            </div>

            <div className="book_form-group">
              <label htmlFor="book_name" className="book_form-label">
                Email
              </label>
              <input
                disabled={true}
                value={userDetails?.email || ""}
                type="text"
                name="text"
                id="book_name"
                className="book__form-input"
              />
            </div>

            <div className="book_form-group">
              <label htmlFor="book_number" className="book_form-label">
                Name
              </label>
              <input
                disabled={true}
                value={userDetails?.name || ""}
                type="text"
                name="name"
                id="book_number"
                className="book__form-input"
              />
            </div>

            <div className="book_form-group">
              <label htmlFor="book_email" className="book_form-label">
                Car No
              </label>
              <input
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
                type="text"
                name="email"
                id="book_email"
                className="book__form-input"
                placeholder="Enter your Car No."
              />
            </div>

            <div className="book_form-group">
              <label htmlFor="book_date" className="book_form-label">
                Date
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                name="date"
                id="book_date"
                className="book__form-input"
                placeholder="Enter your date"
              />
            </div>
          </form>
          <button
            className="button_book"
            type="button"
            onClick={setBookingDetails}
          >
            BOOK NOW
          </button>
        </div>
      </section>
    </>
  );
}

export default Book;
