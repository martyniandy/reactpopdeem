class AddCustomerTwitterSettingToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_reference :customers, :customer_twitter_setting, foreign_key: true
  end
end
