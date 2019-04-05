class AddFacebookAccessSecretToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook_access_secret, :string
  end
end
