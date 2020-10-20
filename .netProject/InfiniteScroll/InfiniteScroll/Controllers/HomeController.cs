using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using InfiniteScroll.Models;
using System.Drawing;

namespace InfiniteScroll.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}



        private readonly int productCount = 20;
        public IActionResult ProductList(int page = 0)
        {
            ViewBag.pageNumber = page;
            ViewBag.color = "#" + GetRandomColour().Name;
            ViewBag.productCount = productCount;
            return View();
        }

        public IActionResult Page(int page = 0)
        {
            if (page == 30)
            {
                return BadRequest();
            }
            ViewBag.pageNumber = page;
            ViewBag.color = "#" + GetRandomColour().Name;
            ViewBag.productCount = productCount;
            return View();
        }

        private static readonly Random rand = new Random();
        private Color GetRandomColour()
        {
            return Color.FromArgb(rand.Next(256), rand.Next(256), rand.Next(256));
        }
    }
}
