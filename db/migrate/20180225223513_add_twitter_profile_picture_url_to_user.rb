class AddTwitterProfilePictureUrlToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :twitter_profile_picture_url, :string
  end
end
