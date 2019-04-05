class CreateUserTwitterAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :user_twitter_accounts do |t|
      t.integer :social_account_id
      t.string :twitter_id
      t.boolean :tester
      t.string :access_token
      t.string :access_secret
      t.integer :expiration_time
      t.string :profile_picture_url
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
