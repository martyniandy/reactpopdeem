class AddCustomerFacebookSettingToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_reference :customers, :customer_facebook_setting, foreign_key: true
  end
end
