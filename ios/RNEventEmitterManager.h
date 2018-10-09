//
//  RNEventEmitterManager.h
//  RNBaiShop
//
//  Created by kede on 2018/10/9.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>


NS_ASSUME_NONNULL_BEGIN

@interface RNEventEmitterManager : RCTEventEmitter<RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
