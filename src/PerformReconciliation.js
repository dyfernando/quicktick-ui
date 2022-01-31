import React, { useContext } from "react";
import { ReconcileContext } from "./contexts/reconcile.context";

const GetIdToken = () => {
  try {
    let idToken = new URLSearchParams(window.location.hash).get('id_token');
    if (idToken == null) {
      return "ID token null"
    } else {
      return idToken
    }
  } catch (err) {
    let idToken = new URLSearchParams(window.location.hash).get('#id_token');
    return idToken
  }
}

const FetchData = async (folderPath) => {
  const idToken = GetIdToken()

  const returnDataFile = "q9tady1ped.execute-api.eu-west-1.amazonaws.com/dev/quicktick-return-file"

  const returnDataResponse = await fetch(returnDataFile, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Accept-Encoding": "gzip",
      Accept: "application/zip",
      origin: "https://d2evuxp53cm3a7.cloudfront.net",
      authorization: idToken,
    },
    body: JSON.stringify({ 'folder_path': folderPath })
  })
  return returnDataResponse
}

const ReadFile = async (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => { resolve(reader.result); });
    reader.readAsArrayBuffer(file);
  });
}

export default async function PerformReconciliation() {
  const { state } = useContext(ReconcileContext);
  const idToken = GetIdToken()
  const baseUrl = "czywor8ic7.execute-api.eu-west-1.amazonaws.com/dev/quicktick-initiate-flow";

  try {
    let apiResponse = await fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: "application/json",
        origin: "d2evuxp53cm3a7.cloudfront.net",
        authorization: idToken,
      }
      ,
      body: JSON.stringify({ 'issuer': state.recType })
    })
    //url is the presigned url return from S3 through lambda function
    const presignedUrl = await apiResponse.json()
    console.log(presignedUrl)
    const fileContent = await ReadFile(state.selectedFile)
    // upload the file to S3 presigned url
    const uploadResponse = await fetch(presignedUrl,
      {
        'method': "PUT",
        body: fileContent,
        headers: {
          "Content-Type": state.selectedFile.type,
          "Content-Length": state.selectedFile.size
        }
      })
    console.log(uploadResponse)

    const key = decodeURI(new URL(presignedUrl).pathname)
    const outKey = key.replace('/QuickTick Input.zip', '')
    console.log(outKey)
    const timeList = [60, 90, 120, 150, 180]
    for (let i = 0; i < timeList.length; i++) {
      let timeValue = timeList[i]
      let folderPath = outKey.slice(1)
      console.log(`Trying in ${timeValue} seconds...`)
      await new Promise(r => setTimeout(r, timeValue * 1000));
      //fetch data from S3
      const returnDataResponse = await FetchData(folderPath)
      const dataReturn = await returnDataResponse.blob()
      if (dataReturn.type === 'application/zip') {
        const downloadUrl = URL.createObjectURL(dataReturn)
        return (
          <div>{downloadUrl}</div>
        )
      }
      else {
        console.log('File not found')
      }
    }
  } catch (err) {
    console.error(err)
    throw err
  }



} 