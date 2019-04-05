class AddInstagramAccessSecretToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :instagram_access_secret, :string
  end
end
