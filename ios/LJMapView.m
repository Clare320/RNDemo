//
//  LJMapView.m
//  RNBaiShop
//
//  Created by kede on 2018/10/10.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "LJMapView.h"

#import "RCTConvert+MapKit.h"

#import "TestMapView.h"

@implementation LJMapView

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView) {
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

- (UIView *)view {
  TestMapView *mapView = [[TestMapView alloc] init];
  mapView.delegate = self;
  return mapView;
}


#pragma mark MKMapViewDelegate

- (void)mapView:(TestMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
  if (!mapView.onRegionChange) {
    return;
  }
  
  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
                           @"region":@{
                               @"latitude":@(region.center.latitude),
                               @"longitude":@(region.center.longitude),
                               @"latitudeDelta":@(region.span.latitudeDelta),
                               @"longitudeDelta":@(region.span.longitudeDelta)
                               }
                           });
}

@end
