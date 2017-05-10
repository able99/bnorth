#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface ACPSTemplate : CDVPlugin

@property (nonatomic, copy) NSString *callbackId;

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)funcA:(CDVInvokedUrlCommand*)command;

@end
