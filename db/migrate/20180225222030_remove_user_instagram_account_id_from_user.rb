class RemoveUserInstagramAccountIdFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :user_instagram_account_id, :Integer
  end
end
