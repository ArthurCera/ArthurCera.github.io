using booklistModelo;
using booklistRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace booklist.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult Booklist()
        {
            var data = Repositorio.Booklist();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Authorlist()
        {
            var data = Repositorio.AuthorList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public int Addauthor(AutorModel autor)
        {
            return Repositorio.AddAuthor(autor);
        }

        public int AddBook(BooksModel book)
        {
            return Repositorio.AddBook(book);
        }

        public int RemoveBook(int book_id)
        {
            return Repositorio.RemoveBook(book_id);
        }
        public int ChangeRead(BooksModel books)
        {
            return Repositorio.ChangeRead(books.Book_id);
        }
    }
}