class AddFacebookIdToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook_id, :string
  end
end
