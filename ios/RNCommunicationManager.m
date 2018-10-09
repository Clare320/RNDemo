//
//  RNCommunicationManager.m
//  RNBaiShop
//
//  Created by kede on 2018/10/9.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNCommunicationManager.h"
#import <React/RCTLog.h>
#import "RNEventEmitterManager.h"

@implementation RNCommunicationManager

// 指定在js中可以访问的类 默认是当前类
RCT_EXPORT_MODULE();

// 明确声明要给js导出的方法
RCT_EXPORT_METHOD(addEvent:(NSString *)name loaction:(NSString *)location) {
  
  RCTLogInfo(@"test react-native and native communication %@", name);
  
  dispatch_sync(dispatch_get_main_queue(), ^{
    UINavigationController *nav = (UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController;
    if ([name isEqualToString:@"测试"]) {
      UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"测试" message:name preferredStyle:UIAlertControllerStyleAlert];
      [alert addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil]];
      [nav presentViewController:alert animated:YES completion:nil];
    } else if ([name isEqualToString:@"pop"]) {
      [nav popViewControllerAnimated:NO];
    } else if ([name isEqualToString:@"addObserver"]) {
//      dispatch_async(dispatch_get_main_queue(), ^{
//        RNEventEmitterManager *manager = [[RNEventEmitterManager alloc] init];
//        [manager sendEventWithName:@"EventReminder" body:@"llj"];
//      });
    }
  });
}



RCT_REMAP_METHOD(test12, test:(NSString *)msg) {
  NSLog(@"------>%@", msg);
}

/// 导出常量

- (NSDictionary *)constantsToExport {
  return @{
           @"token":@"12345678"
           };
}

/// 枚举常量通过RCTCovert拓展转换


+ (BOOL)requiresMainQueueSetup {
  return YES;
}


@end
