class AddFacebookProfilePictureUrlToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook_profile_picture_url, :string
  end
end
