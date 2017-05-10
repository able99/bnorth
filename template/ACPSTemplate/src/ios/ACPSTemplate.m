#import "ACPSTemplate.h"

@implementation ACPSTemplate : CDVPlugin

- (void)pluginInitialize{

}

- (void)init:(CDVInvokedUrlCommand*)command;
{
    [self.commandDelegate runInBackground:^ {
        self.callbackId = command.callbackId;

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)funcA:(CDVInvokedUrlCommand*)command;
{
    NSString *msg = @"hello world!";
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:msg];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
