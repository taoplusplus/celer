# Change Log
This is the change log for celer-web-app

## `5.0.6` - `12-15-2022` `LATEST`
- Added feature to sync map position to document when scrolling. (`Exp.ScrollProgressTrackerEnabled`)

## `5.0.5` - `11-03-2022` `LATEST`
- New home page

## `5.0.4` - `09-08-2022`
- Clean up new setting experiment
- Clean up new document provider experiment
- Fix port customization not working

## `5.0.3` - `09-02-2022`
- Add AppSettingProvider to separate setting storage from state. This also fixes the bug where the engine is not getting split settings with new DocumentProvider on

## `5.0.2` - `08-13-2022`
- Removed leaflet map. Pigeon map is now the only map
- Add experiment for using wasm bundler when using dev server (`Exp.BetterBundler`). Default on.

## `5.0.1` - `08-13-2022`
- Fix new DP not setting shouldSetBundle correctly for ws dev

## `5.0.0` - `08-11-2022` 
- Loading screen for better experience
- Optimized route and theme loading (`Exp.NewDP`, `Exp.NewASP`)
- Cleaned up old experiments
- Deprecated pydev and old route bundle format no longer supported

## `4.2.1` - `07-25-2022`
- Typo fix by Makonede
- Pigeon map now also supports click line number to center map

## `4.2.0` - `06-08-2022`
- Map Update: 
  - Experiment to use a new map framework [pigeon-maps](https://github.com/mariusandra/pigeon-maps). Use `?Exp.BetterMap` to enable this experimental feature
  - Performance improvements
  - Use map tiles from [objmap](https://objmap.zeldamods.org)
  - Extend zoom levels by 1 in each direction (was 3 to 7, now 2 to 8)

## `4.1.2` - `05-19-2022`
- Bug fix: Clean split names before writing them to XML

## `4.1.1` - `05-11-2022`
- `u` routes are disabled
- Add copy-paste and local file loading from home page
- Home page link in menu

## `4.1.0` - `05-09-2022`
- Add experimental `u` routes for loading url

## `4.0.0` - `05-04-2022`
- Export splits, subsplits, and split format feature
- Remove support for deprecated url parameters
- Fix shrine spelling issue
- Fix font issue resulting in white borders between lines

## `3.1.2` - `04-29-2022`
- Add export bundle.json option
- Setup scripts (through static hosting)

## `3.1.0` - `04-28-2022`
- Add dev server service #/dev

## `3.0.0` - `04-20-2022`
- Fix korok and warp bugs
- Implement new hash routes. There will be a deprecation warning if you use the old query parameters.

## `2.0.0` - `04-16-2022`
- Koroks and Shrines data are now generated by code generator

## `1.6.4` - `03-28-2022`
- fix nonnull assertion bug
- Migrate from celer-engine

## `Experimental`
- `EnhancedScrollTrackerEnabled` - track doc scroll position using line number instead of scroll bar position. There is currently some performance concern with this
- `MapSyncToDocScrollEnabled` - sync map to doc position as you scroll. Currently there is no throttling so this is extremely laggy
- `ExportSplits` - enable the export livesplit splits option. Currently the formatting is hardcoded
- `NoTrackDocPos` - disabling doc pos tracking for performance reasons
- `PigeonMap` - use pigeon map instead of leaflet
