#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface ACPSTemplate : CDVPlugin

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)funcA:(CDVInvokedUrlCommand*)command;

@end
