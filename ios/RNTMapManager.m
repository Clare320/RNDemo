//
//  RNTMapManager.m
//  RNBaiShop
//
//  Created by kede on 2018/10/9.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNTMapManager.h"

@implementation RNTMapManager

RCT_EXPORT_MODULE();

// 只单纯返回View，如需自定义，可以返回自定义后View的实例
- (UIView *)view {
  return [[MKMapView alloc] init];
}

// 添加属性
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL);

@end
