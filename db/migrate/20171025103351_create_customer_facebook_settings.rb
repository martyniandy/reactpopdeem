class CreateCustomerFacebookSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_facebook_settings do |t|
      t.references :customer, foreign_key: true
      t.string :app_id
      t.string :app_access_token

      t.timestamps
    end
  end
end
