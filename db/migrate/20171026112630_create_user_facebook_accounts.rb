class CreateUserFacebookAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :user_facebook_accounts do |t|
      t.references :user, foreign_key: true
      t.integer :social_account_id
      t.string :facebook_id
      t.boolean :tester
      t.string :access_token
      t.integer :expiration_time
      t.string :profile_picture_url

      t.timestamps
    end
  end
end
