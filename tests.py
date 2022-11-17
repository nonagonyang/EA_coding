import unittest
import app

class TestCSVProcessMethods(unittest.TestCase):

    def test_constructUrl(self):
        self.assertEqual(app.constructUrl("A0A1B0"), None)
    def test_extractSegmentCode(self):
        self.assertEqual(app.extractSegmentCode({"result":"success","data":26,"format":"unique"}), 26)
        self.assertEqual(app.extractSegmentCode({"result":"error","data":"The postal code provided is not assigned to a segment. Please enter a residential postal code.","format":"non_residential_zoning"}
), None)
    def test_isValidPostCode(self):
        self.assertEqual(app.isValidPostCode("A0A1B0"), True)
        self.assertEqual(app.isValidPostCode("A0A 1B0"), True)
        self.assertEqual(app.isValidPostCode("A00000"), False)
   

if __name__ == '__main__':
    unittest.main()