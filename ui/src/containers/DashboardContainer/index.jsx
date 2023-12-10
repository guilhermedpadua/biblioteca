import React, { useState, useEffect, useRef } from "react";

import MyButton from "../../public/images/";


import "./index.less";

function DashboardContainer() {
  const [counter, setCounter] = useState(0);

  const refButton = useRef();

  useEffect(() => {
    $(refButton.current).fadeOut(250).fadeIn(250);
  }, [counter]);

  const onClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="my-dashboard">
      
      <div>
      <h1>Seja Bem vindo a sua area de gestão</h1>
      </div>
    </div>
  );
}

export default DashboardContainer;