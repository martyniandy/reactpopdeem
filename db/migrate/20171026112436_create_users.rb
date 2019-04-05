class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :sex
      t.string :college
      t.string :type
      t.decimal :last_location_lat
      t.decimal :last_location_long
      t.integer :popdeem_id
      t.string :app_version
      t.string :user_token

      t.timestamps
    end
  end
end
