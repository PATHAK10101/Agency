const { google } = require("googleapis");
const path = require("path");

// Path to your downloaded service account JSON file
const KEYFILEPATH = path.join(__dirname, "../leadautomation-466814-9dd6391c72a6.json");

// Google Sheets API scope
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Authenticate
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// Append form data to Google Sheet
const appendToSheet = async ({ name, email, phone, service, message }) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1xlz9gWpJO0_qJSPiCrJSspDuMRT66EyptdJxHo7ftwM"; 
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:F", // Adjust if your sheet name or column range is different
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, phone, service, message, now]],
    },
  });
};

module.exports = appendToSheet;
