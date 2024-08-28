import { successMessage } from "../components/common/commonToaster";

export const postSegmentApi = (formData, handleReset) => {
  // Replace with your webhook URL
  const webhookUrl =
    "https://webhook.site/ed976c5d-7245-4d82-a90a-5508ce1f5f0a";

  // Make POST request
  fetch(webhookUrl, {
    mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": "ed976c5d-7245-4d82-a90a-5508ce1f5f0a",
      Cors: true,
    },
    body: JSON.stringify(formData), // Convert input data to JSON string
  })
    .then((response) => {
      successMessage("Added Successfully!")
      handleReset()
      return response.json(); // Parse JSON response
    })
    .then((data) => {
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

//fetch data
export const getSegmentData = (setData) => {
  const webhookUrl =
    "https://webhook.site/token/ed976c5d-7245-4d82-a90a-5508ce1f5f0a/request/latest/raw";
  fetch(webhookUrl, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "api-key": "ed976c5d-7245-4d82-a90a-5508ce1f5f0a",
      accept: "application/json",
      Cors: true,
    },
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Requests Data:", data); // This logs the requests data to the console
      setData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
