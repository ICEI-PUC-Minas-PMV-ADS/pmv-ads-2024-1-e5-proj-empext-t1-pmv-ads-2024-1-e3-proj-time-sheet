import React from "react";
import { delay } from "../common/utils";

export function useNotification(displayTime) {
  const [visible, setVisible] = React.useState(false);

  function showNotification() {
    setVisible(true);

    delay(displayTime).then(() => {
      setVisible(false);
    });
  }

  return { visible, showNotification };
}
