// ============================================================
//  HOW TO DEPLOY
//  1. Open your Google Sheet → Extensions > Apps Script
//  2. In Code.gs, paste this entire file
//  3. Click the + next to Files → HTML → name it "index"
//  4. Paste the contents of index.html into that file
//  5. Click Deploy > New Deployment
//     - Type: Web App
//     - Execute as: Me
//     - Who has access: Anyone
//  6. Click Deploy → copy the Web App URL
//  7. Paste that URL into a QR code generator (e.g. qr.io or qrcode-monkey.com)
// ============================================================

function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  template.scriptUrl = ScriptApp.getService().getUrl();
  return template.evaluate()
    .setTitle('Think You Know Influencer Marketing?')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Quiz Score",
      "Business Type",
      "Experience",
      "Biggest Barrier",
      "Current Customer Reach",
      "Reaction to Concept",
      "Willingness to Pay",
      "Peri Type"
    ]);
  }

  sheet.appendRow([
    new Date().toLocaleString(),
    data.name,
    data.score + "/4",
    data.biztype,
    data.experience,
    data.painpoint,
    data.reach,
    data.reaction,
    data.wtp,
    data.peritype
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
