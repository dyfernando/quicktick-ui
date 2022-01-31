import React, { useContext } from "react";
import { ReconcileContext } from "./contexts/reconcile.context";
import PerformReconciliation from "./PerformReconciliation"
import style from './styles/reconcile.module.scss';

function ReconcileOption() {
  const { state, dispatch } = useContext(ReconcileContext);

  function handleOnFileUpload() {
    console.log(`file upload size ${state.selectedFile}`);
    PerformReconciliation()
  }

  return (
    <div className={style["Reconcile"]}>
      <div className={style["Reconcile-group"]}>
        <div className={style["Reconcile-group-options"]}>
          <div className={style["Reconcile-group-options-list"]}>
            {state.detailedOptions.map(element =>
              <label key={element.name}>
                <input type="radio" value={element.name} name="option" checked={element.name === state.name}
                  onChange={(e) => { dispatch({ type: "CHANGE_DISPLAY_CONTENT", name: e.target.value, recType: element.recType }); }} />
                {element.name}<br />
              </label>
            )}
          </div>
          <div className={style["Reconcile-group-options-description"]}>
            <p>Please read the instructions below and upload files as instructed:</p>
            <ul>
              {state.detailedOptions.filter(element => element.name === state.name).map(element => (
                element.content.map((listItem, Index) => <li key={Index}>{listItem}</li>)
              ))}
            </ul>
          </div>
        </div>
        <div className={style["File-submission"]}>
          <input className={style["File-submission-input"]} type="file"
            onChange={(e) => { dispatch({ type: "ON_FILE_CHANGE", filename: e.target.files[0] }); }} />
          <button onClick={handleOnFileUpload}>
            <i className="fas fa-file-upload"></i>
          </button>
        </div>
      </div>
    </div>
  )
}


export default ReconcileOption;