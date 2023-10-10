function sendBirthdayEmails() {

  // use HTML file as template. Note: Apps Script ignores .html in file name
  let htmlFile = HtmlService.createTemplateFromFile("greeting-bday");

  // get images from Google Drive. Got File IDs from share links
  let imgs = {
		"bday-banner":  DriveApp.getFileById("<FILE_ID>").getAs("image/png"),
		"MLCM-polaroid":  DriveApp.getFileById("<FILE_ID>").getAs("image/png"),
	};



  // Get the sheet where the data is, in sheet 'CustomerDb'
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet4")

  //Setting up today date, the date when the function activated
  var now = Utilities.formatDate(new Date(), "GMT+4", "dd-MM");

  // Get all value of the sheet
  var data = sheet.getDataRange().getValues();

  

  // Loop through each row of the sheet
  data.forEach(function (col) {
    // Check if the date (month and day) are matched to today date, send email when matched
    if (Utilities.formatDate(new Date(col[0]), "GMT+4", "dd-MM") === now) {
      Logger.log("Sending birthday email to "+col[2]+ " " +col[3])

      // put name in template
      htmlFile.name = col[2];

      MailApp.sendEmail({
        to: col[6],
        subject: "Wishing you a Blessed Birthday",
        htmlBody: htmlFile.evaluate().getContent(),
        inlineImages: imgs
      });
    }
    else {
      Logger.log("No birthday match")
    }
  });
}


function testHTML() {
  // use HTML file as template. Note: Apps Script ignores .html in file name
  let htmlFile = HtmlService.createTemplateFromFile("greeting-bday");
  htmlFile.name = "testname";

  // get images from Google Drive. Got File IDs from share links
  let imgs = {
		"bday-banner":  DriveApp.getFileById("<FILE_ID>").getAs("image/png"),
		"MLCM-polaroid":  DriveApp.getFileById("<FILE_ID>").getAs("image/png"),
	};

  MailApp.sendEmail({
    to: "<EMAIL_ADDRESS>",
    subject: "Test HTML Email - attach img & HTML template",
    htmlBody: htmlFile.evaluate().getContent(),
    inlineImages: imgs
  });
}