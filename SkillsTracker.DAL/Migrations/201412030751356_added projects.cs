namespace SkillsTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedprojects : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Function = c.String(),
                        Description = c.String(),
                        Contribution = c.String(),
                        Profile_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Profile", t => t.Profile_Id)
                .Index(t => t.Profile_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Projects", "Profile_Id", "dbo.Profile");
            DropIndex("dbo.Projects", new[] { "Profile_Id" });
            DropTable("dbo.Projects");
        }
    }
}
