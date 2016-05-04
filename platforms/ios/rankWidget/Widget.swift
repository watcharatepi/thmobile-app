//
//  Widget.swift
//  Unicity TH
//
//  Created by Watcharatep Inkong on 1/7/2559 BE.
//
//

import UIKit
import NotificationCenter


class Widget: UIViewController, NCWidgetProviding {
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.preferredContentSize = CGSizeMake(0, 520);
        
    
    }
}
