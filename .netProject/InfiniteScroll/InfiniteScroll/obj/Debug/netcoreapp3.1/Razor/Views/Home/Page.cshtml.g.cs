#pragma checksum "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f5e21ec7c3164d4ce03a07eba1fe57392fd59d9b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Page), @"mvc.1.0.view", @"/Views/Home/Page.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\_ViewImports.cshtml"
using InfiniteScroll;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\_ViewImports.cshtml"
using InfiniteScroll.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f5e21ec7c3164d4ce03a07eba1fe57392fd59d9b", @"/Views/Home/Page.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"4a9a4761e12cadf098142b8f85e09e6730e38809", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Page : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml"
  
    //ViewData["Title"] = "Page";
    //Layout = "~/Views/Shared/_Layout.cshtml";
    Layout = null;
    int pageNumber = ViewBag.pageNumber;
    string color = ViewBag.color;
    int productCount = ViewBag.productCount;

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
#nullable restore
#line 11 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml"
  
    for (int i = 0; i < productCount; i++)
    {

#line default
#line hidden
#nullable disable
            WriteLiteral("        <div");
            BeginWriteAttribute("class", " class=\"", 305, "\"", 344, 3);
            WriteAttributeValue("", 313, "product", 313, 7, true);
            WriteAttributeValue(" ", 320, "scroll-zone", 321, 12, true);
#nullable restore
#line 14 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml"
WriteAttributeValue(" ", 332, pageNumber, 333, 11, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            BeginWriteAttribute("style", " style=\"", 345, "\"", 377, 3);
            WriteAttributeValue("", 353, "background-color:", 353, 17, true);
#nullable restore
#line 14 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml"
WriteAttributeValue("", 370, color, 370, 6, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 376, ";", 376, 1, true);
            EndWriteAttribute();
            WriteLiteral(">\r\n            <div class=\"product-container\">\r\n                Product ");
#nullable restore
#line 16 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml"
                   Write(pageNumber);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            </div>\r\n        </div>\r\n");
#nullable restore
#line 19 "E:\Repository\VSCode\InfiniteScroll\InfiniteScroll\Views\Home\Page.cshtml"
    }

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
