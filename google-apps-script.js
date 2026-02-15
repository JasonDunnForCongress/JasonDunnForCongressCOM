// Google Apps Script Code for Contact Form
// 
// SETUP INSTRUCTIONS:
// ====================
// 
// Step 1: Create a Google Sheet
// -------------------------------
// 1. Go to https://sheets.google.com
// 2. Create a new blank spreadsheet
// 3. Name it "Jason Dunn Campaign Contacts" (or whatever you prefer)
// 4. In the first row, add these headers:
//    A1: Timestamp
//    B1: Name
//    C1: Email
//    D1: Phone
//    E1: ZIP Code
//    F1: Interest
//    G1: Message
// 5. Copy the Spreadsheet ID from the URL (it's the long string between /d/ and /edit)
//    Example: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
//
// Step 2: Create Google Apps Script
// -----------------------------------
// 1. Go to https://script.google.com
// 2. Click "New Project"
// 3. Delete any code in the editor
// 4. Paste ALL the code below (starting from "const SPREADSHEET_ID")
// 5. Replace 'YOUR_SPREADSHEET_ID_HERE' with your actual Spreadsheet ID from Step 1
// 6. Save the project (File > Save or Ctrl+S)
// 7. Name it "Contact Form Handler" or similar
//
// Step 3: Deploy the Script
// --------------------------
// 1. Click "Deploy" > "New deployment"
// 2. Click the gear icon next to "Select type"
// 3. Choose "Web app"
// 4. Set the following:
//    - Description: "Contact Form Handler"
//    - Execute as: "Me"
//    - Who has access: "Anyone" (this is safe - the script only accepts form data)
// 5. Click "Deploy"
// 6. Review permissions and click "Authorize access"
// 7. Choose your Google account
// 8. Click "Advanced" > "Go to [Project Name] (unsafe)" - this is YOUR script, so it's safe
// 9. Click "Allow"
// 10. Copy the "Web app URL" - it will look like:
//     https://script.google.com/macros/s/LONG_ID_HERE/exec
//
// Step 4: Update contact.html
// ----------------------------
// 1. Open contact.html
// 2. Find this line:
//    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
// 3. Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with the Web app URL from Step 3
// 4. Save and upload contact.html to your website
//
// Step 5: Test
// -------------
// 1. Go to your contact page
// 2. Fill out the form and submit
// 3. Check your Google Sheet - you should see a new row with the submission!
//
// ============================================================================
// PASTE THE CODE BELOW INTO GOOGLE APPS SCRIPT
// ============================================================================

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';  // Replace with your actual Spreadsheet ID

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Append the data as a new row
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.zip,
      data.interest,
      data.message
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this to verify the script works
function testSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString(),
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-1234',
        zip: '12345',
        interest: 'Volunteering',
        message: 'This is a test submission'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

// ============================================================================
// OPTIONAL: Email Notifications
// ============================================================================
// If you want to receive an email every time someone submits the form,
// add this code to the doPost function right after sheet.appendRow():
//
//     // Send email notification
//     MailApp.sendEmail({
//       to: 'your-email@example.com',  // Replace with your email
//       subject: 'New Contact Form Submission - Jason Dunn Campaign',
//       body: `New contact form submission:\n\n` +
//             `Name: ${data.name}\n` +
//             `Email: ${data.email}\n` +
//             `Phone: ${data.phone}\n` +
//             `ZIP: ${data.zip}\n` +
//             `Interest: ${data.interest}\n` +
//             `Message: ${data.message}\n\n` +
//             `Timestamp: ${data.timestamp}`
//     });
//
// ============================================================================

// TROUBLESHOOTING:
// ----------------
// If submissions aren't appearing in your sheet:
// 1. Check the Spreadsheet ID is correct
// 2. Make sure the Web app is deployed with "Execute as: Me" and "Who has access: Anyone"
// 3. Check the Execution log in Apps Script (View > Executions) for errors
// 4. Make sure your sheet has the correct headers in row 1
// 5. Try running the testSubmission() function to verify it works
//
// If you get CORS errors in the browser:
// - This is normal with mode: 'no-cors' - submissions will still work
// - The form will show success message even though you can't read the response
//
// Privacy Note:
// - Only you can access the Google Sheet and Apps Script
// - The script only accepts form data - no one else can read or modify your sheet
// - You can revoke access at any time by undeploying the web app
