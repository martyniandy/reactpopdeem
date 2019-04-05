class RemoveUserFacebokAccountIdFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :user_facebook_account_id, :Integer
  end
end
