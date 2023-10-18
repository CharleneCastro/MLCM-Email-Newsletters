### Automated Emails from Contact List on Google Sheets
# MLCM Email Newsletter



## Purpose
To send automated birthday & anniversary emails given a contact list on Google Sheets.



## Format of Google Sheets
|DATE LAST CHECKED | LAST NAME | FIRST NAME | ADDRESS | (BLANK) | PHONE # | EMAIL | B-DAY | ANNIV |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| ... | ... |... |... |... |... |... |... |... |
| ... | ... |... |... |... |... |... |... |... |


To get values from a sheet in a Google Sheets file:
```
var data = sheet.getDataRange().getValues();
```
A loop can be used to cycle through each row
```
data.forEach(function (row) {...}
```
Each row is an array of values in its columns. For instance, **"DATE LAST CHECKED"** would be row[0] because it is the first value in each row. Therefore: 


|DATE LAST CHECKED | LAST NAME | FIRST NAME | ADDRESS | (BLANK) | PHONE # | EMAIL | B-DAY | ANNIV |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| row[0] | row[1] | row[2] |row[3] | row[4] | row[5] | row[6] | row[7] | row[8] |
| ... | ... |... |... |... |... |... |... |... |



## Optimizing
Currently the script checks each row of the dataset, creating a complexity of O(n). To improve this, a sorting algorithm can be used to sort all rows in chronological order by birthday, and inside the loop a breakpoint can be used once the loop reaches a birthday at a future date (be sure that it doesn't stop *at* the first instance of a birthday, otherwise it will miss some people that share a birthday). 

An optimal solution would involve sorting the spreadsheet itself, however I prefer keeping it in order by last name.



## Inline Images
I embedded images that are saved on Google Drive.

```
// get images from Google Drive. Got File IDs from share links
let imgs = {
"bday-banner": DriveApp.getFileById("<FILE_ID>").getAs("image/png"),
"MLCM-polaroid":  DriveApp.getFileById("<FILE_ID>").getAs("image/png"),
};
```

The file ID can be found by...

1. Locate the image on Google Drive and get its share link 
2. The share link will be in the format:
https://drive.google.com/file/d/[FILE_ID]/view
3. In the HTML file, change the image source to 
```
cid:[name in imgs{}]
```


An alternative solution would be to use the file's share link directly in the image source with the format: https://drive.google.com/uc?export=view&id=[FILE_ID]



## Resources Used
* [Tutorial for Automated Birthday Emails with Google Sheets & Apps Script](https://medium.com/geekculture/never-miss-your-customers-birthday-email-with-google-sheets-d64e75372341) 

* [Tutorial for including images](https://spreadsheet.dev/inline-images-mailapp-apps-script)

* [Tutorial for Including Names from Google Sheets](https://blog.gsmart.in/google-apps-script-send-html-email/) 