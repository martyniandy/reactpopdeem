class AddTwitterAccessSecretToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :twitter_access_secret, :string
  end
end
