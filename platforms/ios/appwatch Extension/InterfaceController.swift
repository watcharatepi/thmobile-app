//
//  InterfaceController.swift
//  appwatch Extension
//
//  Created by Watcharatep Inkong on 1/14/2559 BE.
//
//

import WatchKit
import Foundation


class InterfaceController: WKInterfaceController {

    
    func convertStringToDictionary(text: String) -> [String:AnyObject]? {
        if let data = text.dataUsingEncoding(NSUTF8StringEncoding) {
            do {
                let json = try NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers) as? [String:AnyObject]
                return json
            } catch {
                
            }
        }
        return nil
    }
    
    
    @IBOutlet var baname: WKInterfaceLabel!
    
    @IBOutlet var ovtxt: WKInterfaceLabel!
    @IBOutlet var tvtxt: WKInterfaceLabel!
    @IBOutlet var pvtxt: WKInterfaceLabel!
    
   
    override func awakeWithContext(context: AnyObject?) {
        super.awakeWithContext(context)
        // Initialize the `WCSession`.
        WatchData.shared.activate()
       

        
        // Configure interface objects here.
    }

    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
        
       
        let defaults = NSUserDefaults(suiteName: "group.com.unicity.mobiapp")
        defaults?.synchronize()
        if let restoredValue = defaults!.stringForKey("data1") {
            let result = convertStringToDictionary(restoredValue)
            let name = result?["name"]
            let pv = result?["pv"]
            let tv = result?["tv"]
            let ov = result?["ov"]
            baname.setText(String(name!));
            pvtxt.setText(String(pv!));
            tvtxt.setText(String(tv!));
            ovtxt.setText(String(ov!));
            
            
        }else{
         print("no data")
        }

        
    }
    

    
    internal func showMessage(msg:String){
        let defaultAction = WKAlertAction(title: msg, style: WKAlertActionStyle.Default) { () -> Void in }
        let actions = [defaultAction]
        self.presentAlertControllerWithTitle(  "Info",  message: "",  preferredStyle: WKAlertControllerStyle.Alert, actions: actions)
    }
    

    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }
    
    override func table(table: WKInterfaceTable, didSelectRowAtIndex rowIndex: Int) {
       
    }
    

}
