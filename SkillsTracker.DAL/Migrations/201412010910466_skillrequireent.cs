namespace SkillsTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class skillrequireent : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Skill", "Name", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Skill", "Name", c => c.String());
        }
    }
}
