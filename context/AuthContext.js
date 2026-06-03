"use client";

import React, { createContext, useState } from 'react';
import api from "../lib/api";

const AuthContext = () => {

    const [first, setfirst] = useState(second);
    const AuthContext = createContext();

  return (
    <div>AuthContext</div>
  )
};

export default AuthContext;