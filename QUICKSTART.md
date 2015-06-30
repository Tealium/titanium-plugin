## 1. Add the modules to the Titanium SDK

* Paste the ```Modules/com.tealium.appcelerator.android``` module in the Titanium's android module directory.
* Paste the ```Modules/com.tealium.appcelerator.ios``` module in the Titanium's iphone module directory. 

## 2. Reference the modules in the tiapp.xml file 

```xml
<ti:app xmlns:ti="http://ti.appcelerator.org">
    <!---...-->
    <modules>
        <module platform="android">com.tealium.appcelerator.android</module>
        <module platform="iphone">com.tealium.appcelerator.ios</module>
    </modules>
    <!---...-->
</ti:app>
```

## 3. Add the tealium.js file

Copy ```Source/tealium.js``` into the project:

*Alloy*

In ```<PROJECT ROOT>/app/assets/```

*Classic*

In ```<PROJECT ROOT>/Resources/```

## 4. Import the modules

Add the include and initialization code: 

```javascript
Ti.include("tealium.js");
Tealium.initialize("tealiummobile", "demo", "dev", false);
``` 

*Alloy*

In ```<PROJECT ROOT>/app/alloy.js```

*Classic*

In ```<PROJECT ROOT>/Resources/app.js```

## 5. Add view track calls

```javascript
Tealium.trackView('view_name', {
	'data_source-key' : 'data_source-value'
});
```

## 5. Add event track calls

```javascript
Tealium.trackView('button_name', {
	'data_source-key' : 'data_source-value'
});
```