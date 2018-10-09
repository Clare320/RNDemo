//
//  RNTMapManager.m
//  RNBaiShop
//
//  Created by kede on 2018/10/9.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNTMapManager.h"

@implementation RNTMapManager

// 只单纯返回View，如需自定义，可以返回自定义后View的实例
- (UIView *)view {
  return [[MKMapView alloc] init];
}

@end
