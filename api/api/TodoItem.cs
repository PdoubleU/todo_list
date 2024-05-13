using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace api
{
    public class TodoItem
    {
        [Key]
        public Guid id { get; set; }
        public string dueDate { get; set; }
        public bool completed { get; set; }
        public string title { get; set; }
        public string? comment { get; set; }
    }
}
