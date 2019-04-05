# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

como = Customer.find_or_create_by(:slug => 'como', :api_key => '1dc4679f-5aa9-4f64-8eb7-83c6b73e8ab7')

insta_cis = CustomerInstagramSetting.find_or_create_by(:customer_id => como.id, :client_id => "721403853f784eea86023a9e96ccde44", :client_secret => "0b14e780896e42be88cefcddb3ac64dc")
insta_cis.save!

face_cis = CustomerFacebookSetting.find_or_create_by(:customer_id=> como.id, :app_id => "370441856449418", :app_access_token => "a6b338bcc5a54d32c3f46650ba25b18c")
face_cis.save!

twit_cis = CustomerTwitterSetting.find_or_create_by(:customer_id => como.id, :consumer_key => "rAzr7Tn0wOVBs6Oij13AYecVA", :consumer_secret => "rHTmAWpw1gPCoCy7AzA43j9eMqb2GJb24qcMfIHeOvepARFsmt")
twit_cis.save!

como.customer_facebook_setting_id = face_cis.id
como.customer_instagram_setting_id = insta_cis.id
como.customer_twitter_setting_id = twit_cis.id
como.save!

CustomerTheme.create(customer_id: 1,
              colour_primary: "#000000",
              colour_primary_inverse: "#24C7EA",
              colour_view_background: "#F4F4F4",
              colour_table_background: "#FFFFFF",
              colour_primary_text: "#000000",
              colour_secondary_text: "#000000",
              colour_tertiary_text: "#FBD131",
              colour_tableview_seperator: "#C0C0C0",
              colour_tabbar_background: "#31251E",
              colour_tabbar_foreground: "#FBD131",
              colour_tabbar_selection: "#FBD131",
              colour_home_header_text: "#FFFFFF",
              image_home_header: "",
              image_social_login: "")