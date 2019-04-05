class CreateUserInstagramAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :user_instagram_accounts do |t|
      t.integer :social_account_id
      t.string :instagram_id
      t.boolean :tester
      t.string :access_token
      t.string :access_secret
      t.string :profile_picture_url

      t.timestamps
    end
  end
end
