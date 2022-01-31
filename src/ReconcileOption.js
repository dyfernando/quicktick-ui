import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReconcileContext } from "./contexts/reconcile.context";
import bank from './images/bank.png';
import supplier from './images/supplier.png';
import style from "./styles/homepage.module.scss"

const options = [
  {
    option: "Bank Reconciliation",
    optionShortName: "bank",
    detailedOptions: [
      {
        name: "HSBC",
        recType: "bank_hsbc",
        content: ["Create a folder named Bank_Wand_ENTITY.",
          "Place the WAND Reports named in the format Wand_Report_ACCOUNT_MONTHYEAR.xlsx.",
          "Place the Bank reports named in the format Bank_Statement_ACCOUNT_MONTHYEAR.xlsx.",
          "Compress the folder into ZIP format.",
          "Upload the compressed folder through the below form."]
      },
      {
        name: "WELLSFARGO",
        recType: "bank_wellsfargo",
        content: ["Create a folder named Bank_Wand_ENTITY.",
          "Place the WAND Reports named in the format Wand_Report_ACCOUNT_MONTHYEAR.xlsx.",
          "Place the Bank reports named in the format Bank_Statement_ACCOUNT_MONTHYEAR.xlsx.",
          "Compress the folder into ZIP format.",
          "Upload the compressed folder through the below form."]
      },
      {
        name: "HOLDING",
        recType: "bank_holding",
        content: ["Create a folder named Project_Holding_Account_ENTITY.",
          "Place the file named Project_Holding_Account_ENTITY.xlsx in the folder.",
          "Compress the folder into ZIP format.",
          "Upload the compressed folder through the below form."]
      },
      {
        name: "INTERCOMPANY",
        recType: "bank_intercompany",
        content: ["Compress the file named Intercompany_ENTITY into ZIP format.",
          "Upload the compressed folder through the below form."]
      },
      {
        name: "ESSBASE",
        recType: "bank_essbase",
        content: ["Name the WAND Reports in the format Essbase_ENTITY.xlsx.",
          "Compress the folder into ZIP format.",
          "Upload the compressed folder through the below form."]
      }
    ],
    iconName: bank
  },
  {
    option: "Supplier Reconciliation",
    optionShortName: "supplier",
    detailedOptions: [
      {
        name: "LSEG",
        recType: "supplier_lseg",
        content: ["Check if all Vendor statements has the following tabs with the same names as given in the list.( add list)",
          "Create a folder with all the Vendor statements in .xlsx format.",
          "Compress the folder using ZIP format.",
          "Select the Entity in the dropdown.",
          "Upload the compressed folder through the below form."]
      },
      {
        name: "REFINITIV",
        recType: "supplier_refinitiv",
        content: ["Check if all Vendor statements has the following tabs with the same names as given in the list.( add list)",
          "Create a folder with all the Vendor statements in .xlsx format.",
          "Compress the folder using ZIP format.",
          "Select the Entity in the dropdown.",
          "Upload the compressed folder through the below form."]
      }
    ],
    iconName: supplier
  }
]

function ReconcileOption() {
  const { dispatch } = useContext(ReconcileContext);

  return (
    <div className={style["Main-content"]}>
      {options.map((p) => (
        <Link to={`/reconciliation/${p.optionShortName}`} key={p.option} >
          <button onClick={() => { dispatch({ type: "TOGGLE_MAIN_PAGE", detailedOptions: p.detailedOptions }); }}>
            <img width="140" height="140" src={p.iconName} alt={p.option} />
            <h2>{p.option}</h2>
          </button>
        </Link>
      ))}
    </div>
  )
}

export default ReconcileOption;