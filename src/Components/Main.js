import React from "react";
import * as PropTypes from "prop-types";

function Main(props) {
  const {
    hashItems: { access_token },
  } = props;

  return <p className="regText">Something Amazing I guess</p>;
}

export default Main;

Main.propTypes = {
  hashItems: PropTypes.object.isRequired,
};
