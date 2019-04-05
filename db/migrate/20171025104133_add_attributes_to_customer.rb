class AddAttributesToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :api_key, :string
  end
end
