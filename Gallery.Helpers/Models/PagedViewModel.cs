using System;
using PagedList;

namespace Gallery.Helpers.Models
{
    public interface IPagedViewModel
    {
        String Direction { get; set; }
        String Column { get; set; }
        Int32? Page { get; set; }
    }

    public class PagedViewModel<TGridView> : IPagedViewModel
    {
        public IPagedList<TGridView> Items { get; set; }

        public String Direction { get; set; }

        public String Column { get; set; }

        public Int32? Page { get; set; }
    }

    public class PagedFilterViewModel<TGridView, TFilterState> : PagedViewModel<TGridView> where TFilterState : new()
    {
        public TFilterState State { get; set; }

        public PagedFilterViewModel()
        {
            State = new TFilterState();
        }
    }
}
