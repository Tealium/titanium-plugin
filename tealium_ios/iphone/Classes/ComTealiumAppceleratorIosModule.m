/**
 * tealium_ios
 *
 * Created by Your Name
 * Copyright (c) 2015 Your Company. All rights reserved.
 */

#import "ComTealiumAppceleratorIosModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"
#import <TealiumLibrary/Tealium.h>
#import <UIKit/UIDevice.h>

#pragma mark - TEALIUM iQ Settings: Account / Profile / Target
#define TEALIUM_ACCOUNT_NAME     @"tealiummobile"
#define TEALIUM_PROFILE_NAME     @"demo"
#define TEALIUM_ENVIRONMENT_NAME @"dev"

@implementation ComTealiumAppceleratorIosModule

#pragma mark Internal

// this is generated for your module, please do not change it
-(id)moduleGUID
{
    return @"0a99cf65-f0c3-4759-9b0b-7a23719906a3";
}

// this is generated for your module, please do not change it
-(NSString*)moduleId
{
    return @"com.tealium.appcelerator.ios";
}

#pragma mark Lifecycle

-(void)startup
{
    // this method is called when the module is first loaded
    // you *must* call the superclass
    [super startup];
    
    NSUInteger options      = TLDisplayVerboseLogs;
    NSString *platform      = @"ios_titanium";
    NSString *systemVersion = [[UIDevice currentDevice] systemVersion];
    
    NSTimeInterval timestamp    = [[NSDate date] timeIntervalSince1970];
    NSString *timestampString   = [@(timestamp) stringValue];
    
    NSString *overrideURL = [NSString stringWithFormat:@"https://tags.tiqcdn.com/utag/%@/%@/%@/mobile.html?library_version=%@&timestamp=%@&os_version=%@&platform=%@",
                             TEALIUM_ACCOUNT_NAME,
                             TEALIUM_PROFILE_NAME,
                             TEALIUM_ENVIRONMENT_NAME,
                             TealiumLibraryVersion,
                             timestampString,
                             systemVersion,
                             platform];
    
    [Tealium initSharedInstance:TEALIUM_ACCOUNT_NAME
                        profile:TEALIUM_PROFILE_NAME
                         target:TEALIUM_ENVIRONMENT_NAME
                        options:(TealiumOptions)options
               globalCustomData:@{TealiumDSK_OverrideUrl:overrideURL}];
}

-(void)shutdown:(id)sender
{
	// this method is called when the module is being unloaded
	// typically this is during shutdown. make sure you don't do too
	// much processing here or the app will be quit forceably

	// you *must* call the superclass
	[super shutdown:sender];
}

#pragma mark Cleanup

-(void)dealloc
{
	// release any resources that have been retained by the module
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	// optionally release any resources that can be dynamically
	// reloaded once memory is available - such as caches
	[super didReceiveMemoryWarning:notification];
}

#pragma mark Listener Notifications

-(void)_listenerAdded:(NSString *)type count:(int)count
{
	if (count == 1 && [type isEqualToString:@"my_event"])
	{
		// the first (of potentially many) listener is being added
		// for event named 'my_event'
	}
}

-(void)_listenerRemoved:(NSString *)type count:(int)count
{
	if (count == 0 && [type isEqualToString:@"my_event"])
	{
		// the last listener called for event named 'my_event' has
		// been removed, we can optionally clean up any resources
		// since no body is listening at this point for that event
	}
}

#pragma Public APIs

- (void) trackViewWithData:(id)params {

    NSDictionary *customData = [[self class] dictionaryFromParams:params];
    
    [Tealium trackCallType:TealiumViewCall
                customData:customData
                    object:nil];
}

- (void) trackEventWithData:(id)params {

    NSDictionary *customData = [[self class] dictionaryFromParams:params];
    
    [Tealium trackCallType:TealiumEventCall
                customData:customData
                    object:nil];
}

+ (NSDictionary *) dictionaryFromParams:(id) params {
    
    if(!params) {
        return nil;
    }
    
    if([params isKindOfClass:[NSDictionary class]]) {
        return params;
    }
    
    if(![params isKindOfClass:[NSArray class]]) {
        return nil;
    }

    NSArray *paramsArray = (NSArray *)params;
    
    id obj = [paramsArray lastObject];

    if ([obj isKindOfClass:[NSDictionary class]]) {
        return obj;
    }
    
    return nil;
}

@end
