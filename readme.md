# Blazor PWA App - Stocks Portfolio 

This sample application demonstrates one way to implement a PWA ([Progressive Web Application](https://developers.google.com/web/progressive-web-apps)) functionality in a Blazor WASM app. It is live at [https://demos.telerik.com/blazor-stocks-portfolio/](https://demos.telerik.com/blazor-stocks-portfolio/)

To generate the needed PWA assets, the [Blazor.PWA.MSBuild by SQL-MisterMagoo](https://github.com/SQL-MisterMagoo/Blazor.PWA.MSBuild) is used in this example. You can write them manually, use a different tool, or even see if Microsoft will prepare a ready-made PWA project template for Blazor.

The SASS styles are built to CSS through the [WebCopmiler package by madskristensen ](https://github.com/madskristensen/WebCompiler), then a build task in the `csproj` file copies the output to the `wwwroot` folder. This requires that you build through Visual Studio, a command-line build may throw an exception like `Access to the path '7z.dll' is denied`, depending on the machine setup and permissions.

The Telerik theme is fetched as a [local dependency](https://docs.telerik.com/blazor-ui/themes/overview#optional-dependency-management) to allow for easier caching for offline use of the PWA.

Most of the layout uses media queries and bootstrap to be responsive, some additional logic related to the viewport size is implemented through the [BlazorSize package by EdCharbeneau](https://github.com/EdCharbeneau/BlazorSize).

Data is generated in services for simplicity in this sample. They do not provide full offline capabilities (such as [offline detection](https://stackoverflow.com/questions/44756154/progressive-web-app-how-to-detect-and-handle-when-connection-is-up-again) and caching changes that can be synced later) as this is beyond the scope of this example.
