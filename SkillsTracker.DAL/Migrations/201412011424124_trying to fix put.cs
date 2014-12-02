namespace SkillsTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class tryingtofixput : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Profile", "User_Id", "dbo.User");
            DropIndex("dbo.Profile", new[] { "User_Id" });
            RenameColumn(table: "dbo.Profile", name: "User_Id", newName: "UserId");
            AlterColumn("dbo.Profile", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.Profile", "UserId");
            AddForeignKey("dbo.Profile", "UserId", "dbo.User", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Profile", "UserId", "dbo.User");
            DropIndex("dbo.Profile", new[] { "UserId" });
            AlterColumn("dbo.Profile", "UserId", c => c.Int());
            RenameColumn(table: "dbo.Profile", name: "UserId", newName: "User_Id");
            CreateIndex("dbo.Profile", "User_Id");
            AddForeignKey("dbo.Profile", "User_Id", "dbo.User", "Id");
        }
    }
}
