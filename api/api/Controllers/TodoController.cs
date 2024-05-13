using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> _todoList = new List<TodoItem>();

        [HttpPost]
        public IActionResult AddTodoItem(TodoItem newItem)
        {
            newItem.id = Guid.NewGuid();

            _todoList.Add(newItem);
            return Ok(newItem);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodoItem(Guid id)
        {
            var existingItem = _todoList.Find(item => item.id == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            _todoList.Remove(existingItem);
            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateTodoItem(Guid id, [FromBody] Dictionary<string, object> updates)
        {
            var existingItem = _todoList.FirstOrDefault(item => item.id == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            foreach (var update in updates)
            {
                if (update.Key == "dueDate" && update.Value != null)
                {
                    existingItem.dueDate = update.Value.ToString();
                }
                else if (update.Key == "completed" && update.Value != null)
                {
                    existingItem.completed = Convert.ToBoolean(update.Value);
                }
                else if (update.Key == "title" && update.Value != null)
                {
                    existingItem.title = update.Value.ToString();
                }
                else if (update.Key == "comment" && update.Value != null)
                {
                    existingItem.comment = update.Value.ToString();
                }
            }

            return Ok(existingItem);
        }

        [HttpGet]
        public IActionResult GetToDoList([FromQuery] int page, [FromQuery] int pageSize = 10, [FromQuery] bool sortByDueDate = false)
        {
            IEnumerable<TodoItem> itemsToReturn;

            if (sortByDueDate)
            {
                itemsToReturn = _todoList.OrderBy(item => DateTime.Parse(item.dueDate));
            }
            else
            {
                itemsToReturn = _todoList;
            }

            var startIndex = page * pageSize;
            itemsToReturn = itemsToReturn.Skip(startIndex).Take(pageSize);

            return Ok(itemsToReturn);
        }
    }
}
