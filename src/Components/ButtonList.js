import React from "react";
import * as PropTypes from "prop-types";
import ShuffleButton from "./UtilityButtons/ShuffleButton";

function ButtonList(props) {
  const {
    hashItems: { access_token },
    updateMessageList,
  } = props;

  return (
    <div>
      <ShuffleButton
        access_token={access_token}
        updateMessageList={updateMessageList}
        name="Shuffle"
      />
    </div>
  );
}

export default ButtonList;

ButtonList.propTypes = {
  hashItems: PropTypes.object.isRequired,
  updateMessageList: PropTypes.func.isRequired,
};
