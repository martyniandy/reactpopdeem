class CreateCustomerInstagramSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_instagram_settings do |t|
      t.references :customer, foreign_key: true
      t.string :client_id
      t.string :client_secret

      t.timestamps
    end
  end
end
