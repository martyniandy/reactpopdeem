class AddCustomerToUser < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :customer, foreign_key: true
  end
end
