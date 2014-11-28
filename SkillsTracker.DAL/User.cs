using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SkillsTracker.DAL
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, EmailAddress, StringLength(256)]
        public string Email { get; set; }

        [Required, StringLength(7)]
        public string EmployeeCode { get; set; }

        [Required, StringLength(256)]
        public string LastName { get; set; }

        [Required, StringLength(256)]
        public string FirstName { get; set; }
    }
}
