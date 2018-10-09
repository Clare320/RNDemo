//
//  HomeViewController.m
//  RNBaiShop
//
//  Created by kede on 2018/10/9.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "HomeViewController.h"
#import "ReactViewController.h"

@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  
  self.title = @"Home";
  self.view.backgroundColor = [UIColor whiteColor];
  [self setupUI];
  
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  
  self.navigationController.navigationBar.hidden = NO;
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  
  self.navigationController.navigationBar.hidden = YES;
}


- (void)setupUI {
  UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
  [button setTitle:@"Push" forState:UIControlStateNormal];
  [button addTarget:self action:@selector(handlePushButton) forControlEvents:UIControlEventTouchUpInside];
  button.frame = CGRectMake(10, 100, 100, 50);
  [self.view addSubview:button];
}

- (void)handlePushButton {
  ReactViewController *vc = [[ReactViewController alloc] init];
  [self.navigationController pushViewController:vc animated:YES];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
