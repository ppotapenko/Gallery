namespace GalleryCore.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class change_Hash_length : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Images", "Hash", c => c.String(nullable: false, maxLength: 36));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Images", "Hash", c => c.String(nullable: false, maxLength: 32));
        }
    }
}
