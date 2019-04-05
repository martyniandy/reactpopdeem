class AddUserToUserInstagramAccount < ActiveRecord::Migration[5.1]
  def change
    add_reference :user_instagram_accounts, :user, foreign_key: true
  end
end
