import React from "react";

const ShowError = ({ children }) => {
    return <span type="inValid" style={{ color: "red",  textAlign: "left" }}>{children}</span>;
};

export default ShowError;