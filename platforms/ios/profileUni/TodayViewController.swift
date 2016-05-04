//
//  TodayViewController.swift
//  profileUni
//
//  Created by Watcharatep Inkong on 1/7/2559 BE.
//
//


import UIKit
import NotificationCenter

class TodayViewController: UIViewController, NCWidgetProviding {
    
    @IBOutlet weak var banumber: UILabel!
    
    @IBOutlet weak var baname: UILabel!
    
    @IBOutlet weak var profileImg: UIImageView!
    
    @IBOutlet weak var loading: UIActivityIndicatorView!
    
    @IBOutlet weak var pv: UILabel!
    
    @IBOutlet weak var ov: UILabel!
    @IBOutlet weak var tv: UILabel!
    @IBOutlet weak var newsImg: UIImageView!
    
    @IBOutlet weak var enrollB: UIButton!
    
    @IBOutlet weak var shoppingB: UIButton!
    
    @IBOutlet weak var succB: UIButton!
    
    @IBOutlet weak var pvImg: UIImageView!
    
    @IBOutlet weak var tvImg: UIImageView!
    @IBOutlet weak var ovImg: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view from its nib.
        
        
        
        self.preferredContentSize = CGSizeMake(300, 310);

        
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    func widgetPerformUpdateWithCompletionHandler(completionHandler: ((NCUpdateResult) -> Void)) {
        // Perform any setup necessary in order to update the view.

        // If an error is encountered, use NCUpdateResult.Failed
        // If there's no update required, use NCUpdateResult.NoData
        // If there's an update, use NCUpdateResult.NewData

        completionHandler(NCUpdateResult.NewData)
    }
    
    
    
    func convertStringToDictionary(text: String) -> [String:AnyObject]? {
        if let data = text.dataUsingEncoding(NSUTF8StringEncoding) {
            do {
                let json = try NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers) as? [String:AnyObject]
                return json
            } catch {
                self.banumber.text = "Something went wrong"
            }
        }
        return nil
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
    
    @IBAction func shopping(sender: AnyObject) {
        print("about:");
        
        print("Time:");
        
      //  extensionContext?.openURL(NSURL(string: "mobiapp://")!, completionHandler: nil)
        
         let url =  NSURL(string:"mobiapp://shopping")
        
        self.extensionContext?.openURL(url!, completionHandler:{(success: Bool) -> Void in
            
        })
    }
    
    @IBAction func enroll(sender: AnyObject) {
        print("about:");
        
        print("Time:");
        
        //  extensionContext?.openURL(NSURL(string: "mobiapp://")!, completionHandler: nil)
        
        let url =  NSURL(string:"mobiapp://enroll")
        
        self.extensionContext?.openURL(url!, completionHandler:{(success: Bool) -> Void in
            
        })
    }
    
    @IBAction func success(sender: AnyObject) {
        print("about:");
        
        print("Time:");
        
        //  extensionContext?.openURL(NSURL(string: "mobiapp://")!, completionHandler: nil)
        
        let url =  NSURL(string:"mobiapp://success")
        
        self.extensionContext?.openURL(url!, completionHandler:{(success: Bool) -> Void in
            
        })
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

    func imageTapped(img: AnyObject)
    {
        // Your action
        
        
        let url =  NSURL(string:"mobiapp://news")
        
        self.extensionContext?.openURL(url!, completionHandler:{(success: Bool) -> Void in
            
        })
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(true)
        
        loading.hidden = true
      
        
        let defaults = NSUserDefaults(suiteName: "group.com.unicity.mobiapp")
        defaults?.synchronize()
        
        
        if let restoredValue = defaults!.stringForKey("data1") {
            let result = convertStringToDictionary(restoredValue)
            if let _ = result?["sessionToken"] {
                
                
                let baid = result?["baid"]
                
                let name = result?["name"]
                let pv = result?["pv"]
                 let tv = result?["tv"]
                 let ov = result?["ov"]
                 let rank = result?["rank"]
                
                self.banumber.text = String(baid!)
                self.baname.text = String(name!)
                
                
                
                let formatter = NSNumberFormatter()
                formatter.numberStyle = NSNumberFormatterStyle.DecimalStyle
                formatter.groupingSeparator = ","
                formatter.groupingSize = 3
                
                let result1 = formatter.stringFromNumber(Int(String(pv!))!)!
                
            

                self.pv.text = String(result1)
                
                
                formatter.numberStyle = NSNumberFormatterStyle.DecimalStyle
                formatter.groupingSeparator = ","
                formatter.groupingSize = 3
                
                let result2 = formatter.stringFromNumber(Int(String(tv!))!)!
                
                
                
                self.tv.text = String(result2)
                
                formatter.numberStyle = NSNumberFormatterStyle.DecimalStyle
                formatter.groupingSeparator = ","
                formatter.groupingSize = 3
                
                let result3 = formatter.stringFromNumber(Int(String(ov!))!)!
                
                self.ov.text = String(result3)
                
                
                var pinImage =  ["Dst":"01","Ph1" : "02","Mgr" : "03","SrM" : "04","ExM" : "05","Dir" : "06","SrD" : "07", "ExD" : "08","PrD" : "09","PrS" : "10","PrR" : "11","DIA" : "12"]
                
                if let profileimg = result?["profileimg"] {
                    let url = NSURL(string: profileimg as! String)
                    let data = NSData(contentsOfURL: url!) //make sure your image in this url does exist, otherwise unwrap in a if let check
                    self.profileImg.image = UIImage(data: data!)
                    self.profileImg.layer.borderWidth = 1.0
                    self.profileImg.layer.masksToBounds = false
                    self.profileImg.layer.borderColor = UIColor.whiteColor().CGColor
                    self.profileImg.layer.cornerRadius = self.profileImg.frame.size.width/2
                    self.profileImg.clipsToBounds = true
                }else{
                    
                    self.profileImg.image =  UIImage(named: pinImage[rank! as! String]!)!
                    self.profileImg.layer.borderWidth = 1.0
                    self.profileImg.layer.masksToBounds = false
                    self.profileImg.layer.borderColor = UIColor.whiteColor().CGColor
                    self.profileImg.layer.cornerRadius = self.profileImg.frame.size.width/2
                    self.profileImg.clipsToBounds = true

                    
                   
                    
                }
               /* if let newsimg = result?["newsimg"] {
                    let url = NSURL(string: String(newsimg))
                    let data = NSData(contentsOfURL: url!) //make sure your image in this url does exist, otherwise unwrap in a if let check
                    self.newsImg.image = UIImage(data: data!)
                   // self.newsImg.layer.borderWidth = 1.0
                  //  self.newsImg.layer.borderColor = UIColor.whiteColor().CGColor
                    
                    let tapGestureRecognizer = UITapGestureRecognizer(target:self, action:Selector("imageTapped:"))
                    self.newsImg.userInteractionEnabled = true
                    self.newsImg.addGestureRecognizer(tapGestureRecognizer)
                }*/

                

                
                

                
                
            }
        }
        
        
        /*
        if let restoredValue = defaults!.stringForKey("data1") {
            let result = convertStringToDictionary(restoredValue)
            if let _ = result?["sessionToken"] {
                
                
                  if let _ = result?["profileUrl"] {
                    
                    
                    
                    self.profileImg.hidden = false
                    self.banumber.hidden = false
                    self.baname.hidden = false
                    
                    self.pv.hidden = false
                    self.tv.hidden = false
                    self.ov.hidden = false
                    self.newsImg.hidden = false
                    self.enrollB.hidden = false
                    self.shoppingB.hidden = false
                    self.succB.hidden = false
                    self.pvImg.hidden = false
                    self.tvImg.hidden = false
                    self.ovImg.hidden = false
                    
                    self.newsImg.hidden = false
                    self.enrollB.hidden = false
                    self.shoppingB.hidden = false
                    self.succB.hidden = false
                    
                    /*let profile = "https://hydra.unicity.net/v5/customers/88c4ee710dc1e71b881b0027f274e4231cd9208e76ad8a7e04ef0182f2740c85?expand=metricsProfile,profilePicture,cumulativeMetricsProfile"*/
                    
                    let request = HTTPTask()
                    let token = result?["sessionToken"]
                    let profileurl = result?["profileUrl"]
                    
                    let pr = profileurl as! String
                    let tok = token as! String
                    
                    request.requestSerializer = HTTPRequestSerializer()
                    request.requestSerializer.headers["Authorization"] = "Bearer "+tok
                    request.requestSerializer.headers["Content-Type"] = "application/json"
                    request.responseSerializer = JSONResponseSerializer()
                    request.GET(pr+"?expand=metricsProfile,profilePicture,cumulativeMetricsProfile", parameters: nil, completionHandler: {(response: HTTPResponse) in
                        if let err = response.error {
                            print("error: \(err.localizedDescription)")
                            return //also notify app of failure as needed
                        }
                        
                        self.loading.hidden = true
                        
                        if let obj: AnyObject = response.responseObject {
                            let resp = User(JSONDecoder(obj))
                            
                            print("status is: \(resp.unicity!)")
                            print("status is: \(resp.fn!.fullName!)")
                            print("status is: \(resp.mp!.pv!)")
                            
                            self.banumber.text = String(resp.unicity!)
                            self.baname.text = String(resp.fn!.fullName!)
                            
                            
                            self.pv.text = String(resp.mp!.pv!)
                            self.tv.text = String(resp.mp!.tv!)
                            self.ov.text = String(resp.mp!.ov!)
                            var img = "";
                           
                            print("status is: \(resp.cc!.highestRankShort!)")
                            for element in resp.pp!.psize! {
                                //  print("\(element.media!) ")
                                img = element.media!
                            }
                            var pinImage =  ["Dst":"01","Ph1" : "02","Mgr" : "03","SrM" : "04","ExM" : "05","Dir" : "06","SrD" : "07", "ExD" : "08","PrD" : "09","PrS" : "10","PrR" : "11","DIA" : "12"]
                        
                            if(img == ""){
                                self.profileImg.image =  UIImage(named: pinImage[resp.cc!.highestRankShort!]!)!
                                self.profileImg.layer.borderWidth = 1.0
                                self.profileImg.layer.masksToBounds = false
                                self.profileImg.layer.borderColor = UIColor.whiteColor().CGColor
                                self.profileImg.layer.cornerRadius = self.profileImg.frame.size.width/2
                                self.profileImg.clipsToBounds = true
                                
                            }else{
                                let url = NSURL(string: img)
                                let data = NSData(contentsOfURL: url!) //make sure your image in this url does exist, otherwise unwrap in a if let check
                                self.profileImg.image = UIImage(data: data!)
                                self.profileImg.layer.borderWidth = 1.0
                                self.profileImg.layer.masksToBounds = false
                                self.profileImg.layer.borderColor = UIColor.whiteColor().CGColor
                                self.profileImg.layer.cornerRadius = self.profileImg.frame.size.width/2
                                self.profileImg.clipsToBounds = true

                            }
                            
                            
                        }
                    })
                    
                    
                    
                    
                    request.requestSerializer = HTTPRequestSerializer()
                    
                    request.responseSerializer = JSONResponseSerializer()
                    request.GET("http://mobile.unicity-th.com/wp-admin/admin-ajax.php?action=unimobiapp_get_news&args[posts_per_page]=1", parameters: nil, completionHandler: {(response: HTTPResponse) in
                        if let err = response.error {
                            print("error: \(err.localizedDescription)")
                            return //also notify app of failure as needed
                        }
                        if let obj: AnyObject = response.responseObject {
                            
                            let decoder =  JSONDecoder(obj)
                            
                            
                            let img = decoder[0]["image"].string!
                            
                            let url = NSURL(string: img)
                            let data = NSData(contentsOfURL: url!) //make sure your image in this url does exist, otherwise unwrap in a if let check
                            self.newsImg.image = UIImage(data: data!)
                            self.newsImg.layer.borderWidth = 1.0
                            self.newsImg.layer.borderColor = UIColor.whiteColor().CGColor
                            
                            let tapGestureRecognizer = UITapGestureRecognizer(target:self, action:Selector("imageTapped:"))
                            self.newsImg.userInteractionEnabled = true
                            self.newsImg.addGestureRecognizer(tapGestureRecognizer)
                        }
                    })

                }
              
                
               
            }else{
               /* self.profileImg.hidden = true
                self.banumber.hidden = true
                self.baname.hidden = true
                
                self.pv.hidden = true
                self.tv.hidden = true
                self.ov.hidden = true
                self.newsImg.hidden = true
                self.enrollB.hidden = true
                self.shoppingB.hidden = true
                self.succB.hidden = true
                self.pvImg.hidden = true
                 self.tvImg.hidden = true
                 self.ovImg.hidden = true
                
                self.newsImg.hidden = true
                self.enrollB.hidden = true
                self.shoppingB.hidden = true
                self.succB.hidden = true*/
                
                loading.hidden = true
                
               
                self.preferredContentSize = CGSizeMake(0, 100);

                
            }
        }*/
        
        
        
        
    }
    
    
}
