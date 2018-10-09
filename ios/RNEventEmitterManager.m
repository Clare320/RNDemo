//
//  RNEventEmitterManager.m
//  RNBaiShop
//
//  Created by kede on 2018/10/9.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNEventEmitterManager.h"

@implementation RNEventEmitterManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventReminder"];
}

- (void)eventReminderReceived:(NSDictionary *)dict {
  [self sendEventWithName:@"EventReminder" body:dict];
}

@end
