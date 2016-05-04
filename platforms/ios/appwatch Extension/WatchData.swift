//
//  WatchData.swift
//  Unicity TH
//
//  Created by Watcharatep Inkong on 1/15/2559 BE.
//
//

import WatchConnectivity
import WatchKit

@available(iOS 9.0, *)


public class WatchData: NSObject,WCSessionDelegate {
    var session = WCSession.defaultSession()
    //
    
    class var shared: WatchData {
        struct Static {
            static var onceToken: dispatch_once_t = 0
            static var instance: WatchData? = nil
        }
        dispatch_once(&Static.onceToken) {
            Static.instance = WatchData()
        }
        return Static.instance!
    }
    
    public func session(session: WCSession, didReceiveFile file: WCSessionFile){
        print(__FUNCTION__)
        print(session)
        
    }
    
    public func session(session: WCSession, didReceiveApplicationContext applicationContext: [String : AnyObject]) {
        print(__FUNCTION__)
        print(session)
        
        
    }
    
    
    public func sessionReachabilityDidChange(session: WCSession){
        print(__FUNCTION__)
        print(session)
        print("reachability changed:\(session.reachable)")
        let text = session.reachable ? "reachable" : "unreachable"
        
    }
    
    public func sessionWatchStateDidChange(session: WCSession) {
        print(__FUNCTION__)
        print(session)
        print("reachable:\(session.reachable)")
        // alertDelegate?.showMessage("sessionWatchStateDidChange")
        if !session.receivedApplicationContext.keys.isEmpty {
            //alertDelegate?.showMessage(session.receivedApplicationContext.description)
        }
    }
    
    public func session(session: WCSession, didReceiveMessageData messageData: NSData){
        
        if !session.receivedApplicationContext.keys.isEmpty {
           // alertDelegate?.showMessage(session.receivedApplicationContext.description)
        }
    }
    
    
    public func session(session: WCSession, didReceiveMessage message: [String : AnyObject]){
        print(__FUNCTION__)
        if let data = message["data"] {
           // alertDelegate?.showMessage(data as! String)
            return
        }
    }
    
    public func session(session: WCSession, didReceiveMessage message: [String : AnyObject], replyHandler: ([String : AnyObject]) -> Void) {
        print(__FUNCTION__)
        if let data = message["data"] {
           // alertDelegate?.showMessage(data as! String)
            return
        }
        guard message["request"] as? String == "showAlert" else {return}
        
    }
    
    
    public func activate(){
        
        if WCSession.isSupported() {    //  it is supported
            session = WCSession.defaultSession()
            session.delegate = self
            session.activateSession()
            print("watch activating WCSession")
        } else {
            
            print("watch does not support WCSession")
        }
        
        if(!session.reachable){
            print("not reachable")
            return
        }else{
            print("watch is reachable")
            
        }
    }
    
}
