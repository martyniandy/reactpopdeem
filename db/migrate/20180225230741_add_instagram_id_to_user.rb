class AddInstagramIdToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :instagram_id, :string
  end
end
