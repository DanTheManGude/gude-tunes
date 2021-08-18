import React from "react";
import * as PropTypes from "prop-types";

import ShuffleButton from "./UtilityButtons/ShuffleButton";
import CandlesButton from "./UtilityButtons/CandlesButton";

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
        text="Activate Shuffle"
      />
      <CandlesButton
        access_token={access_token}
        updateMessageList={updateMessageList}
        name="Candles"
        text="Don't light candles"
      />
    </div>
  );
}

export default ButtonList;

ButtonList.propTypes = {
  hashItems: PropTypes.object.isRequired,
  updateMessageList: PropTypes.func.isRequired,
};
