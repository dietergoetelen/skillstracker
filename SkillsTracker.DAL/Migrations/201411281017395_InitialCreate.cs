namespace SkillsTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(nullable: false, maxLength: 256),
                        EmployeeCode = c.String(nullable: false, maxLength: 7),
                        LastName = c.String(nullable: false, maxLength: 256),
                        FirstName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Skill",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Profile",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Introduction = c.String(nullable: false, maxLength: 400),
                        ProfileImage = c.String(unicode: false, storeType: "text"),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.UserSkill",
                c => new
                    {
                        SkillId = c.Int(nullable: false),
                        ProfileId = c.Int(nullable: false),
                        Rating = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.SkillId, t.ProfileId })
                .ForeignKey("dbo.Profile", t => t.ProfileId, cascadeDelete: true)
                .ForeignKey("dbo.Skill", t => t.SkillId, cascadeDelete: true)
                .Index(t => t.SkillId)
                .Index(t => t.ProfileId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Profile", "User_Id", "dbo.User");
            DropForeignKey("dbo.UserSkill", "SkillId", "dbo.Skill");
            DropForeignKey("dbo.UserSkill", "ProfileId", "dbo.Profile");
            DropIndex("dbo.UserSkill", new[] { "ProfileId" });
            DropIndex("dbo.UserSkill", new[] { "SkillId" });
            DropIndex("dbo.Profile", new[] { "User_Id" });
            DropTable("dbo.UserSkill");
            DropTable("dbo.Profile");
            DropTable("dbo.Skill");
            DropTable("dbo.User");
        }
    }
}
