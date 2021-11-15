import React, { useState } from "react";
import { Fragment } from "react";
import "./shipping.css";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { BiStreetView } from "react-icons/bi";
import { FaCity, FaGlobeEurope } from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import { BsSignpostFill, BsPhone } from "react-icons/bs";
import { Country, State } from "country-state-city";
import StepperComponent from "./../../Utils/Stepper/Stepper";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "./../../REDUX/Actions/cartAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";

const initialState = {
  country: "",
  state: "",
  name: "",
  street: "",
  city: "",
  zipcode: "",
  phoneNumber: "",
};
const Shipping = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [shippingInformation, setShippingInformation] = useState(initialState);

  const handleChange = (e) => {
    setShippingInformation({
      ...shippingInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (shippingInformation.phoneNumber.length < 11) {
      alert.error("Your Phone Number Must Be 11 Digit Long");
    } else {
      dispatch(saveShippingInfo(shippingInformation));
      history.push("/order/confirmation");
    }
  };
  return (
    <Fragment>
      <StepperComponent activeStep={0} />

      <div className="shippingPage">
        <div className="shippingDetailsContainer">
          <h3>Shipping Details</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="formInput">
              <IoPeopleCircleOutline />
              <input
                type="text"
                placeholder="Enter Name"
                required={true}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <BiStreetView />
              <input
                type="text"
                placeholder="Street"
                required={true}
                name="street"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <FaCity />
              <input
                type="text"
                placeholder="City"
                required={true}
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <BsSignpostFill />
              <input
                type="text"
                placeholder="Zip Code"
                required={true}
                name="zipcode"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <BsPhone />
              <input
                type="number"
                placeholder="Phone Number"
                required={true}
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <FaGlobeEurope />
              <select
                name="country"
                onChange={handleChange}
                required={true}
                value={shippingInformation.country || ""}
              >
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {shippingInformation.country && (
              <div className="formInput">
                <ImOffice />
                <select name="state" onChange={handleChange} required={true}>
                  {State &&
                    State.getStatesOfCountry(shippingInformation.country).map(
                      (item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      )
                    )}
                </select>
              </div>
            )}
            <input className="submitBtn" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
