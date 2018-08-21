/**
 * tealium-titanium-ios
 *
 * Created by Your Name
 * Copyright (c) 2018 Your Company. All rights reserved.
 */

#import <ModelIO/ModelIO.h>
#import "ComTealiumTitaniumiosModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"

@implementation ComTealiumTitaniumiosModule

#pragma mark Internal

// This is generated for your module, please do not change it
- (id)moduleGUID
{
  return @"5e499c55-f4b3-487a-b53b-faf432852840";
}

// This is generated for your module, please do not change it
- (NSString *)moduleId
{
  return @"com.tealium.titaniumios";
}

#pragma mark Lifecycle

- (void)startup
{
  [super startup];
  DebugLog(@"[DEBUG] %@ loaded", self);
}

#pragma Public APIs

- (void)initTealium:(id)args {

    NSLog(@"[INFO] Inside initTealium method");

    NSString* instanceName = [args objectAtIndex:0];
    NSString* account = [args objectAtIndex:1];
    NSString* profile = [args objectAtIndex:2];
    NSString* env = [args objectAtIndex:3];
    NSString* dataSourceId = [args objectAtIndex:4];
    NSString* collectDispatchURL = [args objectAtIndex:5];
    NSString* collectDispatchProfile = [args objectAtIndex:6];
    NSString* isLifecycleEnabled = [args objectAtIndex:7];
    BOOL isConsentManagerEnabled = [args objectAtIndex: 9]; // skips to 9 as we don't have a crash module in Obj-C
    TEALConfiguration *tealConfig = [TEALConfiguration configurationWithAccount:account
                                                                        profile:profile
                                                                    environment:env
                                                                     datasource:dataSourceId];
    if (isConsentManagerEnabled == YES) {
        [tealConfig setEnableConsentManager: YES];
    }
    // Initialize with a unique key for this instance
    Tealium *tealium = [Tealium newInstanceForKey:instanceName configuration:tealConfig];
}

- (void)setUserConsentStatus:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    NSString* consentStatus = [args objectAtIndex:1];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        TEALConsentStatus* status = NotConsented;
        if ([consentStatus isEqualToString:@"consented"]) {
            status = Consented;
        }
        [instance.consentManager setUserConsentStatus: status];
    }
}

- (void)setUserConsentCategories:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    NSArray* consentCategories = [args objectAtIndex:1];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        [instance.consentManager setUserConsentCategories:consentCategories];
    }
}

- (NSString*)getUserConsentStatus:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        return [TEALConsentManager consentStatusString:[instance.consentManager userConsentStatus]];
    }
}

- (NSArray*)getUserConsentCategories:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        return [instance.consentManager userConsentCategories];
    }
}

- (void)resetUserConsentPreferences:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        [instance.consentManager resetUserConsentPreferences];
    }
}

- (void)setUserConsentPolicy:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    NSString* consentPolicy = [args objectAtIndex:1];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        [instance addPersistentDataSources:@{@"policy":consentPolicy}];
    }
}

- (void)resetUserConsentPolicy:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        [instance removeVolatileDataSourcesForKeys:@[@"policy"]];
    }
}

- (NSString*)getUserConsentPolicy:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        return [[instance persistentDataSourcesCopy] objectForKey:@"policy"];
    }
    return nil;
}

- (void) setConsentLoggingEnabled:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    BOOL isEnabled = [args objectAtIndex:1];
    Tealium* instance = [Tealium instanceForKey:instanceName];
    if (instance != nil) {
        [instance.consentManager setConsentLoggingEnabled:isEnabled];
    }
}

- (void)enableAdIdentifier:(id)args {
    //ENSURE_STRING([args objectAtIndex:0]);
    NSString* instanceName = [args objectAtIndex:0];
    BOOL persist = [args objectAtIndex:1];
    Tealium* instance = [self getInstance:instanceName];
    if (persist == YES) {
        [instance addPersistentDataSources:[self getIdentifiers]];
    } else {
        [instance addVolatileDataSources:[self getIdentifiers]];
    }
}

- (NSDictionary *) getIdentifiers {

    NSString* idfv = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    NSString* idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    BOOL adTrackingEnabled = [[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled];
    NSString* adTracking = adTrackingEnabled == YES ? @"true" : @"false";

    NSDictionary* dict = @{
                           @"device_advertising_id": idfa,
                           @"device_advertising_vendor_id": idfv,
                           @"device_advertising_enabled": adTracking
                           };

    return dict;
}

- (Tealium *) getInstance:(NSString *)instanceName {
    return [Tealium instanceForKey: instanceName];
}

- (void)trackView:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSString* screenName = [args objectAtIndex:1];
    NSDictionary* dataLayer = [args objectAtIndex:2];
    [instance trackViewWithTitle:screenName dataSources:dataLayer];
}

- (void)trackEvent:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSString* screenName = [args objectAtIndex:1];
    NSDictionary* dataLayer = [args objectAtIndex:2];
    [instance trackViewWithTitle:screenName dataSources:dataLayer];
}

- (void)setVolatile:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSDictionary* dataLayer = [args objectAtIndex:1];
    [instance addVolatileDataSources:dataLayer];
}

- (void)setPersistent:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSMutableDictionary* dataLayer = [args objectAtIndex:1];
    NSArray* emptyKeys = [self checkIfEmpty:dataLayer];
    if ([emptyKeys count] > 0) {
      [instance removePersistentDataSourcesForKeys: emptyKeys];
      for (id item in emptyKeys) {
        if ([item isKindOfClass:[NSString class]]) {
          [dataLayer removeObjectForKey: item];
        }
      }
    }
    [instance addPersistentDataSources:dataLayer];
}

- (NSArray*)checkIfEmpty:(NSDictionary *) data {
  NSMutableArray* nullKeys = [[NSMutableArray alloc] init];
  for (NSString* key in data) {
    if (data[key] == nil || ([data[key] isKindOfClass:[NSString class]] && [data[key] isEqualToString: @""]) || [data[key] isKindOfClass:[NSNull class]]) {
      [nullKeys addObject:key];
    }
  }
  return nullKeys;
}

- (id)getVolatile:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSString* key = [args objectAtIndex:1];
    return [[instance volatileDataSourcesCopy] objectForKey:key];

}

- (id)getPersistent:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSString* key = [args objectAtIndex:1];
    return [[instance persistentDataSourcesCopy] objectForKey:key];
}

- (void)addRemoteCommand:(id)args {
    NSString* instanceName = [args objectAtIndex:0];
    Tealium* instance = [self getInstance:instanceName];
    NSString* commandId = [args objectAtIndex:1];
    KrollCallback* callback = [args objectAtIndex:2];
    [instance addRemoteCommandID:commandId description:@"Titanium Remote Command" targetQueue:dispatch_get_main_queue() responseBlock:^(TEALRemoteCommandResponse * _Nonnull response) {
        NSDictionary* tagBridgeResponse = [response requestPayload];

        NSError *error;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:tagBridgeResponse
                                                           options:0
                                                             error:&error];

        if (! jsonData) {
            NSLog(@"Got an error: %@", error);
        } else {
            NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            [callback callAsync:@[jsonString] thisObject:nil];
        }

    }];
}

@end
