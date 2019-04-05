class AddTwitterAccessTokenToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :twitter_access_token, :string
  end
end
