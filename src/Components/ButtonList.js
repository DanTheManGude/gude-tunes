import React from "react";
import * as PropTypes from "prop-types";

import { buttonIds, buttonProperties } from "../Constants";
import { getButtonOnClick } from "../Utils";

function ButtonList(props) {
  const {
    hashItems: { access_token },
    updateMessageList,
  } = props;

  return (
    <div>
      {buttonIds.map((buttonId) => {
        const { text, classNames = "", name } = buttonProperties[buttonId];
        return (
          <button
            className={`utility-btn ${classNames}`}
            onClick={getButtonOnClick(
              buttonId,
              access_token,
              updateMessageList,
              name
            )}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonList;

ButtonList.propTypes = {
  hashItems: PropTypes.object.isRequired,
  updateMessageList: PropTypes.func.isRequired,
};
