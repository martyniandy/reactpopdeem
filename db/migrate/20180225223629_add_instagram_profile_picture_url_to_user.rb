class AddInstagramProfilePictureUrlToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :instagram_profile_picture_url, :string
  end
end
