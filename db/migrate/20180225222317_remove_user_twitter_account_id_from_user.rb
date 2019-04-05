class RemoveUserTwitterAccountIdFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :user_twitter_account_id, :Integer
  end
end
