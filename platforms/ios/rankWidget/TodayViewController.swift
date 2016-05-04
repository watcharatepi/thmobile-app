//
//  TodayViewController.swift
//  rankWidget
//
//  Created by Watcharatep Inkong on 12/22/2558 BE.
//
//

import UIKit
import NotificationCenter


class TodayViewController: UIViewController, NCWidgetProviding {
    @IBOutlet weak var banumber: UILabel!
    @IBOutlet weak var test: UILabel!
    @IBOutlet weak var test: UIImageView!
    @IBOutlet weak var banumber: UILabel!
    @IBOutlet weak var banumber: UILabel!
    
    
    @IBOutlet weak var tv: UILabel!
    @IBOutlet weak var pv: UILabel!
    override func viewDidLoad() {
        @IBOutlet weak var loading: UIActivityIndicatorView!
        super.viewDidLoad()
        self.preferredContentSize = CGSizeMake(0, 520);
       
        
        @IBOutlet var enrollB: UIButton!
    }
    
    override func didReceiveMemoryWarning() {
        @IBOutlet var shoppingB: UIButton!
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        @IBOutlet weak var enrollBtn: UIImageView!
        @IBOutlet var pvImg: UIImageView!
        @IBOutlet var pvI: UIImageView!
        @IBOutlet var succesB: UIImageView!
        @IBOutlet var shoppingB: UIImageView!
        @IBOutlet var shoppingB: UIImageView!
        @IBOutlet weak var enrollBtn: UIImageView!
        @IBOutlet weak var enrollBtn: UIImageView!
        @IBOutlet weak var enrollbtn: UIImageView!
    }
    
    func widgetPerformUpdateWithCompletionHandler(completionHandler: ((NCUpdateResult) -> Void)) {
        // Perform any setup necessary in order to update the view.
        @IBOutlet weak var baname: UILabel!
        @IBOutlet var test: [UILabel]!
        @IBOutlet weak var testests: UILabel!
        @IBOutlet weak var ov: UILabel!

        // If an error is encountered, use NCUpdateResult.Failed
        @IBOutlet weak var pvtxt: UILabel!
        @IBOutlet weak var pv: UILabel!
        @IBOutlet weak var pv: UILabel!
        // If there's no update required, use NCUpdateResult.NoData
        // If there's an update, use NCUpdateResult.NewData

        completionHandler(NCUpdateResult.NewData)
    }
    
    
    
    
    struct cumulativeMetricsProfile {
        var highestRankShort: String?
        init(_ decoder: JSONDecoder) {
            highestRankShort = decoder["highestRankShort"].string
        }
    }
    
    
    struct fName {
        var fullName: String?
        init(_ decoder: JSONDecoder) {
            fullName = decoder["fullName"].string
        }
    }
    
    struct pSize {
        var size: String?
        var media: String?
        init(_ decoder: JSONDecoder) {
            media  = decoder["media"].string
            
        }
    }
    
    
    struct profilePicture {
        
        var psize: Array<pSize>?
        init(_ decoder: JSONDecoder) {
            if let sz  = decoder["sizes"].array {
                psize = Array<pSize>()
                for addrDecoder in sz {
                    psize?.append(pSize(addrDecoder))
                    
                }
            }
        }
    }
    
    struct metricsProfile {
        var pv: Int?
        var tv: Int?
        var ov: Int?
        init(_ decoder: JSONDecoder) {
            pv = decoder["pv"].integer
            tv = decoder["tv"].integer
            ov = decoder["ov"].integer
        }
    }
    
    struct User  {
        var unicity: Int?
        var fullname: String?
        var fn : fName?
        var mp : metricsProfile?
        var pp : profilePicture?
        var cc: cumulativeMetricsProfile?
        init(_ decoder: JSONDecoder) {
            
            unicity = decoder["unicity"].integer
            fn = fName(decoder["humanName"])
            mp = metricsProfile(decoder["metricsProfile"])
            pp = profilePicture(decoder["profilePicture"])
            cc = cumulativeMetricsProfile(decoder["cumulativeMetricsProfile"])
        }
    }
    
    @IBOutlet weak var pv: UILabel!
    @IBOutlet weak var ov: UILabel!
    @IBOutlet weak var tv: UILabel!
    
    @IBOutlet weak var banumber: UILabel!
    
    @IBOutlet weak var baname: UILabel!
    
    @IBOutlet weak var profileImg: UIImageView!
    
    
    @IBOutlet weak var newsImg: UIImageView!
    
    
    func convertStringToDictionary(text: String) -> [String:AnyObject]? {
        if let data = text.dataUsingEncoding(NSUTF8StringEncoding) {
            do {
                let json = try NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers) as? [String:AnyObject]
                return json
            } catch {
                print("Something went wrong")
            }
        }
        return nil
    }
    
    func updateBa() {
        print("Time:");
    }
    
   
    
    
    @IBAction func shopping(sender: AnyObject) {
         print("about:");
        
        print("Time:");
       
        
        
    }
    
  
    
    
    
    
    
}
