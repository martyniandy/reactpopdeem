class CreateCustomerThemes < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_themes do |t|
      t.references :customer, foreign_key: true
      t.string :colour_primary
      t.string :colour_primary_inverse
      t.string :colour_view_background
      t.string :colour_table_background
      t.string :colour_primary_text
      t.string :colour_secondary_text
      t.string :colour_tertiary_text
      t.string :colour_tableview_seperator
      t.string :colour_tabbar_background
      t.string :colour_tabbar_foreground
      t.string :colour_tabbar_selection
      t.string :colour_home_header_text
      t.string :image_home_header
      t.string :image_social_login

      t.timestamps
    end
  end
end
