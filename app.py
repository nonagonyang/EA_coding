import grequests
import csv

from flask import Flask
from flask import jsonify 
from flask import request
from flask_cors import CORS #comment this on deployment

app = Flask(__name__)
CORS(app) #comment this on deployment

# instead of making API calls one at a time
# create a set of unsent Requests
# send them all at the same time
# to reduce the process time significantly
urls=set()
uniquePostcode=set()

# Tune this according to the rate request threshold specified 
# or that makes sense for the PRIZM endpoint
MAX_CONCURRENT_REQUESTS = 20
SAMPLE_CSV = "customerInfo.csv"
NUM_ROWS_PREVIEW=6

prizmCodeRequests = {}
prizmUrlToPostcodeLookup = {}
postcodeToSegmentMap={}
allSegmentCodes=[]
segmentCodeCounts={}

@app.route("/preview")
def preview():
    csvPath = request.args.get('csvfile')
    if csvPath is None or csvPath == '':
        csvPath=SAMPLE_CSV
    

    rows = []
    with open(csvPath, 'r') as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        counter=0
        for row in csvreader:
            while counter < NUM_ROWS_PREVIEW:
                rows.append(row)
                counter+=1
    return {
  "columns" : header,
  "content" : rows
}

@app.route("/process")
def process():
    csvPath = request.args.get('csvfile')
    if csvPath is None or csvPath =='':
        csvPath=SAMPLE_CSV
    
    rows = []
    with open(csvPath, 'r') as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        header.append("PRIZM Code")

        #accumulate all PRIZM request urls 
        for row in csvreader:
            #row[2] is 'Postal Code'
            currentPostCode=row[2]
            #construct url and add to urls set
            if currentPostCode not in uniquePostcode:
                uniquePostcode.add(currentPostCode)
                if isValidPostCode(currentPostCode):
                    constructUrl(currentPostCode)
            else:
                pass
          
        #send PRIZM request urls in batches
        sendGRequests(urls) 
    

    with open("customerInfo.csv", 'r') as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        header.append("PRIZM Code")
        for row in csvreader:
            currentPostCode=row[2]
            if currentPostCode in postcodeToSegmentMap:
                segmentCode=postcodeToSegmentMap[currentPostCode]
                row.append(segmentCode)
                allSegmentCodes.append(segmentCode)

            else:
                row.append(-1)
            rows.append(row)
        makeSegmentCodeCounts(allSegmentCodes)

    return {
        "columns" : header,
        "content" : rows
        }



def makeSegmentCodeCounts(allSegmentCodes):
    if allSegmentCodes:
        for code in allSegmentCodes:
            if (code in segmentCodeCounts):
                segmentCodeCounts[code] = (segmentCodeCounts[code] + 1)
            else:
                segmentCodeCounts[code]=1   
        print(segmentCodeCounts)
        return  segmentCodeCounts
    else:
        pass




#call the PRIZM API
def constructUrl(postcode):
    urls.add('https://prizm.environicsanalytics.com/api/pcode/get_segment?postal_code={}'.format(postcode))
    url = 'https://prizm.environicsanalytics.com/api/pcode/get_segment?postal_code={}'.format(postcode)
    prizmUrlToPostcodeLookup[url] = postcode
   

def extractSegmentCode(response):
    #check response type and return segment
    if response["format"]=="multi":
        return response["data"][0]["prizm_id"]
    elif response["format"]=="unique":
        return response["data"]
    elif response["format"]=="non_residential_zoning":
        return None

def isValidPostCode(postcode):
    #<letter><number><letter><number><letter><number>
    cleanPostcode=postcode.replace(" ", "")
    if len(cleanPostcode)==6 and cleanPostcode[0].isalpha() and cleanPostcode[2].isalpha() and cleanPostcode[4].isalpha() and cleanPostcode[1].isnumeric() and cleanPostcode[3].isnumeric() and cleanPostcode[5].isnumeric():
        return True
    return False


def sendGRequests(urls):
    reqs = (grequests.get(url) for url in urls)
    for resp in grequests.imap(reqs, size=MAX_CONCURRENT_REQUESTS):
        postCode = prizmUrlToPostcodeLookup[resp.url]
        segmentCode = extractSegmentCode(resp.json())
        postcodeToSegmentMap[postCode] = segmentCode