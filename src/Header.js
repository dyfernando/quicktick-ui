import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReconcileContext } from "./contexts/reconcile.context";
import logo from './images/lseg-logo.png';
import style from "./styles/header.module.scss"

export default function Header() {
  const { state, dispatch } = useContext(ReconcileContext);
  return (
    <div className={style["Header"]}>
      <div className={style["Header-border"]}>
        <img width="150" height="70" src={logo} alt="logo" />
        {!state.mainPage &&
          <Link to="/reconciliation">
            <button onClick={() => { dispatch({ type: "RESET_STATE" }); console.log("test"); }}>
              <i className="fas fa-home"></i>
            </button>
          </Link>
        }
      </div>
      <div className={style["Header-title"]}>
        <p> Quicktick <br /> Application Portal</p>
      </div>
    </div>
  )
}