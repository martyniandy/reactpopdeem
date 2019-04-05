class CreateCustomerTwitterSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_twitter_settings do |t|
      t.references :customer, foreign_key: true
      t.string :consumer_key
      t.string :consumer_secret

      t.timestamps
    end
  end
end
